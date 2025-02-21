import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {  Loader } from "lucide-react";


interface AuthContextType {
    authorised: boolean,
    setAuthorised: Function
    role: string,
    setRole: Function
    userId: string,
    setUserId: Function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [authorised, setAuthorised] = useState(false);
    const [role, setRole] = useState("")
    const [userId, setUserId] = useState("")
    const [isLoading, setIsLoading] = useState(true)


    isLoading && (
        <div className="flex justify-center items-center h-full">
            <Loader size="lg"  fill="white"/> 
        </div>
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);

                const userDocRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    setRole(docSnap.data().role || "");
                } else {
                    console.log("No such document!");
                }
                setAuthorised(true);
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setAuthorised(false);
            }
        });
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <Loader size="200px"/>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ authorised, setAuthorised, role, setRole, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("UseAuth must be used with Auth provider")
    return context;
}