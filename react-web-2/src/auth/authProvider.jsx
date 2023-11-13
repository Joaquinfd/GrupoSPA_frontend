import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";


function AuthProvider({ children} ){
    // Busca el token, y si no lo encuentra, vale null
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        // Si se produce cambio en el token, se envia el token a las "acciones hijas"
        localStorage.setItem("token", token);
    }, [token])

    function logout(){
        setToken("");
    }

    return (
       <AuthContext.Provider value={{token, setToken, logout}}>
        {children}
       </AuthContext.Provider> 
    )
}

export default AuthProvider;
