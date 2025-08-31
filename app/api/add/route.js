import clientPromise from "@/lib/mongodb"

export const POST = async (req) => {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db("bittree")
    const collection = db.collection("links")
    const result = await collection.insertOne({body})

    return Response.json({
        message: "added",
        body,
        result
    })
}