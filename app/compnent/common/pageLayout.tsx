import NavBar from "./navigation/navbar";

export default function LayoutPage({ children }: any) {
    return (
        <>
            <div className="absolute top-0 w-full">
                <NavBar />
            </div>
            {children}
        </>
    )
}