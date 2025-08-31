"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


const Navbar = () => {
    const pathName = usePathname()
    const [expanded, setExpanded] = useState(false)
    
    const active = "bg-slate-800 rounded-lg font-bold text-white"


    return (
        
        <div className="py-6 fixed text-sm w-[100vw] ">
            <div className="flex z-10 justify-between items-center bg-slate-200 mx-auto max-w-[80vw] rounded-full p-2 text-black">
                <div className="flex gap-5">
                    <Link className="p-2 text-base font-bold" href="/">
                        LinkTree
                    </Link>
                </div>
                    <Link className={`p-2 ${pathName == "/generate"? active: ""}`} href="/generate">Generate</Link>


                <div className="flex gap-1 text-white">
                    <Link className="p-2 bg-gray-800 rounded-lg" href="/login">Log in</Link>
                    <Link className="p-2 bg-green-800 rounded-3xl" href="/signup">Sign up</Link>
                    <button className="text-black py-2 px-3" onClick={() => {setExpanded(!expanded)}}>=</button>
                </div>
            </div>

            {expanded && <div className="bg-slate-200 z-0 h-[100vh] absolute top-0 w-[100vw] left-0 flex justify-around overflow-x-scroll scrollbar-none items-center mx-auto p-2 text-gray-300 border-gray-300 border-b" >
                <div className="flex text-nowrap items-end gap-1">
                    <Link className={`p-2  ${pathName == "/"? active: ""}`} href="/">Home</Link>
                    <Link className={`p-2 ${pathName == "/about"? active: ""}`} href="/about">About</Link>
                    <Link className={`p-2 ${pathName == "/shorten"? active: ""}`} href="/shorten">Shorten</Link>
                    <Link className={`p-2 ${pathName == "/contact-us"? active: ""}`} href="/contact-us">Contact Us</Link>
                    <Link className={`p-2 ${pathName == "/Github"? active: ""}`} href="/Github">Github</Link>
                </div>
            </div>}

        </div>
    )
}

export default Navbar;
