import { useState, useEffect } from "react";
import axios from "axios";

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    useEffect(() => {
        if (!email) return;
        axios.get(`http://localhost:5000/users/seller/${email}`)
            .then(res => setIsSeller(res.data.isSeller))
            .catch(() => setIsSeller(false));
    }, [email]);
    return { isSeller };
};

export default useSeller;