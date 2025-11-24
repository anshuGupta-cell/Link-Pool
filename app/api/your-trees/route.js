import pool from "@/lib/db"


export const GET = async (req) => {

    const { searchParams } = new URL(req.url)
    console.log("searchParams: ", searchParams);
    
    const handle = searchParams.get("handle")
    // const body = await req.json()
    // const {handle} = body;
    console.log(handle);
    

    try {

        const result = await pool.query('SELECT * FROM handle where handle_name = $1', [handle])

        const res = await pool.query("SELECT h.handle_name, h.pfp_url, h.description , json_agg(json_build_object('link', l.link, 'link_text', l.link_text)) as links from handle h left join link l on h.hno = l.hno WHERE h.handle_name = $1 GROUP BY h.handle_name, h.pfp_url, h.description", ['shivani'])

        const resultLink = await pool.query('SELECT * FROM link where hno = $1', [result.rows[0].hno])
        console.log("result", resultLink.rows);
        return Response.json({ success: true, res })

    } catch (error) {
        return Response.json({ success: false })
    }
}
