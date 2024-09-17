"use client";
import { Button } from "../../ui/button";
import { createChat } from "../../../server/actions/chat.action";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../ui/use-toast";
import { useGetSelfDetails, useGetUsersInGroup } from "../../../utils/hooks/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { imageList, folderName } from "../../../utils/imageList";
import AddGroupIcon from "../../icons/addGroupIcon";
import { MultiSelect } from "../../ui/multiselect";
import { useUserContext } from "../../../lib/contexts/userContext";
import { useQueryClient } from "@tanstack/react-query";
import { set } from "mongoose";

const CreateGroupSchema = z.object({
    name: z.string().min(3),
    photo: z.string().trim().min(1, "Please select a photo"),
    userIds: z.array(z.string()),
});

type CreateGroupSchemaType = z.infer<typeof CreateGroupSchema>;

export function AddGroupDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<CreateGroupSchemaType>({
        resolver: zodResolver(CreateGroupSchema),
        defaultValues: {
            name: "",
            photo: undefined,
            userIds: [],
        },
    });

    const { data: userList, isLoading: userListLoading } = useGetUsersInGroup({
        groupId: "",
        type: "allExceptSelf",
    });
    const { user } = useUserContext();
    const userListUpdated = userList?.data
        ? userList.data.map((user) => {
              return { value: user._id, label: user.name };
          })
        : [];

    const photo = watch("photo");
    const userIds = watch("userIds");

    const onSubmit: SubmitHandler<CreateGroupSchemaType> = async (formdata) => {
        try {
            const { success, data, message } = await createChat(
                "group",
                [...formdata.userIds, user._id],
                { name: formdata.name, photo: formdata.photo },
            );
            if (!success) {
                toast({
                    variant: "destructive",
                    description: message,
                });
            } else {
                toast({
                    variant: "default",
                    description: message,
                });
                setDialogOpen(false);
                setValue("name", "");
                setValue("photo", "");
                setValue("userIds", []);
                queryClient.invalidateQueries({ queryKey: ["chatList"] });
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } catch (e: any) {
            toast({
                variant: "destructive",
                description: e.message,
            });
        }
    };
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <AddGroupIcon className="h-7 w-10" />
                    <span className="sr-only">New Group</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{"Add Group"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="pt-2">
                        <Label
                            className="text-gray-700 dark:text-gray-400"
                            htmlFor="photo"
                        >
                            Profile Picture
                        </Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="pt-2">
                                    <div className="h-10 w-10 rounded-full">
                                        <Image
                                            id="photo"
                                            alt="Avatar"
                                            className="h-10 w-10 rounded-full"
                                            height={40}
                                            src={photo || ""}
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width={40}
                                        />
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white z-50 h-96 overflow-scroll">
                                {imageList.map((image, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onSelect={() =>
                                            setValue(
                                                "photo",
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
                                                src={folderName + image || ""}
                                                style={{
                                                    aspectRatio: "40/40",
                                                    objectFit: "cover",
                                                }}
                                                width={40}
                                            />
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {errors.photo && (
                            <span className="text-red-700">
                                {errors.photo.message}
                            </span>
                        )}
                    </div>
                    <div className="pt-2">
                        <Label
                            className="text-gray-700 dark:text-gray-400"
                            htmlFor="name"
                        >
                            User Name
                        </Label>
                        <div className="pt-2">
                            <Input
                                className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                id="name"
                                placeholder="Enter your name"
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
                    <div className="pt-2">
                        <Label
                            className="text-gray-700 dark:text-gray-400"
                            htmlFor="userIds"
                        >
                            Users
                        </Label>
                        <div className="pt-2">
                            <MultiSelect
                                id="userIds"
                                options={userListUpdated}
                                onValueChange={(value) =>
                                    setValue("userIds", value)
                                }
                                defaultValue={userIds}
                                placeholder="Select users"
                                variant="inverted"
                                animation={0}
                                maxCount={3}
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
