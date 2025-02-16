import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { showToast } from "../utils/showToast"
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, QuerySnapshot, setDoc, where } from "firebase/firestore"
import { ITicket } from "../utils/constants"

const ticketCollectionRef = collection(db, "tickets")
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

export const formDataSubmit = async (data: any) => {
    try {
        // let fileUrl = "";

        // if (file && file.size > 0) {
        //     const fileRef = ref(storage, `/ticket-files/${file.name}`);
        //     await uploadBytes(fileRef, file);
        //     fileUrl = await getDownloadURL(fileRef);
        // }
        const docData = await addDoc(ticketCollectionRef, data)
        showToast("Ticket submission successful", "success")
        return docData
    } catch (error: any) {
        showToast(error.message || "Ticket submission failed", 'error')
    }
}


export const getUserTickets = (userId: string, setTickets: React.Dispatch<React.SetStateAction<ITicket[] | undefined>>)=> {
    const ticketQuery = query(ticketCollectionRef, where("userId", "==", userId))
    
    const unsubscribe = onSnapshot(ticketQuery, (querySnapshot) => {

    const updatedTickets:ITicket[] = [];

    querySnapshot.docs.forEach(doc => {
        const data = doc.data()

        updatedTickets.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            priority: data.priority,
            category: data.category,
            dateOfIssue: data.dateOfIssue,
            phone: data.phone,
            contactEmail: data.contactEmail,
            contact: data.contact,
            urgent: data.urgent,
            file: data.file,
            userId: data.userId
        })
    })
    console.log(updatedTickets)
    setTickets(updatedTickets)
    })
    return unsubscribe;
}