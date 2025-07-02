import { useEffect, useState } from "react";
import { useGlobalContext } from "../../lib/GlobalContext";
import { api } from "../../Utils/api";

// anything that needs to be loaded initially when the dahboard loads for the first time can be added here.
const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [processing, setProcessing] = useState<boolean>(true);
    const { dispatch } = useGlobalContext();

    const getUserPreferredTheme = () => {
        const theme = localStorage.getItem("userPreferredTheme");
        if (theme) {
            dispatch({
                type: "setTheme",
                payload: theme as "light" | "dark",
            });
        } else {
            const prefersDarkMode = window.matchMedia(
                "(prefers-color-scheme:dark)"
            ).matches;

            if (prefersDarkMode === true) {
                dispatch({
                    type: "setTheme",
                    payload: "dark",
                });
            } else {
                dispatch({
                    type: "setTheme",
                    payload: "light",
                });
            }
        }
    };

    const getUserDetails = async () => {
        const resp = await api.get("/staff/get-self-details");
        if (resp?.data?.data?.user) {
            dispatch({
                type: "setUser",
                payload: {
                    email: resp?.data?.data?.user.email,
                    id: resp?.data?.data?.user.id,
                    name: resp?.data?.data?.user.name,
                },
            });
        }
        setProcessing(false);
    };

    useEffect(() => {
        getUserPreferredTheme();
        getUserDetails();
    }, []);

    if (processing) {
        return null;
    }
    return <>{children}</>;
};

export default AppProvider;
