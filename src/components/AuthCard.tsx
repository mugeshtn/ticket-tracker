import { Form, Input, Button, Card, CardHeader, CardBody, Divider, CardFooter, Link} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/showToast";

const AuthCard = ({ register }: { register: boolean }) => {
    const navigate = useNavigate();
    const { setRole, setAuthorised, setUserId } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement;
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try{
            const userData = await registerUser(name, email, password)
            setRole(userData.role)
            setUserId(userData.uid)
            setAuthorised(true)
            navigate("/dashboard")
            showToast("Registration successful", "success");
        } catch (error: any) {
            showToast(error.message, "error");
        }

        form.reset()
    }
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const form = e.target as HTMLFormElement;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const userData = await loginUser(email, password);
            if (userData) {
                setRole(userData.role || "customer");
                setUserId(userData.uid)
                setAuthorised(true);
                navigate("/dashboard");
                showToast("Login successful", "success"); 
            }
        } catch (error: any) {
            showToast(error.message, "error"); 
        }
        form.reset()
    }

    return (
        <>
            <div className="flex min-h-[32rem] items-center justify-center">
                <Card className="card_style">
                    <CardHeader className="font-serif p-5 block text-center text-2xl">
                        {register ? "Register" : "Login"}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Form
                            className="form_style relative"
                            validationBehavior="native"
                            onSubmit={register ? handleRegistration : handleLogin}
                        >
                            {
                                register && (
                                    <Input
                                        isRequired
                                        label="Name"
                                        labelPlacement="outside"
                                        name="name"
                                        type="text"
                                        validate={(value) => {
                                            if (value.trim().length < 3) {
                                                return "Username must be at least 3 characters long";
                                            }
                                        }}
                                    />
                                )
                            }
                            <Input
                                isRequired
                                label="Email"
                                labelPlacement="outside"
                                name="email"
                                type="text"
                                validate={(value) => {
                                    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                                    return emailRegex.test(value) || "Enter a valid email"
                                }}
                            />

                            <div className="w-full">
                                <div className="relative h-[40px]">
                                    <Input
                                        isRequired
                                        label="password"
                                        labelPlacement="outside"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        validate={register ? (value) => {
                                            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
                                            return passwordRegex.test(value.trim()) ||
                                                "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, and a number.";
                                        } : undefined}
                                    />
                                    <p className="absolute right-3 bottom-3" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </p>
                                </div>
                            </div>
                            <Button color="primary" className={`mx-auto mt-8 sm:mt-4 mb-2 w-full sm:w-auto`} type="submit">
                                {register ? "Register" : "Login"}
                            </Button>
                        </Form>
                    </CardBody>
                    <Divider />
                    <CardFooter className="justify-center text-sm sm:text-lg">
                        {register
                            ? <p>Already have an Account ? <Link underline="hover" href="/login">Login.</Link></p>
                            : <p>Don't have an Account ? <Link underline="hover" href="/register">Register.</Link></p>}
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default AuthCard;