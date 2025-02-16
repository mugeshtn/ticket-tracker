import { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@heroui/react";
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import Header from "../components/Header";
import Ticketform from "../components/Ticketform";
import { useAuth } from "../context/AuthContext";
import { getUserTickets } from "../api/authApi";
import { ITicket, priority } from "../utils/constants";




const SupportDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [tickets, setTickets] = useState<ITicket[]>();
    const { userId } = useAuth();

    useEffect(() => {
        const unsubscribe = getUserTickets(userId, setTickets)

        return () => {
            unsubscribe()
        }
    }, [userId]);

    return (
        <div>
            <Header />
            <div className="min-w-full transition-all duration-300">
                <h1 className={`text-2xl font-bold text-center hidden sm:inline ${showForm ? "hidden" : ""}`}>Support Dashboard</h1>

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
                        <Table className="w-[80rem] sm:w-auto" isStriped aria-label="Support Tickets Table">
                            <TableHeader className="!bg-blue-950">
                                <TableColumn>Ticket ID</TableColumn>
                                <TableColumn>Title</TableColumn>
                                <TableColumn>Priority</TableColumn>
                                <TableColumn>Contact Mail</TableColumn>
                                <TableColumn>Category</TableColumn>
                                <TableColumn>View</TableColumn>
                                <TableColumn>Edit</TableColumn>
                                <TableColumn>Delete</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent="No tickets available.">
                                {tickets && tickets.length > 0 ? (
                                    tickets.map((ticket) => (
                                        <TableRow key={ticket.id} >
                                            <TableCell>{ticket.id}</TableCell>
                                            <TableCell>{ticket.title}</TableCell>
                                            <TableCell>
                                                <Button color={priority[ticket.priority]} size="sm" variant="ghost">{ticket.priority}</Button>
                                            </TableCell>
                                            <TableCell className="text-blue-500">{ticket.contact}</TableCell>
                                            <TableCell>{ticket.category}</TableCell>
                                            <TableCell ><Button isIconOnly variant="light"><Eye /></Button></TableCell>
                                            <TableCell ><Button isIconOnly variant="light" className="text-yellow-500 "><Pencil /></Button></TableCell>
                                            <TableCell ><Button isIconOnly variant="light" className="text-red-500"><Trash /></Button></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    []
                                )}
                            </TableBody>
                        </Table>

                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportDashboard;
