import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    password: '234',
    host: 'localhost',
    port: 5432,
    database: 'link_tree',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60
})

export default pool;