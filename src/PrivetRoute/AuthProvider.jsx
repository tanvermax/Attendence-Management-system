import { createContext, useEffect, useState } from "react"


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();



const AuthProvider = ({ children }) => {

     const [loading, setLoading] = useState(true);


    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
        setLoading(false);
    }, []);

    

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };


    const authinfo = {
        user, login, logout,loading
    }

    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );


}


export default AuthProvider;