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
import Link from "next/link";

type Props = {
    setSignInFunction: (a: boolean) => void;
};

export default function SignUp({ setSignInFunction }: Props) {
    return (
        <>
            <Card className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>
                        Enter your username and password to sign up.
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
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            className="text-gray-700 dark:text-gray-400"
                            htmlFor="confirm_password"
                        >
                            Confirm Password
                        </Label>
                        <Input
                            className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                            id="confirm_password"
                            placeholder="Enter your password"
                            type="password"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white"
                        type="submit"
                    >
                        Sign up
                    </Button>
                </CardFooter>
            </Card>
            <div className="text-center text-sm">
                {"Already have an account?"}
                <button
                    className="font-medium underline"
                    onClick={() => setSignInFunction(true)}
                >
                    Sign in
                </button>
            </div>
        </>
    );
}
