import { useState } from "react";

const Modal = (props) => {

    const {
        newHandle,
        setNewHandle,
        newPfp_url,
        setNewPfp_Url,
        newDesc,
        setNewDesc,
        updateHandle,
        setModalState

    } = props;




    return (
        <div id="updateHandle" onClick={(e) => { e.target.id === 'updateHandle' && setModalState(false) }} className="fixed top-0 left-0 w-screen h-screen bg-black/50 overflow-hidden">
            <div id="updateHandle" onClick={(e) => { e.target.id === 'updateHandle' && setModalState(false) }} className="w-screen h-screen overflow-hidden m-auto rounded-lg p-3 grid gap-2">
                <form onSubmit={(e) => updateHandle(e)} className="md:w-[720] my-auto bg-slate-50 text-slate-700 p-4 mx-auto grid gap-4 focus-within:outline outline-offset-[-.3rem] outline-2 outline-gray-800 rounded-lg ">

                    <div className="font-semibold text-3xl flex justify-between items-center">
                        <h1>Update handle </h1>
                        <img onClick={(e) => { setModalState(false) }} className="w-5 dark:invert" src="/svg/xmark-regular.svg" alt="close" />
                    </div>

                    <div className="grid gap-2">
                        <h1 className="font- text-lg" >Enter new handle name</h1>
                        <div>
                            <input name="handle" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newHandle || ""} onChange={(e) => setNewHandle(e.target.value)} placeholder="Enter your handle" required />
                        </div>
                    </div>

                    <div className="grid gap-2 ">
                        <h3 className="font- text-lg">Enter new profile picture url</h3>
                        <div className="">
                            <input name="pic" className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newPfp_url || ""} onChange={(e) => { setNewPfp_Url(e.target.value) }} placeholder="Enter link to your image" required />
                        </div>
                        <h3>Enter new profile picture url</h3>
                        <div className="">
                            <textarea name="dis" className="w-full text-black rounded-lg focus:outline-green-500 py-1 px-3 bg-slate-100" type="text" value={newDesc || ""} onChange={(e) => { setNewDesc(e.target.value) }} placeholder="Enter description" required rows={5}/>
                        </div>

                        <button type="submit" className="mx-auto rounded-lg shadow hover:scale-95 py-1 px-2 bg-slate-800 text-sm text-white w-fit">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;