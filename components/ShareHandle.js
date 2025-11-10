import Image from "next/image";

const ShareHandle = () => {

    return (
        <div className="p-4 rounded-xl bg-slate-800 ">
            <h2 className="p-2 text-xl font-semibold border-b border-pink-100">

                Share
            </h2>
            <div className="flex flex-wrap p-2">
                <ul className="grid w-16  m-auto">
                    <Image width={100} height={100} className="rounded-full aspect-square object-cover" src="/profile_pic.png" alt="" />
                    <p className="text-center">Whatsapp</p>
                </ul>
                {/* <ul className="grid">
                    <Image width={100} height={100} className="rounded-full aspect-square object-cover" src="/profile_pic.png" alt="" />
                    <p className="text-center">Whatsapp</p>
                </ul>
                <ul className="grid">
                    <Image width={100} height={100} className="rounded-full aspect-square object-cover" src="/profile_pic.png" alt="" />
                    <p className="text-center">Whatsapp</p>
                </ul>
                <ul className="grid">
                    <Image width={100} height={100} className="rounded-full aspect-square object-cover" src="/profile_pic.png" alt="" />
                    <p className="text-center">Whatsapp</p>
                </ul> */}
            </div>
        </div>
    )
}

export default ShareHandle;