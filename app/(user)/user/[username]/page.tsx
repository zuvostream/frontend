'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileNotFound from '@/components/ui/ProfileNotFound';
import { API_URL } from '@/config';

export default function UserPage() {
    let { username } = useParams();
    let [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
    let [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let getUser = async () => {
            if (username) {
                try {
                    let response = await fetch(`${API_URL}v1/user/${username}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    });

                    let data = await response.json();

                    if (!data.success) {
                        setError(true);
                    } else {
                        let [userUsername] = data.user;
                        setFetchedUsername(userUsername);
                    }
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    setError(true);
                }
            }
        };

        getUser();
    }, [username]);

    if (error) {
        return <ProfileNotFound />;
    }

    if (fetchedUsername === null) {
        return <></>; 
    }

    return (
        <div>
            <h1>{fetchedUsername}</h1>
        </div>
    );
}
