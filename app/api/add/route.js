import pool from "@/lib/db";

export const POST = async (req) => {
    const body = await req.json()
    let success = 0
    try {
        
        const { rows } = await pool.query(`select uid from users where name = 'shivani'`)
        const res = await pool.query(`insert into handle(handle_name, uid, description, pfp_url) values($1, $2, $3, $4) RETURNING hno`, [body.handle, rows[0].uid, body.desc, body.pic])


        for (let i = 0; i < body.links.length; i++) {
            await pool.query(`insert into link(link, link_text, hno) values($1, $2, $3)`, [ body.links[i].link, body.links[i].linkText, res.rows[0].hno])
        }

        success = 1
    } catch (error) {
        console.log("already exists");
    }
    return Response.json(body)
}