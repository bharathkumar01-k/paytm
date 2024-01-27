import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
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
            <Card className="w-1/3 flex flex-col items-center">
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
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => {
                                dispatch(setFistName(e.target.value));
                            }}
                        ></Input>
                        <Label className="text-m">Last Name</Label>
                        <Input
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => {
                                dispatch(setLastName(e.target.value));
                            }}
                        ></Input>
                        <Label className="text-m">Email</Label>
                        <Input
                            type="email"
                            value={username}
                            placeholder="johndoe@mail.com"
                            onChange={(e) => {
                                dispatch(setUserName(e.target.value));
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
                            Sign Up
                        </Button>
                    </form>
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
