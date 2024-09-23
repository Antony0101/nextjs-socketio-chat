"use client";
import { useUserOnlineContext } from "@/lib/contexts/chatOnlineContext";
import { useChatContext } from "../../../lib/contexts/chatContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/plusIcon";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multiselect";
import { useGetUsersInGroup } from "@/utils/hooks/queries";
import { useEffect, useState } from "react";
import { socket } from "@/lib/sockectClient";
import { useQueryClient } from "@tanstack/react-query";

function arraysEqual(a: any[], b: any[]) {
    a.sort();
    b.sort();

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

export default function ChatHeader() {
    const queryClient = useQueryClient();
    const { selectedChat } = useChatContext();
    const { onlineUsers } = useUserOnlineContext();
    const [groupUsers, setGroupUsers] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { data: userList, isLoading: userListLoading } = useGetUsersInGroup({
        groupId: selectedChat.userId === "" ? selectedChat.chatId : "",
        type: "allExceptSelf",
    });
    const userListUpdated = userList?.data
        ? userList.data.map((user) => {
              return { value: user._id, label: user.name };
          })
        : [];
    // console.log("Online True: ", onlineUsers.includes(selectedChat));
    const groupOriginalUsers = selectedChat.users.map(
        (user) => user.userId._id,
    );

    useEffect(() => {
        setGroupUsers(selectedChat.users.map((user) => user.userId._id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat.chatId]);

    if (!selectedChat.chatId) return <></>;
    console.log("Selected Chat: ", selectedChat.users);

    const onSave = () => {
        console.log("Save Changes");
        const removedUsers = groupOriginalUsers.filter(
            (user) => !groupUsers.includes(user),
        );
        const addedUsers = groupUsers.filter(
            (user) => !groupOriginalUsers.includes(user),
        );
        console.log("Removed Users: ", removedUsers);
        console.log("Added Users: ", addedUsers);
        if (removedUsers.length > 0) {
            socket.emit(
                "removeMember",
                {
                    chatId: selectedChat.chatId,
                    userIds: removedUsers,
                },
                (data: any) => {
                    console.log("Remove Member: ", data);
                },
            );
        }
        if (addedUsers.length > 0) {
            socket.emit(
                "addMember",
                {
                    chatId: selectedChat.chatId,
                    userIds: addedUsers,
                },
                (data: any) => {
                    console.log("Add Member: ", data);
                },
            );
        }
        queryClient.invalidateQueries({
            queryKey: ["chatList"],
        });
        setDialogOpen(false);
    };
    return (
        <div className="flex h-[60px] items-center border-b bg-gray-100/40 px-4 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex items-center gap-4">
                <Image
                    alt="Avatar"
                    className="h-10 w-10 rounded-full"
                    height={40}
                    src={
                        selectedChat?.profilePicture.startsWith("/")
                            ? selectedChat?.profilePicture
                            : "/" + selectedChat?.profilePicture
                    }
                    style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                    }}
                    width={40}
                />
                <div>
                    <h4 className="font-medium">{selectedChat.chatName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {onlineUsers.includes(selectedChat.userId)
                            ? "Online"
                            : ""}
                    </p>
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                {selectedChat.userId === "" && (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <PlusIcon className="h-5 w-5" />
                                <span className="sr-only">New Group</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Manage Group Members</DialogTitle>
                            </DialogHeader>
                            <div className="pt-2">
                                <MultiSelect
                                    options={userListUpdated}
                                    onValueChange={(value) =>
                                        setGroupUsers(value)
                                    }
                                    defaultValue={groupUsers}
                                    placeholder="Select users"
                                    variant="inverted"
                                    animation={0}
                                    maxCount={3}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={onSave}
                                    disabled={arraysEqual(
                                        groupOriginalUsers,
                                        groupUsers,
                                    )}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
                {/* <Button size="icon" variant="ghost">
                        <SettingsIcon className="h-5 w-5" />
                        <span className="sr-only">Group Settings</span>
                    </Button> */}
            </div>
        </div>
    );
}
