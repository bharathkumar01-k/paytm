import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

import { Alert, AlertTitle } from "./ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
    setUsername,
    setPassword,
    setIsAuthenticated,
    setIsWrongPassword,
} from "../app/users/loggedInUserSlice";
import axios from "axios";
export const SigninComponent = () => {
    const username = useSelector((state) => state.loggedInUser.username);
    const password = useSelector((state) => state.loggedInUser.password);
    const isWrongPassword = useSelector(
        (state) => state.loggedInUser.isWrongPassword
    );
    const isAuthenticated = useSelector(
        (state) => state.loggedInUser.isAuthenticated
    );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const signInHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                "https://paytm-backend-three.vercel.app/api/v1/users/signin",
                {
                    username,
                    password,
                }
            );
            if (result.data.success) {
                dispatch(setIsAuthenticated(true));
                const token = result.headers.token;
                localStorage.setItem("token", token);
                dispatch(setPassword(""));
                console.log(isAuthenticated);
                navigate("/dashboard");
            }
        } catch (err) {
            dispatch(setIsWrongPassword(true));
            console.log(err);
        }
    };
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-[90%] md:w-1/3 flex flex-col items-center">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="font-bold text-2xl">
                        Sign In
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-2/3">
                    <form
                        action=""
                        className="flex flex-col space-y-3"
                        onSubmit={signInHandler}
                    >
                        <Label className="text-md">Email</Label>
                        <Input
                            type="email"
                            value={username}
                            placeholder="johndoe@mail.com"
                            onChange={(e) => {
                                dispatch(setUsername(e.target.value));
                            }}
                        ></Input>
                        <Label className="text-m">Password</Label>
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                dispatch(setPassword(e.target.value));
                            }}
                        ></Input>
                        <Button className="bg-black text-white w-full hover:bg-white hover:text-black">
                            Sign In
                        </Button>
                    </form>
                    {isWrongPassword && (
                        <Alert className="mt-6 rounded bg-red-200 space-x-2">
                            <div className="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                                    />
                                </svg>
                                <AlertTitle className="font-bold ml-2">
                                    Invalid Username/Password
                                </AlertTitle>
                            </div>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex flex-row items-center">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="underline">
                        Sign Up
                    </Link>
                </CardFooter>
            </Card>
            <Outlet />
        </div>
    );
};
