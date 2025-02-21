import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
} from "@heroui/react";
import { Estatus, ITicket, priority } from "../utils/constants";
import { Eye, Pencil, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import TicketDetails from "./TicketDetails";
const DashboardCard = ({ tickets }: { tickets: ITicket[] | undefined }) => {
    const { role } = useAuth()
    const [view, setView] = useState(false)
    const [ticketDetails, setTicketDetails] = useState<ITicket | undefined>(undefined)

    const handleTicketDetails = (ticket: ITicket) => {
        setView(true)
        setTicketDetails(ticket)
    }
    return (

        <>
            {
                view ? (
                    <TicketDetails setView={setView} ticket={ticketDetails} />
                )
                    :
                    <Table className="w-[80rem] sm:w-auto" isStriped aria-label="Support Tickets Table">
                        <TableHeader className="!bg-blue-950">
                            <TableColumn>Ticket ID</TableColumn>
                            <TableColumn className="min-w-[220px]">Title</TableColumn>
                            <TableColumn>Category</TableColumn>
                            <TableColumn>Contact Mail</TableColumn>
                            <TableColumn>Priority</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>view</TableColumn>
                            <TableColumn>
                                {
                                    role == "customer" ? "Delete" : "Edit"
                                }
                            </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="No tickets available.">
                            {tickets && tickets.length > 0 ? (
                                tickets.map((ticket) => (

                                    <TableRow key={ticket.id} >
                                        <TableCell>{ticket.id}</TableCell>
                                        <TableCell className="font-semibold">{ticket.title}</TableCell>
                                        <TableCell>{ticket.category}</TableCell>

                                        <TableCell className="text-blue-500">{ticket.contactEmail}</TableCell>
                                        <TableCell>    <p className={`text-${priority[ticket.priority]} font-semibold`}>{ticket.priority}</p></TableCell>
                                        <TableCell><Chip color={Estatus[ticket.status]} size="sm" className="px-3" variant="flat">{ticket.status}</Chip></TableCell>
                                        <TableCell><Button onPress={() => handleTicketDetails(ticket)} isIconOnly variant="light"><Eye /></Button></TableCell>
                                        <TableCell >
                                            {
                                                role === "customer"
                                                    ? <Button isIconOnly variant="light" className="text-red-500"><Trash /></Button>
                                                    : <Button isIconOnly variant="light" className="text-yellow-500 "><Pencil /></Button>
                                            }
                                        </TableCell>

                                    </TableRow>
                                ))
                            ) : (
                                []
                            )}
                        </TableBody>
                    </Table>
            }
        </>
    )
}

export default DashboardCard