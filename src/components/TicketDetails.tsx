import { Button, Card, CardBody, CardHeader, Chip, Divider, User } from "@heroui/react"
import { X } from "lucide-react"
import { ITicket, priority, formatDate, Estatus } from "../utils/constants"

const TicketDetails = ({ setView, ticket }: { setView: React.Dispatch<React.SetStateAction<boolean>>, ticket: Partial<ITicket> | undefined }) => {
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="relative top-0 right-0 z-10 p-10">
                    <Button className="absolute top-10 right-10 sm:top-4 sm:right-2 z-10 " color="danger" size="sm" variant="solid" onPress={() => setView(false)}><X /></Button>
                    <Card className=" max-w-[330px] md:min-w-[500px] md:max-w-[600px] px-10 py-3">
                        <CardHeader>
                            <div className="w-full flex justify-start items-center">
                                <User
                                    avatarProps={{
                                        src: "/icons/profile-user.png",
                                    }}
                                    description={ticket?.contactEmail}
                                    name={ticket?.contactEmail?.split("@")[0]}
                                />
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className="flex-col gap-1 text-medium">
                            <center className="font-semibold">{ticket?.title}</center>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-7 sm:gap-16 mt-4">
                                    <div className=" flex flex-col">
                                        <small className="text-default-600 font-semibold">Ticket ID:</small>
                                        <small className="text-xs max-w-20 overflow-hidden sm:max-w-[200px]">{ticket?.id}</small>
                                    </div>
                                    <div className=" flex flex-col">
                                        <small className="text-default-600 font-semibold">Date:</small>
                                        <small className="text-xs">{formatDate(ticket?.createdAt)}</small>
                                    </div>
                                </div>
                                <div>
                                    <small className="text-default-600 font-semibold">Description:</small>
                                    <p className="text-xs sm:text-sm">{ticket?.description}</p>
                                </div>
                                <div className="flex  sm:justify-evenly justify-between sm:text-start gap-3">
                                    <div>
                                        <small className="text-default-600 font-semibold">Priority:</small>
                                        <p className={`text-sm mt-1 text-${priority[ticket?.priority ?? "Low"]}`}>{ticket?.priority}</p>
                                    </div>
                                    <div>
                                        <small className="text-default-600  font-semibold">status:</small>
                                        <p><Chip className={`text-xs sm:text-sm mt-1`} variant="flat" color={Estatus[ticket?.status ?? "New"]}>{ticket?.status}</Chip></p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default TicketDetails