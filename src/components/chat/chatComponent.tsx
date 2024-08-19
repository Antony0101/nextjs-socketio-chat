import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PlusIcon from "../icons/plusIcon";
import SendIcon from "../icons/sendIcon";
import SettingsIcon from "../icons/settingsIcon";

export default async function ChatComponent() {
    return (
        <div className="flex flex-col">
            <div className="flex h-[60px] items-center border-b bg-gray-100/40 px-4 dark:border-gray-800 dark:bg-gray-800/40">
                <div className="flex items-center gap-4">
                    <Image
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                        height={40}
                        src="/avatar.png"
                        style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                        }}
                        width={40}
                    />
                    <div>
                        <h4 className="font-medium">Jared Palmer</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Online
                        </p>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                        <PlusIcon className="h-5 w-5" />
                        <span className="sr-only">New Group</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <SettingsIcon className="h-5 w-5" />
                        <span className="sr-only">Group Settings</span>
                    </Button>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
                <div className="grid gap-4">
                    <div className="flex items-end gap-2">
                        <Image
                            alt="Avatar"
                            className="h-10 w-10 rounded-full"
                            height={40}
                            src="/avatar.png"
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                            width={40}
                        />
                        <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                            <p>{"Hey, how's it going?"}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                10:30 AM
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <div className="rounded-lg bg-blue-500 p-3 text-sm text-white">
                            <p>Pretty good, just working on a new design.</p>
                            <p className="mt-1 text-xs text-gray-200">
                                10:31 AM
                            </p>
                        </div>
                        <Image
                            alt="Avatar"
                            className="h-10 w-10 rounded-full"
                            height={40}
                            src="/avatar.png"
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                            width={40}
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <Image
                            alt="Avatar"
                            className="h-10 w-10 rounded-full"
                            height={40}
                            src="/avatar.png"
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                            width={40}
                        />
                        <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                            <p>
                                Sounds good, let me know if you need any help!
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                10:32 AM
                            </p>
                        </div>
                    </div>
                    <div className="flex items-end gap-2">
                        <Image
                            alt="Avatar"
                            className="h-10 w-10 rounded-full"
                            height={40}
                            src="/avatar.png"
                            style={{
                                aspectRatio: "40/40",
                                objectFit: "cover",
                            }}
                            width={40}
                        />
                        <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                            <p>
                                Hey team, just wanted to share the agenda for
                                our meeting today:
                            </p>
                            <ul className="mt-2 list-disc pl-4">
                                <li>{"Review last quarter's performance"}</li>
                                <li>{"Discuss new product roadmap"}</li>
                                <li>{"Assign action items"}</li>
                            </ul>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                11:00 AM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-[60px] items-center border-t bg-gray-100/40 px-4 dark:border-gray-800 dark:bg-gray-800/40">
                <Input
                    className="flex-1 rounded-md bg-white px-4 py-2 shadow-sm dark:bg-gray-950"
                    placeholder="Type your message..."
                    type="text"
                />
                <Button className="ml-2">
                    <SendIcon className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
        </div>
    );
}
