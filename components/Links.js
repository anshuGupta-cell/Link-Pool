import { useEffect, useState } from "react"
import { toast } from "react-toastify"


const Links = (props) => {
    const { hno } = props
    const [links, setLinks] = useState([])
    const [modalState, setModalState] = useState(false)
    const [addModalState, setAddModalState] = useState(false)
    const [newLink, setNewLink] = useState("")
    const [lno, setLno] = useState("")
    const [newLinkText, setNewLinkText] = useState("")
    const handle_name = 'anshu'

    const fetchLinks = async () => {
        const res = await fetch(`/api/link?hno=${hno}`)
        const data = await res.json()
        setLinks(data)
    }

    const addLink = async (e) => {
        e.preventDefault()

        const result = await fetch('/api/link', {
            method: "POST",
            'Content-Type': 'application/json',
            body: JSON.stringify({ hno, newLinkText, newLink })
        })

        setAddModalState(false)
        setNewLinkText("")
        setNewLink("")

        fetchLinks()
    }
    
    const cancelUpdate = (e) => {
        if (e.target.id === 'updateModal') {
            setModalState(false)
            setNewLinkText("")
            setNewLink("")
            setLno("")
        }
    }
    const initiateUpdate = (i, lno) => {
        setNewLinkText(links[i].link_text)
        setNewLink(links[i].link)
        setLno(lno)
        setModalState(true)
    }

    const updateLink = async (e) => {
        e.preventDefault()

        const result = await fetch('/api/link', {
            method: "PATCH",
            'Content-Type': 'application/json',
            body: JSON.stringify({ hno, lno, newLinkText, newLink })
        })
        const data = await result.json()

        setModalState(false)
        setNewLinkText("")
        setNewLink("")
        setLno("")

        fetchLinks()
    }

    const deleteLink = async (lno) => {
        const result = await fetch('/api/link', {
            method: "DELETE",
            'content-type': 'application/json',
            body: JSON.stringify({ hno, lno })
        })
        const data = await result.json()
        toast(data.success)
        fetchLinks()
    }

    useEffect(() => {
        fetchLinks()
        console.log(handle_name, "handle_name");

    }, [])

    return (
        <div className="grid gap-1">

            {links.map((link, i) => (
                <ul key={link.lno} className="flex justify-between gap-2 border border-purple-600 rounded-lg p-2">
                    <li>
                        <p>{link.link_text}</p>
                        <p className="text-sm">{link.link}</p>
                    </li>
                    <li className="grid gap-2">
                        <img onClick={() => { initiateUpdate(i, link.lno) }} className="w-5" src="/svg/pencil-edit-02-stroke-rounded.svg" alt="edit link" />
                        <img onClick={() => { deleteLink(link.lno) }} className="w-5" src="/svg/delete-02-stroke-rounded.svg" alt="delete link" />
                    </li>
                </ul>
            ))}

            <button onClick={() => setAddModalState(true)} className="mx-auto bg-green-500 p-2 rounded-lg border border-green-500">Add link</button>


            {/* modal  */}

            {modalState && <div id="updateModal" onClick={(e) => { cancelUpdate(e) }} className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 grid">

                <div className="max-w-4xl m-auto rounded-lg bg-slate-50 p-3 grid gap-2">
                    <form onSubmit={(e) => updateLink(e)} className="grid gap-2 w-72 max-w-3xl">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold ">Update Link</h2>
                            <img id="updateModal" onClick={(e) => { cancelUpdate(e) }} className="w-5" src="/svg/xmark-regular.svg" alt="close" />
                        </div>
                        <input className="rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newLinkText} placeholder="Link title" onChange={(e) => setNewLinkText(e.target.value)} />
                        <input className="rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="Link url" />
                        <button type="submit" className="m-auto rounded-lg shadow hover:scale-95 py-1 px-2 bg-slate-800 text-sm text-white w-fit" >Save changes</button>
                    </form>
                </div>
            </div>}
            {addModalState && <div id="addModal" onClick={(e) => { e.target.id === 'addModal' && setAddModalState(false) }} className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 grid">

                <div className="max-w-4xl m-auto rounded-lg bg-slate-50 p-3 grid gap-2">
                    <form onSubmit={(e) => addLink(e)} className="grid gap-2 w-72 max-w-3xl">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold ">Add a New Link</h2>
                            <img onClick={() => { setAddModalState(false) }} className="w-5" src="/svg/xmark-regular.svg" alt="close" />
                        </div>
                        <input className="rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newLinkText} placeholder="Link title" onChange={(e) => setNewLinkText(e.target.value)} />
                        <input className="rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="Link url" />
                        <button type="submit" className="m-auto rounded-lg shadow hover:scale-95 py-1 px-2 bg-slate-800 text-sm text-white w-fit">Add Link</button>
                    </form>
                </div>

            </div>
            }

        </div >
    )
}

export default Links;