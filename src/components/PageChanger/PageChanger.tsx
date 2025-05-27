import { useEffect } from "react";

export const PageChanger = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return <div className="animate-wiggle">{children}</div>;
};


