import pool from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server";

// Get all handles of user
export const GET = async () => {

    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()
    if (!user) {
        return Response.json({
            message: "user not fetched"
        })
    }

    try {

        const res = await pool.query("SELECT h.hno, h.handle_name, h.pfp_url, h.description, h.type, json_agg(json_build_object('lno', l.lno, 'hno', l.hno, 'link', l.link, 'link_text', l.link_text)) as links from handle h left join link l on h.hno = l.hno WHERE uid = $1 GROUP BY h.hno, h.handle_name, h.pfp_url, h.description, h.type", [user.id])
        console.log(res);

        return Response.json({
            success: true,
            message: "All handles fetched successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch handles. Some error occured!",
            details: error
        })
    }
}


// Delete a handle and all links of that handle
export const DELETE = async (req) => {

    const { hno } = await req.json()
    const client = await pool.connect()

    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()


    try {

        await client.query('BEGIN')
        await client.query('DELETE FROM link WHERE hno = $1', [hno])
        const res = await client.query('DELETE FROM handle WHERE hno = $1 and uid = $2', [hno, user.id])
        await client.query('COMMIT')

        await client.release()
        return Response.json({
            success: true,
            message: "Handle deleted successfully!",
        })

    } catch (error) {
        await client.query('ROLLBACK')
        await client.release()
        return Response.json({
            success: false,
            message: "Failed to delete handle. Some error occured!",
            details: error
        })
    }

}


//update handle
export const PATCH = async (req) => {

    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()

    const { hno, newHandle, newPfp_url, newDesc, newType } = await req.json()
    try {

        await pool.query('UPDATE handle SET handle_name = $1, pfp_url = $2, description = $3, type = $4 WHERE hno = $5 and uid = $6', [newHandle, newPfp_url, newDesc, newType, hno, user.id])
        return Response.json({
            success: true,
            message: "Handle updated successfully!"
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to update handle. Some error occured!",
            details: error
        })
    }

}