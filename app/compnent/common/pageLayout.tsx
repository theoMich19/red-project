import NavBar from "./navigation/navbar";

export default function LayoutPage({ children }: any) {
    return (
        <div className="h-[100vh] w-[100vw] ">
            <div className="absolute top-0 w-full h-[40px] z-40">
                <NavBar />
            </div>
            {children}
        </div>
    )
}