import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Login() {
    return <Card>
        <CardHeader>
            <CardTitle>Ingreso</CardTitle>
            <CardDescription>
                Ingresa tus credenciales de profesor en los siguientes campos.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
            </div>
        </CardContent>
        <CardFooter>
            <Button>Save changes</Button>
        </CardFooter>
    </Card>
}