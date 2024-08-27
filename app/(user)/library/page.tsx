'use client';
import { API_URL } from "@/config";
import { useState, useEffect } from "react";
import { Project, User } from "@/app/interfaces/library";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LibraryIcon } from "lucide-react";
  

export default function Library() {
    const [user, setUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    const fetchProjects = async (projectIds: string[]) => {
        try {
            const fetchedProjects = await Promise.all(
                projectIds.map(async (id) => {
                    const response = await fetch(`${API_URL}projects/${id}`);
                    return await response.json();
                })
            );
            setProjects(fetchedProjects);
        } catch (error) {
            console.error(error);
        }
    };

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
            if (result.user.Projects) {
                fetchProjects(result.user.Projects);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchData();
    }, );

    return (
        <div>
            {loading ? (
                <div className="items-center justify-center flex min-h-screen">
                    <p className="font-bold text-2xl">Loading...</p> 
                </div>
            ) : user ? (
                <div className="items-center justify-center flex min-h-screen flex-col">
                    <h1 className="text-3xl">Welcome, <span className="font-bold">{user.username}</span></h1>
                    <div>
                        {projects.length === 0 ? (
                            <div className="items-center justify-center flex flex-col space-y-2">
                            <p className="text-red-600 text-2xl">No projects found</p>
                            <Popover>
                           <PopoverTrigger><Button variant={'outline'} size={"sm"}>Create Project</Button></PopoverTrigger>
                           <PopoverContent className="pt-4 space-y-3 p-3">
                            <Input placeholder="Title" />
                              <Input className="file:text-muted-foreground" id="picture" type="file" accept=".png, .jpg, .webp"/>
                              <Button variant={'outline'} size={'sm'}><LibraryIcon className="mr-2 w-4 h-4" />Create Project</Button>
                            </PopoverContent>
                        </Popover>
</div>
                        ) : (
                            projects.map((project) => (
                                <div key={project.id}>
                                    <h3>{project.title}</h3>
                                    <Image height={128} width={128} src={project.image} alt={project.title} />
                                    <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
                                    <p>Updated: {new Date(project.updatedAt).toLocaleString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-red-600 text-2xl">User data not found</p>
            )}
        </div>
    );
}
