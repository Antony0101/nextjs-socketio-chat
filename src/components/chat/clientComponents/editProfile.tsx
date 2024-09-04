import { updateUserDetails } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useGetSelfDetails } from "@/utils/hooks/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const UpdateUserSchema = z.object({
    username: z.string(),
    name: z.string(),
    // profilePicture: z.string(),
});

type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

export function EditProfileDialog({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { toast } = useToast();
    const { data, isLoading } = useGetSelfDetails();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UpdateUserSchemaType>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            username: "",
            name: "",
        },
        values: {
            username: data?.data?.username || "",
            name: data?.data?.name || "",
        },
    });

    const onSubmit: SubmitHandler<UpdateUserSchemaType> = async (formdata) => {
        try {
            const { success, data, message } =
                await updateUserDetails(formdata);
            if (!success) {
                toast({
                    variant: "default",
                    description: message,
                });
            } else {
                toast({
                    variant: "default",
                    description: message,
                });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setOpen(false);
            }
        } catch (e: any) {
            toast({
                variant: "destructive",
                description: e.message,
            });
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isLoading ? "Loading ..." : "Edit Profile"}
                    </DialogTitle>
                </DialogHeader>
                {!isLoading && (
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                htmlFor="name"
                            >
                                Name
                            </Label>
                            <Input
                                className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                id="password"
                                placeholder="Enter your password"
                                type="text"
                                {...register("name")}
                            />
                            {errors.name && (
                                <span className="text-red-700">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
