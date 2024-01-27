import { Link, Outlet, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import {
    setUsername,
    setPassword,
    setIsAuthenticated,
} from "../app/users/loggedInUserSlice";
import axios from "axios";
export const SigninComponent = () => {
    const username = useSelector((state) => state.loggedInUser.username);
    const password = useSelector((state) => state.loggedInUser.password);
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
            console.log(err);
        }
    };
    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-1/3 flex flex-col items-center">
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
