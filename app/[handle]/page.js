"use client"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import ShareModal from "@/components/ShareModal"
import { notFound, usePathname } from "next/navigation"
import Image from "next/image"


export default function Page() {
    const pathname = usePathname()
    const handle = pathname.split('/')[1]
    const [result, setResult] = useState({})

    const fetchData = async () => {
        const res = await fetch(`/api/your-trees?handle=${handle}`, { caches: "no-store" })
        const data = await res.json()
        setResult(data?.res?.rows?.[0])
    }

    useEffect(() => {
        fetchData()

    }, [])
    if (!result.handle_name) {
        notFound()
    }




    return (
        <div className="w-[100svw] h-[100svh] overflow-hidden grid" style={{ backgroundImage: `url(${result.pfp_url})`, backgroundSize: "contain" }}>
            {/* <img className="h-[100vh]  w-[100vw] blur-[6px] py-[1vh] " src={result.pfp_url} alt={result.pfp_url} /> */}

            <div className="backdrop-blur-lg p-3 text-sm">
                <div className="max-w-3xl mx-auto my-5 ">
                    <div className="flex justify-between">
                        <Link className="p-2 font-bold text-white bg-purple-700 px-3 py-2 rounded-xl shadow-pink-600 shadow-md" href="/">
                            Link Pool
                        </Link>
                        <div>
                            <ShareModal />
                        </div>
                    </div>
                    <div className="grid place-items-center text-center gap-1">
                        <Image height={100} width={100} className="w-28 h-28 object-cover rounded-full" src={result.pfp_url || "/profile_pic.png"} alt={result.pfp_url || "profile pic"} />
                        <h1 className="text-xl" >{result.handle_name}</h1>
                        <p className="text-xs">{result.description}</p>
                    </div>

                    <div className="max-w-3xl my-3">
                        <h3 className="py-2 text-center">Click on these links to open them in new tab</h3>
                        <div className="text-black w-full grid res-grid-280 gap-2 ">
                            {result.links && result.links.length > 0 && result.links.map((link) => (
                                <div key={link.lno} className="flex p-2 bg-slate-100 rounded-lg cursor-pointer">
                                    <Link className="w-full text-center" target="_blank" href={link.link}>{link.link_text}</Link>
                                    <img src="/svg/arrow-up-right-01-stroke-rounded.svg" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center my-6">
                        <button className="text-white bg-purple-700 px-3 py-2 rounded-xl shadow-pink-600 shadow-md">Follow</button>
                    </div>

                </div>
            </div>
        </div>
    )
}