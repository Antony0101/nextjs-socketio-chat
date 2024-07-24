import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth";
import { useForm, SubmitHandler } from "react-hook-form";

type InputType = {
    username: string;
    password: string;
};

type Props = {
    setSignInFunction: (a: boolean) => void;
};

export default function Login({ setSignInFunction }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<InputType>();

    const onSubmit: SubmitHandler<InputType> = async (data) => {
        try {
            const { data: hello } = await loginAction(data);
            console.log(hello);
        } catch (e: any) {
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
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white"
                            type="submit"
                        >
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            <div className="text-center text-sm">
                {"Don't have an account?"}
                <button
                    className="font-medium underline"
                    onClick={() => setSignInFunction(false)}
                >
                    Sign up
                </button>
            </div>
        </>
    );
}
