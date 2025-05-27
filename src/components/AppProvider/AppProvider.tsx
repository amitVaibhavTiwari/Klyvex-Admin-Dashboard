import { useEffect, useState } from "react"
import { useGlobalContext } from "../../lib/GlobalContext"

const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [processing, setProcessing] = useState<boolean>(true)
    const { dispatch } = useGlobalContext()
    useEffect(() => {
        const theme = localStorage.getItem("userPreferredTheme")
        if (theme) {
            dispatch({
                type: "setTheme",
                payload: theme as "light" | "dark"
            })
            setProcessing(false)
        } else {
            const prefersDarkMode = window.matchMedia(
                "(prefers-color-scheme:dark)"
            ).matches;

            if (prefersDarkMode === true) {
                dispatch({
                    type: "setTheme",
                    payload: "dark"
                })
            } else {
                dispatch({
                    type: "setTheme",
                    payload: "light"
                })
            }
            setProcessing(false)
        }
    }, [])

    if (processing) {
        return null
    }
    return (<>
        {children}
    </>
    )
}

export default AppProvider
