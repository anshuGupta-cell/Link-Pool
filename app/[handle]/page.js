import React from "react"
import Link from "next/link"
import pool from "@/lib/db"
import ShareHandle from "@/components/ShareHandle"


export default async function Page({ params }) {
    const handle = (await params).handle

    const fetch = async () => {

        // result = await pool.query("SELECT h.handle_name, h.pfp_url, h.description , json_agg(json_build_object('link', l.link, 'link_text', l.link_text)) as links from handles h left join link l on h.hno = l.hno WHERE h.handle_name = $1 GROUP BY h.handle_name, h.pfp_url, h.description", [handle])

        const res = await fetch(`/api/your-trees?handle=${handle}`)
        console.log(res);

    }

    // const result = await pool.query('SELECT * FROM handle where handle_name = $1', [handle])
    // const resultLink = await pool.query('SELECT * FROM link where hno = $1', [result.rows[0].hno])


    // if (!result) {
    //     toast.error("Did not found handle. Please use a valid handle!!!")
    //     return <div>not found</div>
    // }

    const result = {rows:[{
        pfp_url: "/profile_pic.png",
        description: "description",
        handle_name: "anshu"
    }]}
    const resultLink = {rows:[{
        lno: 1,
        link: "https://instagram.com",
        link_text: "Instagram"
    }]}


    return (
        <div className="w-[100svw] h-[100svh] overflow-hidden grid" style={{ backgroundImage: `url(${result.rows[0].pfp_url})`, backgroundSize: "contain" }}>
            {/* <img className="h-[100vh]  w-[100vw] blur-[6px] py-[1vh] " src={result.rows[0].pfp_url} alt={result.rows[0].pfp_url} /> */}

            <div className="backdrop-blur-lg p-3 text-sm">
                <div className="max-w-3xl mx-auto my-5">

                    <div className="grid place-items-center text-center gap-1">
                        <img className="w-28 h-28 object-cover rounded-full " src={result.rows[0].pfp_url} alt={result.rows[0].pfp_url} />
                        <h1 className="text-xl" >{result.rows[0].handle_name}</h1>
                        <p className="text-xs">{result.rows[0].description}</p>
                    </div>

                    <div className="max-w-3xl my-3">
                        <h3 className="py-2 text-center">Click on these links to open them in new tab</h3>
                        <div className="text-black w-full grid res-grid-280 gap-2 ">
                            {resultLink.rows && resultLink.rows.length > 0 && resultLink.rows.map((link) => (
                                <div key={link.lno} className="flex p-2 bg-slate-100 rounded-lg cursor-pointer">
                                    <Link className="w-full text-center" target="_blank" href={link.link}>{link.link_text}</Link>
                                    <img src="/svg/arrow-up-right-01-stroke-rounded.svg" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <ShareHandle />
                </div>
            </div>
        </div>
    )
}