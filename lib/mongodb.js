import { MongoClient } from 'mongodb'
const url = process.env.MONGODB_URI
const options = {
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
    throw new Error("add mongo uri to .env.local")
}


if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(url)
        global._mongoClientPromise = client.connect()

    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(url)
    clientPromise = client.connect()
}

export default clientPromise