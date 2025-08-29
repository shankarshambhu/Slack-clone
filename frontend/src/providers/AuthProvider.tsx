import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect } from "react"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
const AuthContext = createContext({});

function AuthProvider({ children }: any) {
    const { getToken } = useAuth();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use(
            async (config) => {
                try {
                    const token = await getToken();
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error: any) {
                    if (error.message.includes('auth') || error.message.includes('token')) {
                        toast.error('Authentication failed');
                    }
                    console.log('Error getting token', error);
                }
                return config
            },
            (error) => {
                console.error("AXIOS ERROR ", error);
                return Promise.reject(error);

            }
        )
        return () => axiosInstance.interceptors.request.eject(interceptor);

    }, [getToken]);

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
export default AuthProvider