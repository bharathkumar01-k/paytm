import { useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    setUserName,
    setBalance,
    setFistName,
    setLastName,
    setUsersList,
} from "../app/users/currentUserDetailsSlice";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.currentUser.username);
    const firstName = useSelector((state) => state.currentUser.firstName);
    const lastName = useSelector((state) => state.currentUser.lastName);
    const balance = useSelector((state) => state.currentUser.balance);
    const usersList = useSelector((state) => state.currentUser.usersList);
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
    return (
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
                <div className="ml-4 text-2xl font-bold py-4 ">Users</div>
                <div className="ml-4 w-[98%] ">
                    <Input
                        className="rounded-lg"
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="border-2 border-black ml-4  w-[98%] flex flex-col h-[450px] overflow-y-auto">
                    {usersList.map((user, idx) => {
                        {
                            console.log(user);
                        }
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
                                <Button className="mr-2 bg-black text-white rounded-lg hover:bg-white hover:text-black">
                                    Send Money
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
