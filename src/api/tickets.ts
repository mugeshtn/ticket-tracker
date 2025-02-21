import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, startAfter, where } from "firebase/firestore"
import { ITicket, ticketSchema } from "../utils/constants"
import { db } from "../firebaseConfig"
import { showToast } from "../utils/showToast"
import { useInfiniteQuery } from "@tanstack/react-query";


const ticketCollectionRef = collection(db, "tickets")


export const ticketDataSubmit = async (data: any) => {
    try {

        const docData = await addDoc(ticketCollectionRef, data)
        showToast("Ticket submission successful", "success")
        return docData
    } catch (error: any) {
        showToast(error.message || "Ticket submission failed", 'error')
    }
}

export const getUserTickets = (userId: string, setTickets: React.Dispatch<React.SetStateAction<ITicket[] | undefined>>) => {
    const ticketQuery = query(ticketCollectionRef, where("userId", "==", userId))

    const unsubscribe = onSnapshot(ticketQuery, (querySnapshot) => {

        const updatedTickets: ITicket[] = [];

        querySnapshot.docs.forEach(doc => {
            const data = doc.data()
            const parsedTicket = ticketSchema.safeParse({
                id: doc.id,
                title: data.title,
                description: data.description,
                priority: data.priority,
                category: data.category,
                status: data.status,
                contactEmail: data.contactEmail,
                createdAt: data.createdAt,
                file: data.file,
                userId: data.userId
            })
            if (parsedTicket.success) {
                updatedTickets.push(parsedTicket.data)
            } else {
                console.error("Invalid ticket data:", parsedTicket.error);
            }
        })
        setTickets(updatedTickets)
    })
    return unsubscribe;
}


interface TicketPage {
    updatedTickets: ITicket[];
    lastDoc: QueryDocumentSnapshot | null;
}


export const showAllTickets = async ({ pageParam = null }: { pageParam?: QueryDocumentSnapshot | null }): Promise<TicketPage> => {
    let ticketQuery = query(ticketCollectionRef, orderBy("createdAt", "desc"), limit(10));

    if (pageParam) {
        ticketQuery = query(ticketCollectionRef, orderBy("createdAt", "desc"), startAfter(pageParam), limit(10));
    }

    const querySnapshot = await getDocs(ticketQuery);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    const updatedTickets: ITicket[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const parsedTicket = ticketSchema.safeParse({
            id: doc.id,
            title: data.title,
            description: data.description,
            priority: data.priority,
            category: data.category,
            createdAt: data.createdAt.toDate(),
            status: data.status,
            contactEmail: data.contactEmail,
            file: data.file,
            userId: data.userId,
        });

        if (parsedTicket.success) {
            return parsedTicket.data;
        } else {
            console.error("Invalid ticket data:", parsedTicket.error);
            return null;
        }
    }).filter((ticket) => ticket !== null) as ITicket[];

    return { updatedTickets, lastDoc };
};

export const useTickets = () => {
    return useInfiniteQuery({
        queryKey: ["allTickets"],
        queryFn: showAllTickets,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.lastDoc || null
    });
};