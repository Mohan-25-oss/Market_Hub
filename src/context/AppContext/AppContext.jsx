// src/context/AppContext.jsx
import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";

import { auth, googleProvider } from "../../firebase/firebase.config";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    /* =====================================================
       AUTH STATES
    ====================================================== */
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [authError, setAuthError] = useState("");

    /* ------------------ AUTH FUNCTIONS ------------------ */

    // Signup with Email & Password
    const createUser = async (email, password, fullName) => {
        setAuthLoading(true);
        setAuthError("");
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update Display Name
            if (fullName) {
                await updateProfile(result.user, { displayName: fullName });
            }

            setUser(result.user);
            return result.user;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        } finally {
            setAuthLoading(false);
        }
    };

    // Login with Email
    const signInUser = async (email, password) => {
        setAuthLoading(true);
        setAuthError("");
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            return result.user;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        } finally {
            setAuthLoading(false);
        }
    };

    // Google Login
    const googleAuthentication = async () => {
        setAuthLoading(true);
        setAuthError("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            return result.user;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        } finally {
            setAuthLoading(false);
        }
    };

    // Logout
    const logOut = async () => {
        setAuthLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } finally {
            setAuthLoading(false);
        }
    };

    // Track Logged-in User
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /* =====================================================
       ADMIN USER LIST STATES
    ====================================================== */

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    /* =====================================================
       FILTERED USERS
    ====================================================== */

    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const matchSearch =
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase());

            const matchRole = roleFilter === "All" || u.role === roleFilter;
            const matchStatus = statusFilter === "All" || u.status === statusFilter;

            return matchSearch && matchRole && matchStatus;
        });
    }, [users, search, roleFilter, statusFilter]);

    /* =====================================================
       ADMIN PANEL CRUD FUNCTIONS
    ====================================================== */

    const createPanelUser = (userData) => {
        const newUser = {
            id: crypto.randomUUID(),
            ...userData,
            createdAt: new Date().toISOString().split("T")[0],
            lastActive: new Date().toISOString().split("T")[0],
            avatar: userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
        };

        setUsers((prev) => [...prev, newUser]);
    };

    const updatePanelUser = (id, updatedData) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...updatedData } : u))
        );
    };

    const deletePanelUser = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    /* =====================================================
       CONTEXT VALUE
    ====================================================== */

    const value = {
        /** AUTH */
        user,
        authLoading,
        authError,
        createUser,
        signInUser,
        googleAuthentication,
        logOut,

        /** ADMIN PANEL */
        users,
        setUsers,
        filteredUsers,

        search,
        setSearch,

        roleFilter,
        setRoleFilter,

        statusFilter,
        setStatusFilter,

        createPanelUser,
        updatePanelUser,
        deletePanelUser,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
