import { Link } from "@remix-run/react";

export default function NavBar() {
    return (
        <nav className="bg-transparent text-white p-4 z-40">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold" style={{ fontFamily: "Island Moments" }}>Enigmatique</h1>
                <div className="flex items-center">
                    <Link to={'/game-day'}>
                        <h1 className="px-4 py-2 hover:bg-gray-700 rounded">Game-Day</h1>
                    </Link>
                    <Link to={"/information"}>
                        <h1 className="px-4 py-2 hover:bg-gray-700 rounded">Information</h1>
                    </Link>
                    {
                        true ? (
                            <Link to={"/login"}>
                                <h1 className="px-4 py-2 hover:bg-gray-700 rounded">Login</h1>
                            </Link>
                        ) : (
                            <div className="relative group">
                                <button className="px-4 py-2 hover:bg-gray-700 rounded focus:outline-none focus:shadow-outline">
                                    Profile
                                </button>
                                <div className="hidden absolute right-0  py-2 w-48 bg-white rounded-md shadow-xl z-50 group-hover:block">
                                    <Link to={"/profile"}><h1 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Mon Profile</h1></Link>
                                    <Link to={"/profile/stats"}><h1 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Mes Stats</h1></Link>
                                    <Link to={"/logout"}><h1 className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Déconnexion</h1></Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}
