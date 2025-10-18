import pool from "@/lib/db"


// Get all handles of user
export const GET = async () => {

    const uid = '646ccc06-f74f-44ce-a40e-8be410b7be26'
    const res = await pool.query('SELECT * FROM handle where uid = $1', [uid])
    return Response.json(res)
}


// Delete a handle and all links of that handle
export const DELETE = async (req) => {
    const { hno } = await req.json()
    const uid = '646ccc06-f74f-44ce-a40e-8be410b7be26'
    const client = await pool.connect()
    let success = false
    try {
        await client.query('BEGIN')
        await client.query('DELETE FROM link WHERE hno = $1', [hno])
        const res = await client.query('DELETE FROM handle WHERE hno = $1 and uid = $2', [hno, uid])
        await client.query('COMMIT')

        success = true

    } catch (error) {
        await client.query('ROLLBACK')
        success = false
    }

    await client.release()

    return Response.json({ success })
}


//update handle
export const PATCH = async (req) => {

    const { hno, newHandle, newPfp_url, newDesc, uid } = await req.json()

    await pool.query('UPDATE handle SET handle_name = $1, pfp_url = $2, description = $3 WHERE hno = $4 and uid = $5', [newHandle, newPfp_url, newDesc, hno, uid])


    return Response.json({ succuss: true, message: "update successful", hno, newHandle, newPfp_url, newDesc, uid })
}