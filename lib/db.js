import pg from 'pg'

const { Pool } = pg

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: false ,
//     max: 20,
//     idleTimeoutMillis: 30000,
//     // connectionTimeoutMillis: 2000,
//     maxLifetimeSeconds: 60
// })
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "link_tree",
    password: "234",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60
})

export default pool;