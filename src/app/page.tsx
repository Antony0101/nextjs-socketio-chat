import Link from "next/link";
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

export default async function Home() {
    return (
        <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-[#6366F1] to-[#9333EA] text-white">
            <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
                <Link
                    className="flex items-center gap-2 text-lg font-semibold"
                    href="#"
                >
                    <TextIcon className="w-6 h-6" />
                    <span>Chat App</span>
                </Link>
                <nav className="flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium hover:underline"
                        href="#"
                    >
                        Login
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline"
                        href="#"
                    >
                        Sign Up
                    </Link>
                </nav>
            </header>
            <main className="flex-1 flex items-center justify-center px-4 md:px-6">
                <div className="max-w-md w-full space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold">
                            Welcome to Chat App
                        </h1>
                        <p className="text-gray-200">
                            Connect with friends and family in real-time.
                        </p>
                    </div>
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
                    <div className="text-center text-sm">
                        {"Don't have an account?"}
                        <Link className="font-medium underline" href="#">
                            Sign up
                        </Link>
                    </div>
                </div>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700/50">
                <p className="text-xs text-gray-400">
                    © 2024 Chat App. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}

function TextIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
        </svg>
    );
}
