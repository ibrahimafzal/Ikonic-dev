import { Navigate } from "react-router-dom";



export const OpenRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    if (getTokenFromLocalStorage?.token === undefined) {
        return <>{children}</>
    } else {
        return <Navigate to="/" replace={true} />
    }
}