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
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpAction } from "@/server/actions/auth.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    setSignInFunction: (a: boolean) => void;
};

const SignupSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3).max(10),
    password: z.string().min(2),
    confirm_password: z.string(),
});

type SignUpSchemaType = z.infer<typeof SignupSchema>;

export default function SignUp({ setSignInFunction }: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignupSchema) });

    const onSubmit: SubmitHandler<SignUpSchemaType> = async (formData) => {
        try {
            const { success, data, message } = await signUpAction(formData);
            if (!success) {
                toast({
                    variant: "destructive",
                    description: message,
                });
            } else {
                router.push("/chat");
            }
        } catch (e: any) {
            toast({
                variant: "destructive",
                description: e.message,
            });
            console.log(e);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                htmlFor="name"
                            >
                                Name
                            </Label>
                            <Input
                                className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                id="name"
                                placeholder="Enter your name"
                                type="text"
                                {...register("name")}
                            />
                            {errors.name && (
                                <span className="text-red-700">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
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
                                {...register("confirm_password")}
                            />
                            {errors.confirm_password && (
                                <span>{errors.confirm_password.message}</span>
                            )}
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
            </form>
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
