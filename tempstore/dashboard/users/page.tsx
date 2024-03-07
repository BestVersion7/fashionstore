"use client";
import { UserType } from "@/app/types";
import { getAllUsers } from "@/app/utils/apiCalls";
import { useState, useEffect } from "react";

export default function UserPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const getUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <main>
            {users.map((item, index) => (
                <p key={index}>
                    {index + 1}. {item.email}
                </p>
            ))}
        </main>
    );
}
