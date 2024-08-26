'use client';
import { API_URL } from "@/config";
import { useState, useEffect } from "react";

interface Project {
    id: number;
    title: string;
    visibility: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export default function Library() {
    let [username, setUsername] = useState<string>('');
    let [projects, setProjects] = useState<Project[]>([]);
    let [loading, setLoading] = useState<boolean>(true); 

    let fetchdata = async () => {
        try { 
           let response = await fetch(`${API_URL}me`, {
               method: 'PUT',
               credentials: 'include',
               headers: {
                   'Content-Type': 'application/json',
               },
           });
           let result = await response.json();
           setUsername(result.user.username); 
           setProjects(result.user.projects);  
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="items-center justify-center flex min-h-screen">
                    <p className="font-bold text-2xl">Loading...</p> 
                </div>
            ) : (
                <div className="items-center justify-center flex min-h-screen flex-col">
                    <h1 className="text-2xl">Welcome, <span className="font-bold">{username}</span></h1>
                    <div>
                        {projects.length === 0 ? (
                            <p>No projects found</p>
                        ) : (
                            projects.map((project) => (
                                <div key={project.id}>
                                    <h3>{project.title}</h3>
                                    <img src={project.image} alt={project.title} />
                                    <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
                                    <p>Updated: {new Date(project.updatedAt).toLocaleString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
