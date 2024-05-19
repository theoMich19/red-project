import { User } from "~/ts/user";
import NavBar from "./navigation/navbar";


export default function LayoutPage({ children, user = null }: { children?: any, user?: User | null }) {
    return (
        <div className="h-[100vh] w-[100vw] ">
            <div className="w-full h-full  bg-[url('app/assets/images/bg/fond1.png')] bg-cover bg-center">
                <div className="absolute top-0 w-full h-[40px] z-10">
                    <NavBar user={user} />
                </div>
                {children}
            </div>
        </div>
    )
}