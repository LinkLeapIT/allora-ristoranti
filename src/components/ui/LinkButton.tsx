"use client";
import { Button } from './button';
import { useRouter } from 'next/navigation';
import React from 'react'

function LinkButton({ title, path }: { title: string, path: string }) {
    const router = useRouter();
    return (
        <div className='my-4'>
            <Button
                onClick={() => router.push(path)}
                size="default"
                className='bg-lightText hover:bg-lightText/80'
            >
                {title}
            </Button>
        </div>
    );

}

export default LinkButton