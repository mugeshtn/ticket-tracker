import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { showToast } from "../utils/showToast"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"


const userCollectionRef = collection(db, "users")

export const registerUser = async (name: string, email: string, password: string, role: string = "customer") => {
    try {

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        if (!userCredentials) throw new Error("User registration failed")

        await setDoc(doc(userCollectionRef, userCredentials.user.uid), {
            name, email, role
        });
        return { uid: userCredentials.user.uid, role }
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user
        const userDoc = await getDoc(doc(userCollectionRef, user.uid))
        if (userDoc.exists()) {
            return { role: userDoc.data().role, uid: user.uid }
        } else {
            throw new Error("User not found");
        }
    } catch (err: any) {
        throw new Error(err.message);
    }
}
export const logoutUser = async () => {
    try {
        await signOut(auth);
        window.location.href = "/login";
        showToast("Logout successful", "success")
    } catch (error: any) {
        showToast(error.message || 'Logout failed', 'error')
    }
}



