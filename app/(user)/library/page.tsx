'use client';
import { useState, useEffect } from "react";
import { API_URL } from "@/config";
import type { Project, User } from "@/app/interfaces/library";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import UserHeader from "@/components/ui/userheader";

export default function Library() {
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}me`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            setUser(result.user); 
            setProjects(result.user.projects); 
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createProject = async () => {
        try {
            const response = await fetch(`${API_URL}v1/create/project`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                fetchData()
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="md:p-0 p-14">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen space-x-2">
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
                ) : user ? (
                    <div className="flex flex-col items-center justify-center">
                        {projects.length === 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-2 z-10">
                                <h1 className="text-3xl">Welcome, <span className="font-bold">{user.username}</span></h1>
                                <p className="text-red-600 text-2xl">No projects found</p>
                                <Button variant={'outline'} size={'sm'} onClick={createProject}>Create Project</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-wrap gap-4 overflow-x-scroll p-4">
                                    {projects.map((project) => (
                                        <Link href={'/project/' + project.Id} key={project.Id} className="flex flex-col items-center p-4 text-center transition-transform hover:scale-105">
                                            <div className="w-[200px] h-[200px] overflow-hidden">
                                                <Image className="rounded-xl object-cover w-full h-full" src={project.Image} alt={project.Title} width={200} height={200} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg truncate">{project.Title}</h3>
                                                <span className="text-base text-muted-foreground">{project.Creator}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen space-x-2">
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
                )}
            </div>
        </>
    );
}
