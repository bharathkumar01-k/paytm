import { useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    setUserName,
    setBalance,
    setFistName,
    setLastName,
    setUsersList,
} from "../app/users/currentUserDetailsSlice";
import { Label } from "./ui/label";
import {
    setAmount,
    setIsTransferSuccessful,
} from "../app/users/toUserDetailsSlice";
import { TransferSuccessful } from "./TransferSuccessful";

export const Dashboard = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const isAuthenticated = useSelector(
        (state) => state.loggedInUser.isAuthenticated
    );

    const username = useSelector((state) => state.currentUser.username);
    const firstName = useSelector((state) => state.currentUser.firstName);
    const lastName = useSelector((state) => state.currentUser.lastName);
    const balance = useSelector((state) => state.currentUser.balance);
    const usersList = useSelector((state) => state.currentUser.usersList);

    const amount = useSelector((state) => state.toUser.amount);
    const isTransferSuccessful = useSelector(
        (state) => state.toUser.isTransferSuccessful
    );

    useEffect(() => {
        console.log("Inside effect");
        const getData = async () => {
            try {
                const currentUserDetailsResponse = await axios.get(
                    "http://localhost:3010/api/v1/users/get_current_user_details",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                const bulkUsersResponse = await axios.get(
                    "http://localhost:3010/api/v1/users/bulk?filter=",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (
                    currentUserDetailsResponse.data.success &&
                    bulkUsersResponse.data.success
                ) {
                    const userDetails =
                        currentUserDetailsResponse.data.user_details;
                    dispatch(setUserName(userDetails.username));
                    dispatch(setFistName(userDetails.firstName));
                    dispatch(setLastName(userDetails.lastName));
                    dispatch(setBalance(userDetails.balance));
                    dispatch(setUsersList(bulkUsersResponse.data.users));
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [username, firstName, lastName, balance, dispatch]);

    const inputChangeHandler = async (e) => {
        try {
            const usersListResponse = await axios.get(
                `http://localhost:3010/api/v1/users/bulk?filter=${e.target.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (usersListResponse.data.success) {
                dispatch(setUsersList(usersListResponse.data.users));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const amountChangeHandler = (e) => {
        console.log("target value ", e.target.value);
        dispatch(setAmount(e.target.value));
        console.log("amount", amount);
    };
    const sendMoneyHandler = async (e, user) => {
        e.preventDefault();
        console.log("user and amount", user, amount);
        const transferResponse = await axios.post(
            "http://localhost:3010/api/v1/account/transfer",
            {
                to: user["_id"],
                amount: +amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (transferResponse.data.success) {
            console.log("Transfer successful");
            dispatch(setIsTransferSuccessful(true));
            dispatch(setAmount(0));
            const getBalanceResponse = await axios.get(
                "http://localhost:3010/api/v1/account/balance",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (getBalanceResponse.data.success) {
                dispatch(setBalance(getBalanceResponse.data.balance));
            }
        }
    };
    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <nav className="flex justify-between p-4">
                        <div className="text-3xl font-bold">Payments App</div>
                        <div className="flex items-center space-x-2">
                            <div>Hello, {firstName}</div>
                            <Avatar>
                                <AvatarFallback className="bg-gray-200">
                                    {`${firstName?.[0].toUpperCase()}${lastName?.[0].toUpperCase()}`}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </nav>
                    <hr className="h-[2px] my-4 bg-gray-200 border-0" />
                    <div className="ml-4 text-2xl font-bold py-4">
                        Your balance ₹{balance}
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="ml-4 text-2xl font-bold py-4 ">
                            Users
                        </div>
                        <div className="ml-4 w-[98%] ">
                            <Input
                                className="rounded-lg"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="border-2 border-black ml-4  w-[98%] flex flex-col h-[450px] overflow-y-auto">
                            {usersList.map((user, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center  text-lg space-x-2 p-2">
                                            <Avatar>
                                                <AvatarFallback className="bg-gray-200">
                                                    {`${user.firstName?.[0].toUpperCase()}${user.lastName?.[0].toUpperCase()}`}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>{`${user.firstName} ${user.lastName}`}</div>
                                        </div>
                                        <Dialog>
                                            <DialogTrigger asChild={true}>
                                                <Button className="mr-2 bg-black text-white rounded-lg hover:bg-white hover:text-black">
                                                    Send Money
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-white flex flex-col items-center">
                                                <DialogHeader className="flex flex-col items-center">
                                                    <DialogTitle>
                                                        Send Money
                                                    </DialogTitle>
                                                    <div className="flex items-center  text-lg space-x-2 p-2">
                                                        <Avatar>
                                                            <AvatarFallback className="bg-gray-200">
                                                                {`${user.firstName?.[0].toUpperCase()}${user.lastName?.[0].toUpperCase()}`}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>{`${user.firstName} ${user.lastName}`}</div>
                                                    </div>
                                                </DialogHeader>
                                                <Label>Amount {"(in ₹)"}</Label>
                                                <Input
                                                    type="number"
                                                    className="w-[75%]"
                                                    value={amount}
                                                    onChange={
                                                        amountChangeHandler
                                                    }
                                                />
                                                <Button
                                                    className="bg-green-400"
                                                    onClick={(e) => {
                                                        console.log(
                                                            "inside hanlder"
                                                        );
                                                        sendMoneyHandler(
                                                            e,
                                                            user
                                                        );
                                                    }}
                                                >
                                                    Send Money
                                                </Button>
                                                {isTransferSuccessful && (
                                                    <TransferSuccessful />
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                navigate("/signin")
            )}
        </div>
    );
};
