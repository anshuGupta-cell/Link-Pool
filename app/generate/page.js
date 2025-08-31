"use client"
import React, { useState } from "react"
import { toast } from "react-toastify"

const Generate = () => {

    const [links, setLinks] = useState([{link: "", linkText: ""}])
    const [handle, setHandle] = useState("")
    const [pic, setPic] = useState("")

    const handleChange = (i, link, linkText) => {
        console.log(i, link, linkText);
        
        setLinks((initialLinks) => {
            return initialLinks.map((item, j) => {
                if (j == i) {
                    return {link, linkText}                
                } else {
                    return item
                }
            })
        })
        
    }

    const addLink = () => {
        setLinks(links.concat({ link: "", linkText: ""}))
    }

    const submitLinks = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
           links,
           handle,
           pic
        });
        console.log("body --> ", bodyContent);
        

        let response = await fetch("http://localhost:3000/api/add", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        // toast(data.message)

        setHandle("")
        // setLinks([{link: "", text: ""}])
        setPic("")
    }

    return (
        <div className="py-28 px-2 text-sm text-black grid gap-2">
            <input className="" type="text" value={handle || ""} onChange={(e) => setHandle(e.target.value)} placeholder="Choose your handle" />
            {links && links.map((item, i) => (
                <div className="flex gap-2" key = {i}>
                    <input className="" type="text" value={item.linkText || ""} onChange={(e) => handleChange(i, item.link, e.target.value)} placeholder="Enter link text" />
                    <input className="" type="text"  value={item.link || ""} onChange={(e) => handleChange(i, e.target.value, item.linkText)} placeholder="Enter link" />
                    
                </div>
            ))}
                    {/* <input className="" type="text" value={links || ""} onChange={(e) => setLinks(e.target.value)} placeholder="Enter link" /> */}

            <button className="bg-slate-50 w-40" onClick={addLink} >Add Link</button>
            
            <input className="mt-4" type="text" value={pic|| ""} onChange={(e)=>{setPic(e.target.value)}} placeholder="Enter link to your image" />
            <button className="bg-slate-50 w-40" onClick={submitLinks}>Create your bitlink</button>

        </div>
    )
}

export default Generate