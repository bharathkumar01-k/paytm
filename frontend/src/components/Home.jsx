import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex h-screen">
            <div className=" m-16  w-[65%] flex flex-col justify-around">
                <div className="text-6xl font-bold">Welcome To Wallets App</div>
                <div className="text-xl">
                    <div>Tech Stack Used:</div>
                    <div>
                        <ul className="list-disc list-inside ml-4 pt-2">
                            <li>React</li>
                            <li>ShadCN</li>
                            <li>Tailwind</li>
                            <li>Node</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="text-xl">By,</div>
                    <br />
                    <a
                        className="font-bold text-xl ml-4 underline"
                        href="https://www.linkedin.com/in/bharath-kumar-12602416b"
                        target="__blank"
                    >
                        Bharath
                    </a>
                </div>
            </div>
            <div className=" bg-black w-[35%] text-white flex flex-col items-center justify-center">
                <div className="text-2xl">Create an Account</div>
                <Button
                    className="bg-white text-black m-6 hover:bg-slate-400"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/signup");
                    }}
                >
                    SignUp
                </Button>
                <hr className="h-[2px] w-[75%] my-4 bg-white border-0" />
                <div className="text-2xl">Already Have an Account?</div>
                <Button
                    className="bg-white text-black m-6 hover:bg-slate-400"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/signin");
                    }}
                >
                    SignIn
                </Button>
            </div>
        </div>
    );
};
