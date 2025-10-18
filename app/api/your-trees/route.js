import pool from "@/lib/db"


export const GET = async (req) => {

    const { searchParams } = new URL(req.url)
    const handle = searchParams.get("handle")

    try {

        const result = await pool.query('SELECT * FROM handle where handle_name = $1', [handle])
        const resultLink = await pool.query('SELECT * FROM link where hno = $1', [result.rows[0].hno])
        console.log("result", resultLink.rows);
        return Response.json({success: true, result, resultLink})

    } catch (error) {
        return Response.json({ success: false })
    }
}
