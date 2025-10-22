import pool from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
    const body = await req.json()
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()
    console.log(user);
    if (!user) {
        return Response.json({
            message: "user not fetched"
        })
    }

    try {
        const res = await pool.query(`insert into handle(handle_name, uid, description, pfp_url) values($1, $2, $3, $4) RETURNING hno`, [body.handle, user.id, body.desc, body.pic])

        for (let i = 0; i < body.links.length; i++) {
            await pool.query(`insert into link(link, link_text, hno) values($1, $2, $3)`, [body.links[i].link, body.links[i].linkText, res.rows[0].hno])
        }
        return Response.json({
            success: true,
            message: "Handle created successfully!"
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to createe handle. Some error ocurred!",
            details: error

        })

    }

}


export const GET = async () => {
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()
    console.log(user);
    if (!user) {
        return Response.json({
            message: "user not fetched"
        })
    }
    console.log("hmm");
    console.log(user.id);
    
    return Response.json({
        message: "user fetched",
        id: user.id
    })

}