"use client";

import UserIcon from "../../icons/userIcon";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { EditProfileDialog } from "./editProfile";
import { DialogTrigger } from "../../ui/dialog";
import { boolean } from "zod";
import SignOutDialog from "./signOutDialog";
import { UserCog } from "lucide-react";

export default function UserMenu() {
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openSignOut, setOpenSignOut] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                        {/* <UserIcon className="h-5 w-5" /> */}
                        <UserCog className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={() => setOpenEditProfile(true)}>
                        Edit Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => setOpenSignOut(true)}>
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditProfileDialog
                open={openEditProfile}
                setOpen={(open: boolean) => setOpenEditProfile(open)}
            />
            <SignOutDialog
                open={openSignOut}
                setOpen={(open: boolean) => setOpenSignOut(open)}
            />
        </>
    );
}
