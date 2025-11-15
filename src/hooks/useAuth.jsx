import { useState, useEffect } from 'react';

const initialUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Manager", status: "suspended", createdAt: "2025-01-01", lastActive: "2025-06-01", avatar: "SJ" },
    { id: 2, name: "Mike Chen", email: "mike.chen@example.com", role: "Viewer", status: "active", createdAt: "2025-02-15", lastActive: "2025-07-20", avatar: "MC" },
    { id: 3, name: "Emma Davis", email: "emma.d@example.com", role: "Editor", status: "pending", createdAt: "2025-03-10", lastActive: "2025-07-18", avatar: "ED" },
    { id: 4, name: "Alex Rodriguez", email: "alex.r@example.com", role: "Editor", status: "active", createdAt: "2025-04-05", lastActive: "2025-07-22", avatar: "AR" },
    { id: 5, name: "Priya Patel", email: "priya.p@example.com", role: "Manager", status: "pending", createdAt: "2025-05-20", lastActive: "2025-07-15", avatar: "PP" },
    { id: 6, name: "James Wilson", email: "james.w@example.com", role: "Admin", status: "active", createdAt: "2025-01-15", lastActive: "2025-07-23", avatar: "JW" },
];

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate authentication check
        const timer = setTimeout(() => {
            const adminUser = initialUsers.find(user => user.role === "Admin");
            setCurrentUser(adminUser);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const isAdmin = currentUser?.role === "Admin";

    return { currentUser, isAdmin, loading };
};