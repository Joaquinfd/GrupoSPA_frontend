import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";


function AuthProvider({ children} ){
    // Busca el token, y si no lo encuentra, vale null
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [scope, setScope] = useState(localStorage.getItem("scope") || "");


    useEffect(() => {
        // Si se produce cambio en el token, se envia el token a las "acciones hijas"
        localStorage.setItem("token", token);
        localStorage.setItem("scope", scope);
    }, [token, scope])
    

    function logout(){
        setToken("");
        setScope("");

    }

    return (
       <AuthContext.Provider value={{token, setToken, logout, scope, setScope}}>
        {children}
       </AuthContext.Provider> 
    )
}

export default AuthProvider;
