import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface LogOutBtnProps { name: string }

export function LogOutBtn({ name }: LogOutBtnProps) {
    return <DropdownMenu>
        <DropdownMenuTrigger>Bienvenido, <span className="font-bold">{name}</span></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem
                onClick={() => {
                    signOut();
                }}
            >
                <LogOut className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-red-500 font-semibold">Salir</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}