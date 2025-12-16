import pool from "@/lib/db"
import { notFound } from "next/navigation"
import React from "react"

export async function generateMetadata({ params }) {

    //get handle name
    const { handle } =  params


    return {
        title: handle + " | Link Pool",
        description: "desc",
    }
}

const Layout = async ({ children, params }) => {
    const { handle } = params
    const res = await pool.query("SELECT handle_name from handle WHERE handle_name = $1", [handle])
    if (!res.rows?.[0]?.handle_name) {
        notFound()
    }
    return (
        <>{children}</>
    )
}

export default Layout;