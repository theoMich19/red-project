import { User } from "~/ts/user";
import NavBar from "./navigation/navbar";

export default function LayoutPage({ children, user = null }: { children?: any, user?: User | null }) {
    return (
        <div className="h-[100vh] w-[100vw] ">
            <div className="absolute top-0 w-full h-[40px] z-40">
                <NavBar user={user} />
            </div>
            {children}
        </div>
    )
}