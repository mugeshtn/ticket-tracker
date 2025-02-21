import { useEffect, useState } from "react";
import {
    Button,
} from "@heroui/react";
import { Plus } from "lucide-react";
import Header from "../components/Header";
import Ticketform from "../components/Ticketform";
import { useAuth } from "../context/AuthContext";
import { getUserTickets } from "../api/tickets";
import { ITicket } from "../utils/constants";
import DashboardCard from "../components/DashboardCard";


const UserDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [tickets, setTickets] = useState<ITicket[] | undefined>(undefined);
    const { userId } = useAuth();
    useEffect(() => {
        const unsubscribe = getUserTickets(userId, setTickets);

        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, [userId]);

    return (
        <div>
            <Header />
            <div className="min-w-full transition-all duration-300">
                <h1 className={`text-2xl sm:text-4xl text-white font-bold text-center hidden sm:inline ${showForm ? "hidden" : ""}`}>User Dashboard</h1>

                <div className="flex justify-end mb-4 sm:mr-20">
                    <Button
                        color="success"
                        className={`rounded-lg cursor-pointer mb-2 hover:text-gray-700 ${showForm ? "hidden" : ""}`}
                        onPress={() => setShowForm(true)}
                    >
                        <Plus /> Raise Ticket
                    </Button>
                </div>
                {showForm ? (
                    <Ticketform onClose={() => setShowForm(!showForm)} />
                ) : (
                    <div className="overflow-x-auto sm:px-10">
                        <DashboardCard tickets={tickets} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
