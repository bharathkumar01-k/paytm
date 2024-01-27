import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
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

import { useSelector, useDispatch } from "react-redux";
import {
    setFistName,
    setIsSignupSuccessful,
    setLastName,
    setPassword,
    setUserName,
} from "../app/users/usersSlice";
import axios from "axios";
export const SignupComponent = () => {
    const firstName = useSelector((state) => state.users.firstName);
    const lastName = useSelector((state) => state.users.lastName);
    const username = useSelector((state) => state.users.username);
    const password = useSelector((state) => state.users.password);

    const isSignupSuccessful = useSelector(
        (state) => state.users.isSignupSuccessful
    );
    const dispatch = useDispatch();

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                "https://paytm-backend-three.vercel.app/api/v1/users/signup",
                {
                    username,
                    firstName,
                    lastName,
                    password,
                }
            );
            if (result.data.success) {
                dispatch(setIsSignupSuccessful(true));
                dispatch(setUserName(""));
                dispatch(setFistName(""));
                dispatch(setLastName(""));
                dispatch(setPassword(""));
            }
            console.log("result", result.data);
        } catch (err) {
            console.log("err", err);
        }
    };
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-[90%] md:w-1/3 flex flex-col items-center">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="font-bold text-2xl">
                        Sign Up
                    </CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-2/3">
                    <form
                        action=""
                        className="flex flex-col space-y-3"
                        onSubmit={signupHandler}
                    >
                        <Label>First Name</Label>
                        <Input
                            required
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => {
                                dispatch(setFistName(e.target.value));
                            }}
                        ></Input>
                        <Label className="text-m">Last Name</Label>
                        <Input
                            required
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => {
                                dispatch(setLastName(e.target.value));
                            }}
                        ></Input>
                        <Label className="text-m">Email</Label>
                        <Input
                            required
                            type="email"
                            value={username}
                            placeholder="johndoe@mail.com"
                            onChange={(e) => {
                                dispatch(setUserName(e.target.value));
                            }}
                        ></Input>
                        <Label className="text-m">Password</Label>
                        <Input
                            required
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                dispatch(setPassword(e.target.value));
                            }}
                        ></Input>
                        <Button className="bg-black text-white w-full hover:bg-white hover:text-black">
                            Sign Up
                        </Button>
                    </form>
                    {isSignupSuccessful && (
                        <Alert className="flex items-center mt-6 rounded bg-slate-300">
                            <BellIcon />
                            <div>
                                <AlertTitle className="font-bold">
                                    Signup Successful!
                                </AlertTitle>
                                <AlertDescription>
                                    Please{" "}
                                    <Link to="/signin" className="underline">
                                        Sign In
                                    </Link>
                                    &nbsp; to Continue
                                </AlertDescription>
                            </div>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex flex-row items-center">
                    Already have an account?&nbsp;
                    <Link to="/signin" className="underline">
                        Sign In
                    </Link>
                </CardFooter>
            </Card>
            <Outlet />
        </div>
    );
};
