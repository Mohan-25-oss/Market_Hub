import { useState, useEffect } from "react";
import axios from "axios";

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        setLoading(true);

        axios
            .get(`http://localhost:5000/api/users/${email}`)
            .then(res => {
                const role = res.data?.role;

                setIsAdmin(role === "admin");
                setIsSeller(role === "seller");
                setIsBuyer(role === "buyer");

                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsAdmin(false);
                setIsSeller(false);
                setIsBuyer(false);
                setLoading(false);
            });
    }, [email]);

    return { isAdmin, isSeller, isBuyer, loading };
};

export default useAdmin;
