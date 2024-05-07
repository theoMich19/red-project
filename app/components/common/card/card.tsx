
export default function Card({ children }: { children: any }) {
    return (
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0" >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {children}
            </div>
        </div >
    )
}