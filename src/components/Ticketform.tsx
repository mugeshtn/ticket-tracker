import { Input, Textarea, Select, SelectItem, Button, Form, Divider } from "@heroui/react";
import { X, Plus } from "lucide-react";
import { ticketDataSubmit } from "../api/tickets";
import { useAuth } from "../context/AuthContext";
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from "react";
import { formTicketSchema } from "../utils/constants";
import { Timestamp } from "firebase/firestore";


const Ticketform = ({ onClose }: { onClose: () => void }) => {
    const { userId } = useAuth()
    const [captcha, setCaptcha] = useState(false)

    const onCaptchaChange = (value: String | null) => {
        if (value) {
            setCaptcha(true)
        } else {
            setCaptcha(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement

        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const file = data.attachment as File;
        const fileName = file.name
        const details = {
            title: data.title,
            description: data.description,
            priority: data.priority,
            category: data.category,
            contactEmail: data.contactEmail,
            file: fileName,
            status: "New",
            userId: userId,
            createdAt: new Date().toLocaleString()
        }

        const parsedForm = formTicketSchema.safeParse(details)

        if (parsedForm.success) {
            await ticketDataSubmit(details)
        } else {
            console.log(parsedForm.error.errors)
        }

        form.reset()
        onClose()
    }

    return (
        <div className="flex justify-center items-center min-w-[330px] sm:min-w-0">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg sm:p-8 py-6 px-6 sm:px-20 relative">
                <h2 className="text-lg sm:text-4xl pt-5 sm:pt-4  font-bold mb-4">Ticket Submission Form</h2>
                <Button className="bg-red-600 text-white absolute top-2 right-2 sm:top-5 sm:right-4" size="sm" onPress={onClose} startContent={<X />}></Button>
                <Divider />
                <Form className="space-y-6 pb-10" onSubmit={handleSubmit} validationBehavior="native">
                    <Input aria-label="title"
                        isRequired
                        label="Title"
                        labelPlacement="outside"
                        type="text"
                        name="title"
                        validate={(value) => {
                            if (value.trim().length < 3) {
                                return "Provide a proper title"
                            }
                        }}
                    />
                    <Textarea aria-label="description"
                        label="Description"
                        type="text"
                        name="description"
                        isRequired
                        validate={(value) => {
                            return value.trim().length > 10 || "Enter a description more than 10 characters"
                        }}
                    />

                    <div className="flex w-full gap-2">
                        <Select label="Priority" name="priority" aria-label="priority" defaultSelectedKeys={["Low"]}>
                            {
                                ["Low", "Medium", "High"].map((val) => {
                                    return <SelectItem key={val} value={val}>{`${val}`}</SelectItem>
                                })
                            }
                        </Select>

                        <Select label="Category" name="category" isRequired aria-label="category"
                            validate={(value) => {
                                if (!value) {
                                    return "You must select a category";
                                }
                            }}>{
                                ["Billing", "Technical", "Feature Request", "Others"].map((val) => (
                                    <SelectItem key={val} value={val}>{`${val}`}</SelectItem>
                                ))
                            }
                        </Select>
                    </div>

                    <Input label="Contact Email" name="contactEmail" aria-label="contact email" isRequired
                        validate={(value) => {
                            const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                            return emailRegex.test(value) || "Enter a valid email"
                        }}
                    />

                    <Input type="file" name="attachment" aria-label="attachment" />

                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={onCaptchaChange}
                    />
                    <Button className="bg-secondary text-white w-full" isDisabled={!captcha} size="lg" type="submit" startContent={<Plus />}>Submit</Button>

                </Form>
            </div>
        </div>

    )
}

export default Ticketform