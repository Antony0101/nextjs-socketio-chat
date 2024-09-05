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
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useGetSelfDetails } from "@/utils/hooks/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { imageList, folderName } from "@/utils/imageList";

const UpdateUserSchema = z.object({
    username: z.string(),
    name: z.string(),
    profilePicture: z.string(),
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
        getValues,
        setValue,
    } = useForm<UpdateUserSchemaType>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            username: "",
            name: "",
            profilePicture: "",
        },
        values: {
            username: data?.data?.username || "",
            name: data?.data?.name || "",
            profilePicture: data?.data?.profilePicture || "",
        },
    });

    const profilePicture = watch("profilePicture");

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
                        <div className="pt-2">
                            <Label
                                className="text-gray-700 dark:text-gray-400"
                                htmlFor="profilePicture"
                            >
                                Profile Picture
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="pt-2">
                                        <div className="h-10 w-10 rounded-full">
                                            <Image
                                                id="profilePicture"
                                                alt="Avatar"
                                                className="h-10 w-10 rounded-full"
                                                height={40}
                                                src={profilePicture || ""}
                                                style={{
                                                    aspectRatio: "40/40",
                                                    objectFit: "cover",
                                                }}
                                                width={40}
                                            />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white z-50">
                                    {imageList.map((image, index) => (
                                        <DropdownMenuItem
                                            key={index}
                                            onSelect={() =>
                                                setValue(
                                                    "profilePicture",
                                                    folderName + image,
                                                    { shouldDirty: true },
                                                )
                                            }
                                        >
                                            <div className="h-10 w-10 rounded-full">
                                                <Image
                                                    alt="Avatar"
                                                    className="h-10 w-10 rounded-full"
                                                    height={40}
                                                    src={
                                                        folderName + image || ""
                                                    }
                                                    style={{
                                                        aspectRatio: "40/40",
                                                        objectFit: "cover",
                                                    }}
                                                    width={40}
                                                />
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                    {/* <DropdownMenuItem
                                        onSelect={() =>
                                            console.log("Take a photo")
                                        }
                                    >
                                        Take a photo
                                    </DropdownMenuItem> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {errors.profilePicture && (
                                <span className="text-red-700">
                                    {errors.profilePicture.message}
                                </span>
                            )}
                        </div>
                        <div className="pt-2">
                            <Label
                                className="text-gray-700 dark:text-gray-400"
                                htmlFor="username"
                            >
                                User Name
                            </Label>
                            <div className="pt-2">
                                <Input
                                    className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    id="username"
                                    placeholder="Enter your username"
                                    type="text"
                                    {...register("username")}
                                />
                            </div>
                            {errors.username && (
                                <span className="text-red-700">
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div className="pt-4">
                            <Label
                                className="text-gray-700 dark:text-gray-400"
                                htmlFor="name"
                            >
                                Name
                            </Label>
                            <div className="pt-2">
                                <Input
                                    className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    id="password"
                                    placeholder="Enter your password"
                                    type="text"
                                    {...register("name")}
                                />
                            </div>
                            {errors.name && (
                                <span className="text-red-700">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                        <div className="pt-4">
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
