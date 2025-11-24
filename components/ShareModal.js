import Image from "next/image";
import { useRef } from "react";

const ShareModal = (props) => {
    const shareRef = useRef()

    const openMenu = () => {
        shareRef.current.style.height = "auto"
        shareRef.current.style.opacity = "1"
        console.log("shareRef.current")
    }
    const closeMenu = () => {
        shareRef.current.style.height = "0"
        shareRef.current.style.opacity = "0"
        console.log("shareRef.current")

    }

    const title = "anshu"
    const text = 0
    const url = window.location.href

    let platforms = [
        {
            name: "WhatsApp",
            link: `https://wa.me/?text=${text}&20${url}`,
            logo: "/svg/.png"
        },
        {
            name: "Instagram",
            link: "https://instagram.com",
            logo: "/svg/.png"
        },
        {
            name: "Facebook",
            link: `https://www.facebook.com/sharer/sharerphp?u=${url}`,
            logo: "/svg/.png"
        },
        {
            name: "X",
            link: `https://t.me/share/url?url=${url}&text=${text}`,
            logo: "/svg/.png"
        },
        {
            name: "LinkedIn",
            link: `https://www.linkedin.com/sharing/shareoffsite/?url=${url}`,
            logo: "/svg/.png"
        },
        {
            name: "Gmail",
            link: `https://mail.google.com/main/?view=cm&body=${text}%20${url}`,
            logo: "/svg/.png"
        },
        {
            name: "Snapchat",
            link: `https://www.snapchat.com/share?url=${url}`,
            logo: "/svg/.png"
        },
        {
            name: "SMS",
            link: `https://sms:?&body=${text}%20${url}`,
            logo: "/svg/.png"
        },
        {
            name: "Copy",
            link: null,
            logo: "/svg/.png"
        },
        {
            name: "More options",
            link: null,
            logo: "/svg/.png"
        },

    ]

    const handleShare = async () => {
        const shareData = {
            title: "title",
            text: 0,
            url: window.location.href,
        }

        console.log(shareData);

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (error) {
                console.log("cancelled share");
            }
        } else {
            //fallback
            const text = encodeURIComponent(`Check this out! ${window.location.href}`)
            window.open(`https://wa.me/?text=${text}`, "_blank")
        }
    }


    return (
        <>
            <div onClick={() => { openMenu() }} className="w-full flex">
                <button className="text-white bg-purple-700 px-3 py-2 rounded-xl shadow-pink-600 shadow-md" >Share</button>
            </div>
            <div id="shareModal" onClick={(e) => e.target.id === "shareModal" && closeMenu()} ref={shareRef} className="fixed top-0 overflow-hidden h-0 bottom-0 left-0 right-0   opacity-0 bg-gray-900/50 grid place-items-end p-3">

                <div className="mx-auto w-full max-w-3xl p-4 grid rounded-xl bg-slate-200 text-black gap-2 ">
                    <h2 className="flex w-full place-content-between text-xl font-semibold">
                        <p>Share your link pool</p>
                        <button className="px-4 py-2 text-sm rounded-full border bg-slate-300/80" onClick={closeMenu}>Close</button>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {platforms.map((platform, i) => (

                            < a key={i} href={platform.link} target="_blank" className="grid w-16  " >
                                <Image width={100} height={100} className="rounded-xl aspect-square object-cover" src="/profile_pic.png" alt="profile pic" />
                                <p className="text-center">{platform.name}</p>
                            </a>
                        ))}
                        <ul onClick={handleShare} className="grid w-16  ">
                            <Image width={100} height={100} className="rounded-xl aspect-square object-cover" src="/profile_pic.png" alt="" />
                            <p className="text-center">More</p>
                        </ul>

                    </div>
                </div>

            </div >
        </>
    )
}

export default ShareModal;