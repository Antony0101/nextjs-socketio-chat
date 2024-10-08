import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginAction } from "../../server/actions/auth.action";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../lib/contexts/userContext";
import { useState } from "react";
import Image from "next/image";
import spinner from "@/assests/spinner.svg";

const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type SignUpSchemaType = z.infer<typeof SignupSchema>;

type Props = {
    setSignInFunction: (a: boolean) => void;
};

export default function Login({ setSignInFunction }: Props) {
    const { setUser } = useUserContext();
    const router = useRouter();
    const [loginLoading, setLoginLoading] = useState(false);
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignupSchema) });

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (formdata) => {
        setLoginLoading(true);
        try {
            const { success, data, message } = await loginAction(formdata);
            if (!success) {
                toast({
                    variant: "destructive",
                    description: message,
                });
            } else {
                setUser({
                    name: data.name,
                    username: data.username,
                    profilePicture: data.profilePicture,
                    _id: data._id,
                });
                router.push("/chat");
            }
            setLoginLoading(false);
        } catch (e: any) {
            toast({
                variant: "destructive",
                description: e.message,
            });
            setLoginLoading(false);
            console.log(e);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Enter your username and password to sign in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                className="text-gray-700 dark:text-gray-400"
                                htmlFor="username"
                            >
                                Username
                            </Label>
                            <Input
                                className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                id="username"
                                placeholder="Enter your username"
                                type="text"
                                {...register("username")}
                            />
                            {errors.username && (
                                <span className="text-red-700">
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label
                                className="text-gray-700 dark:text-gray-400"
                                htmlFor="password"
                            >
                                Password
                            </Label>
                            <Input
                                className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <span className="text-red-700">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white"
                            disabled={loginLoading}
                            type="submit"
                        >
                            {loginLoading ? (
                                <Image
                                    src={spinner}
                                    alt="loading icon"
                                    className="w-8 h-7"
                                />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            <div className="text-center text-sm">
                {"Don't have an account?"}
                <button
                    className="font-medium underline"
                    onClick={() => setSignInFunction(false)}
                    disabled={loginLoading}
                >
                    Sign up
                </button>
            </div>
        </>
    );
}
