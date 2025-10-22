import Image from "next/image"
import Links from "./Links"
import { useEffect, useState } from "react"
import Modal from "./Modal"
import { toast } from "react-toastify"

const Handle = () => {

    const [modalState, setModalState] = useState(false)
    const [handles, setHandles] = useState([])
    const [hno, sethno] = useState()
    const [newHandle, setNewHandle] = useState()
    const [newPfp_url, setNewPfp_Url] = useState()
    const [newDesc, setNewDesc] = useState()
    const [showOptions, setShowOptions] = useState(false)

  

    const fetchHandle = async () => {
        const result = await fetch("/api/handle", { cache: "no-store" })
        const data = (await result.json())
        setHandles(data.res.rows)
    }

    const deleteHandle = async (hno) => {

        const res = await fetch("/api/handle", {
            method: "DELETE",
            "Content-Type": "application/json",
            body: JSON.stringify({
                hno
            })
        })
        const data = (await res.json())

        if (data.success) {
            fetchHandle()
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }

    }

    const initiateUpdate = (i) => {
        sethno(handles[i].hno)
        setNewHandle(handles[i].handle_name)
        setNewPfp_Url(handles[i].pfp_url)
        setNewDesc(handles[i].description)
        setModalState(!modalState)
    }

    const updateHandle = async (e) => {
        e.preventDefault()

        const res = await fetch("/api/handle", {
            method: "PATCH",
            "Content-Type": "application/json",
            body: JSON.stringify({
                hno, newHandle, newPfp_url, newDesc
            })
        })
        const data = await res.json()
        if (data.success) {
            fetchHandle()
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }

        sethno("")
        setNewHandle("")
        setNewPfp_Url("")
        setNewDesc("")
        setModalState(false)
    }

    const handleCopy = async (handle) => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${handle}`)
            toast.success("Copied to clipboard")
        } catch (err) {
            toast.error("Failed to copy")
        }
    }


    useEffect(() => {
        fetchHandle()
    }, [])



    return (
        <>
            {handles.map((handle, i) => (

                <div key={handle.handle_name} className="">
                    <div key={handle.handle_name} className="grid md:grid-cols-2 gap-4 rounded-lg px-2 py-3 bg-gradient-to-br from:bg-indigo-100 to:bg-purple-100">

                        <div className="grid gap-2 items-center bg-white/10 p-2 rounded-lg">
                            <div className="grid gap-2 items-center">

                                <ul className="flex">
                                    <li className="w-full ">
                                        <img className="mx-auto bg-blue-300 w-28 h-28 object-cover rounded-full" width={100} height={100} src={handle.pfp_url} alt="profile picture" />
                                    </li>
                                    <details className="relative">
                                        <summary>
                                            <img className="w-7 dark:invert" src="/svg/more-vertical-stroke-rounded.svg" alt="profile picture" />
                                        </summary>
                                        <div open className="absolute rounded-lg p-2 right-2 bg-purple-300 dark:bg-slate-700 w-40 ">
                                            <ul onClick={() => handleCopy(handle.handle_name)} className="flex gap-2">
                                                <img className="w-5 dark:invert" src="/svg/copy-link-stroke-rounded.svg" alt="" />
                                                <p className="text-nowrap">Copy path</p>
                                            </ul>
                                            <ul onClick={() => { initiateUpdate(i) }} className="flex gap-2">
                                                <img className="w-5 dark:invert" src="/svg/pencil-edit-02-stroke-rounded.svg" alt="" />
                                                <p className="text-nowrap">Edit handle</p>
                                            </ul>
                                            <ul onClick={() => { deleteHandle(handle.hno) }} className="flex gap-2">
                                                <img className="w-5 dark:invert" src="/svg/delete-02-stroke-rounded.svg" alt="" />
                                                <p className="text-nowrap">Delete handle</p>
                                            </ul>
                                        </div>
                                    </details>
                                </ul>

                                <ul className="w-full ">
                                    <li className="flex justify-between items-center">
                                        <h3 className="font-bold mx-auto">{handle.handle_name}</h3>
                                        {/* <button onClick={() => handleCopy(handle.handle_name)} className="flex items-center justify-center gap-2 rounded-full bg-indigo-200 py-2 px-3 border border-purple-800 cursor-pointer">
                                    Copy Path
                                    <img className="w-6 h-6 dark:invert" src="/svg/copy-link-stroke-rounded.svg " alt="copy link" />
                                </button> */}
                                    </li>
                                    <p className="text-center">{handle.description}</p>
                                </ul>

                                {/* <ul className="grid gap-2">
                            <img onClick={() => { initiateUpdate(i) }} className="w-6 h-6 dark:invert" src="/svg/pencil-edit-02-stroke-rounded.svg" alt="edit handle" />
                            <img onClick={() => { deleteHandle(handle.hno) }} className="w-6 dark:invert" src="/svg/delete-02-stroke-rounded.svg" alt="delete handle" />
                        </ul> */}
                            </div>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg">
                            <h2 className="text-xl font-medium">Links</h2>
                            <Links hno={handle.hno} />
                        </div>

                    </div>
                </div>
            ))}
            {modalState && <Modal
                newHandle={newHandle}
                setNewHandle={setNewHandle}
                newPfp_url={newPfp_url}
                setNewPfp_Url={setNewPfp_Url}
                newDesc={newDesc}
                setNewDesc={setNewDesc}
                updateHandle={updateHandle}
                setModalState={setModalState}

            />}
        </>
    )
}

export default Handle;