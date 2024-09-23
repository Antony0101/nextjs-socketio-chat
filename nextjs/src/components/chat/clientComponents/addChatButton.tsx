"use client";

import * as React from "react";
import { Button } from "../../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import AddUserIcon from "../../icons/addUserIcon";
import {
    useCreatePrivateChat,
    useGetUserList,
} from "../../../utils/hooks/queries";
import { User } from "lucide-react";

type Props = {
    userId: string;
};

export default function AddChatButton({ userId }: Props) {
    const [open, setOpen] = React.useState(false);
    const { data, isLoading } = useGetUserList();
    const { mutate } = useCreatePrivateChat();
    const handleCreateChat = (otherUserId: string) => {
        mutate({ userIds: [userId.toString(), otherUserId] });
    };
    const frameworks =
        data && data.success
            ? data.data.map((d) => {
                  return {
                      value: d._id,
                      label: d.username,
                  };
              })
            : [];
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                    <User className="h-5 w-5" />
                    <span className="sr-only">New Group</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search users..." />
                    <CommandList>
                        <CommandEmpty>
                            {isLoading ? "Loading..." : "no user found."}
                        </CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        // setValue(
                                        //     currentValue === value
                                        //         ? ""
                                        //         : currentValue,
                                        // );
                                        handleCreateChat(framework.value);
                                        setOpen(false);
                                    }}
                                >
                                    {/* <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    /> */}
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
