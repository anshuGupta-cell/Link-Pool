import { notFound } from "next/navigation"
import React from "react"

export async function generateMetadata({ params }) {
    const { handle } = await params
    const res = await fetch(`${process.env.BASEURL}/your-trees?handle=${handle}`, { caches: "no-store" })
    const data = await res.json()
    if (!data?.res?.rows?.[0].handle_name) {
        notFound()
    }

    return {
        title: data.res.rows[0].handle_name + " | Link Pool" || "404-Profile not found | Link Pool",
        description: "desc",
    }
}

const Layout = ({ children }) => {

    return (
        <>{children}</>
    )
}

export default Layout;