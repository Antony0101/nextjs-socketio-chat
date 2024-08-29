"use client";

import UserIcon from "@/components/icons/userIcon";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { EditProfileDialog } from "./editProfile";
import { DialogTrigger } from "@/components/ui/dialog";

export default function UserMenu() {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <UserIcon className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DialogTrigger asChild>
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditProfileDialog />
        </Dialog>
    );
}
