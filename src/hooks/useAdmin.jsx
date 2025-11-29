import { useState, useEffect } from "react";
import axios from "axios";

const useAdmin = (email) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return setLoading(false);

        setLoading(true);
        axios
            .get(`http://localhost:5000/users/admin/${email}`) // or /role/:email
            .then(res => {
                setRole(res.data.isAdmin ? "admin" : "user");
            })
            .catch(() => setRole("user"))
            .finally(() => setLoading(false));
    }, [email]);

    return {
        isAdmin: role === "admin",
        isSeller: role === "seller",
        isBuyer: role === "buyer",
        loading
    };
};

export default useAdmin;
