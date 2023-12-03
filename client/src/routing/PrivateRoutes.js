import { Navigate } from "react-router-dom";



export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    if (getTokenFromLocalStorage?.token) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace={true} />
    }
}