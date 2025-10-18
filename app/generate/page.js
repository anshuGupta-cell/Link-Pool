"use client"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Generate = () => {
    const searchParams = useSearchParams()
    const [links, setLinks] = useState([{ link: "", linkText: "" }])
    const [handle, setHandle] = useState(searchParams.get("handle"))
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")


    const handleChange = (i, link, linkText) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, j) => {
                if (j == i) {
                    return { link, linkText }
                } else {
                    return item
                }
            })
        })

    }
   

    const addLink = () => {
        setLinks(links.concat({ link: "", linkText: "" }))
    }
    const removeLink = (i) => {
        console.log("remove", links[i]);
        setLinks(links.filter((_, j) => j !== i))

    }

    const submitLinks = async (e) => {
        e.preventDefault()
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            links,
            handle,
            pic,
            desc
        });
        console.log("body --> ", bodyContent);


        let response = await fetch("/api/add", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        toast(data.message)

        setHandle("")
        setLinks([{ link: "", text: "" }])
        setPic("")
        setDesc("")
    }

    return (
        <div className="bg-slate-300 py-32">

            <div className="m-auto max-w-[700px] rounded py-6 text-gray-200 grid gap-4 ">

                <form onSubmit={(e) => submitLinks(e)} className="w-[90%] bg-slate-50 text-slate-700 p-4 mx-auto grid gap-4 focus-within:outline outline-offset-[-.3rem] outline-2 outline-gray-800 rounded-lg ">
                    <div className="font-semibold text-3xl ">
                        <h1 >Create your link in bio</h1>
                    </div>
                    <div className="grid gap-2">
                        <h1 className="font- text-lg" >Step 1. Create your handle</h1>
                        <div>
                            <input name="handle" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={handle || ""} onChange={(e) => setHandle(e.target.value)} placeholder="Enter your handle" required />
                        </div>
                        <p>Handle shold be 8s</p>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="font- text-lg">Step 2. Add link and link text</h3>
                        {links && links.map((item, i) => (
                            <div className="flex justify-around opacity-95 p-2 rounded-lg border relative" key={i} >
                                <div className="w-[92%] grid res-grid-200 gap-2 " >
                                    <input name="link" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="link" value={item.link || ""} onChange={(e) => handleChange(i, e.target.value, item.linkText)} placeholder="Enter link" required />
                                    <input name="linkText" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={item.linkText || ""} onChange={(e) => handleChange(i, item.link, e.target.value)} placeholder="Enter link text" required />

                                </div>
                                <div>

                                    <button type="button" className="py-1" onClick={() => removeLink(i)}>
                                        <div className="btn transform-bg hover:bg-slate-200 p-1 rounded-full">
                                            <img className=" object-cover rounded-full w-[0.8rem] h-[0.8rem]" src="/svg/xmark-regular.svg " />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" className="rounded-lg shadow hover:scale-95 py-1 px-2 bg-slate-800 text-sm text-white w-fit" onClick={addLink} >Add Link</button>
                    </div>
                    <div className="grid gap-2 ">
                        <h3 className="font- text-lg">
                            Step 3. Add profile picture link & description about links
                        </h3>
                        <div className="">
                            <input name="pic" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={pic || ""} onChange={(e) => { setPic(e.target.value) }} placeholder="Enter link to your image" required />
                        </div>
                        <div className="">
                            <input name="dis" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={desc || ""} onChange={(e) => { setDesc(e.target.value) }} placeholder="Enter description" required />
                        </div>

                        <button type="submit" className="rounded-lg shadow hover:scale-95 py-1 px-2 bg-slate-800 text-sm text-white w-fit">Create your bitlink</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Generate