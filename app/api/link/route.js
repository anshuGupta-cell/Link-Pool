import pool from "@/lib/db"

// get all links 
export const GET = async (req) => {
    const { searchParams } = new URL(req.url)

    const hno = searchParams.get("hno")
    const { rows } = await pool.query('SELECT * FROM link where hno = $1', [hno])
    console.log(rows);

    return Response.json(rows)
}

// delete a link 
export const DELETE = async (req) => {

    const { hno, lno } = await req.json()
    let success = false
    try {
        await pool.query('DELETE FROM link WHERE lno = $1 and hno = $2', [lno, hno])
        success = true
    } catch (error) {
        success = false
    }

    return Response.json({ success })
}


// update a link 
export const PATCH = async (req) => {

    const { hno, lno, newLinkText, newLink } = await req.json()
    const res = await pool.query('UPDATE link SET link_text = $1, link = $2 WHERE hno = $3 and lno = $4', [newLinkText, newLink, hno, lno])

    return Response.json({ hno, lno, newLinkText, newLink , res})
}


// add a new link
export const POST = async (req) => {

    const { hno, newLinkText, newLink } = await req.json()
    await pool.query('insert into link(hno, link_text, link) values($1, $2, $3)', [hno, newLinkText, newLink])

    return Response.json({ success: true })
}

