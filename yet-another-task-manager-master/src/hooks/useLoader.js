import React, { useState } from "react";
import Loader from "../components/Loader/Loader";

const useLoader = () => {
    const [loading, setLoading] = useState(false);
    return [
        loading ? <Loader /> : null,
        () => setLoading(true),
        () => setLoading(false),
        loading,
    ];
};

export default useLoader;