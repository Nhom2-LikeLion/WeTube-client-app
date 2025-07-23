"use client";

import { useEffect } from "react";

const Page = () => {
    useEffect(() => {
        console.log("where am i rendered?")
    },[]);

    return (
        <div>
            Trending Page
        </div>
    );
};

export default Page;