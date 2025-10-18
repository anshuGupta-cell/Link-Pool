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

    const fetchHandle = async () => {
        const res = await fetch("/api/handle")
        const data = (await res.json())
        setHandles(data.rows)
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
        console.log("data", data);
        fetchHandle()

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
        console.log(hno, newHandle, newPfp_url, newDesc);

        const uid = '646ccc06-f74f-44ce-a40e-8be410b7be26'
        const res = await fetch("/api/handle", {
            method: "PATCH",
            "Content-Type": "application/json",
            body: JSON.stringify({
                hno, newHandle, newPfp_url, newDesc, uid
            })
        })
        // const data = await res.json()
        // console.log("data", data);

        sethno("")
        setNewHandle("")
        setNewPfp_Url("")
        setNewDesc("")
        setModalState(!modalState)
        fetchHandle()

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

                <div key={handle.handle_name} className="grid  gap-2 border p-2">
                    <div className="flex gap-2 items-center">
                        <ul>
                            <img className="bg-blue-300 w-16 aspect-square object-cover rounded-full" width={100} height={100} src={handle.pfp_url} alt="profile picture" />
                        </ul>
                        <ul className="w-full ">
                            <li className="flex justify-between items-center">
                                <h3 className="font-bold">{handle.handle_name}</h3>
                                <button onClick={()=>handleCopy(handle.handle_name)} className="flex items-center justify-center gap-2 rounded-full bg-indigo-200 py-2 px-3 border border-purple-800 cursor-pointer">
                                    Copy Path
                                    <img className="w-6 h-6" src="/svg/copy-link-stroke-rounded.svg " alt="copy link" />
                                </button>
                            </li>
                            <p>{handle.description}</p>
                        </ul>

                        <ul className="grid gap-2">
                            <img onClick={() => { initiateUpdate(i) }} className="w-6 h-6" src="/svg/pencil-edit-02-stroke-rounded.svg" alt="edit handle" />
                            <img onClick={() => { deleteHandle(handle.hno) }} className="w-6" src="/svg/delete-02-stroke-rounded.svg" alt="delete handle" />
                        </ul>
                    </div>
                    <Links hno={handle.hno} />

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