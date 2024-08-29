'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import type { Project } from "@/app/interfaces/library";
import { API_URL } from "@/config";
import { motion } from "framer-motion";
import Image from "next/image";
import UserHeader from "@/components/ui/userheader";

export default function Project() {
    let { id } = useParams();
    let [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 

    let fetchdata = async () => {
        try {
            let response = await fetch(`${API_URL}v1/project/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            let result = await response.json();
            setProject(result.project);
            setLoading(false);
        } catch (error) {
            console.error('error fetching project');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="items-center justify-center flex min-h-screen space-x-2">
                    {[...Array(3)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="w-4 h-4 bg-white rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: index * 0.2, 
                            }}
                        />
                    ))}
                </div>
            ) : (
                <>
                <UserHeader />
                <div className="flex space-y-4 flex-col items-center justify-center">
                   <Image src={project?.Image ?? ''} height={256} width={256} alt="" className="rounded-2xl" />
                   <h3>{project?.Title}</h3>
                </div>
</>
            )}
        </div>
    );
}
