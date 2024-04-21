import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function ChatPage() {
  return (
    <div className="grid h-screen w-full grid-cols-[300px_1fr] overflow-hidden">
      <div className="flex flex-col border-r bg-gray-100/40 dark:border-gray-800 dark:bg-gray-800/40">
        <div className="flex h-[60px] items-center border-b px-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <div className="ml-auto flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">New Group</span>
            </Button>
            <Button size="icon" variant="ghost">
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full rounded-md bg-white px-8 py-2 shadow-sm dark:bg-gray-950"
                placeholder="Search chats..."
                type="search"
              />
            </div>
          </div>
          <div className="divide-y dark:divide-gray-800">
            <Link
              className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="#"
            >
              <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="flex-1">
                <h4 className="font-medium">Jared Palmer</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{"Hey, how's it going?"}</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </Link>
            <Link
              className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="#"
            >
              <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="flex-1">
                <h4 className="font-medium">Olivia Rhye</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Did you see the new design?</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </Link>
            <Link
              className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="#"
            >
              <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="flex-1">
                <h4 className="font-medium">Miriam Williamson</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{"Let's discuss the project."}</p>
              </div>
            </Link>
            <Link
              className="flex items-center gap-3 bg-white px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="#"
            >
              <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="flex-1">
                <h4 className="font-medium">Group Chat</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Team meeting agenda</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex h-[60px] items-center border-b bg-gray-100/40 px-4 dark:border-gray-800 dark:bg-gray-800/40">
          <div className="flex items-center gap-4">
            <Image
              alt="Avatar"
              className="h-10 w-10 rounded-full"
              height={40}
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            <div>
              <h4 className="font-medium">Jared Palmer</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
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
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                <p>{"Hey, how's it going?"}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">10:30 AM</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="rounded-lg bg-blue-500 p-3 text-sm text-white">
                <p>Pretty good, just working on a new design.</p>
                <p className="mt-1 text-xs text-gray-200">10:31 AM</p>
              </div>
              <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
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
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                <p>Sounds good, let me know if you need any help!</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">10:32 AM</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Image
                alt="Avatar"
                className="h-10 w-10 rounded-full"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
              <div className="rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800">
                <p>Hey team, just wanted to share the agenda for our meeting today:</p>
                <ul className="mt-2 list-disc pl-4">
                  <li>{"Review last quarter's performance"}</li>
                  <li>{"Discuss new product roadmap"}</li>
                  <li>{"Assign action items"}</li>
                </ul>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">11:00 AM</p>
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
    </div>
  )
}

function PlusIcon(props:{className:string}) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props:{className:string}) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SendIcon(props:{className:string}) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function SettingsIcon(props:{className:string}) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UserIcon(props:{className:string}) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}