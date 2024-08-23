'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileNotFound from '@/components/ui/ProfileNotFound';
import { API_URL } from '@/config';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';
import Link from 'next/link';

export default function UserPage() {
    let { username } = useParams();
    let [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
    let [banner, setBanner] = useState<string>('');
    let [avatar, setAvatar] = useState<string>('');
    let [userbio, setBio] = useState<string>('');
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
                        let { Username: userUsername, Banner: userBanner, Bio: userBio, Avatar: userAvatar } = data.user;
                        setFetchedUsername(userUsername);
                        setBanner(userBanner);
                        setAvatar(userAvatar);
                        setBio(userBio);
                    }
                } catch (error) {
                    console.error('Failed to fetch user data');
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
        <MaxWidthWrapper className='pt-4 items-center w-3/5'>
            <div className="relative w-full h-64 overflow-hidden object-cover rounded-lg">
                <Image
                    src={banner}
                    alt={fetchedUsername}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className='relative -mt-4 z-20 flex flex-col px-8'>
                <div className="absolute -top-16">
                    <Image src={avatar} alt='user' height={128} width={128} className="rounded-full border-4 border-black"/>
                </div>
                <h1 className="mt-20 text-2xl font-semibold">{fetchedUsername}</h1>
                <p>{userbio}</p>
            </div>
        </MaxWidthWrapper>
    );
}
