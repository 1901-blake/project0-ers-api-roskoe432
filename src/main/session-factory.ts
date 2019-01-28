import { Pool } from 'pg';

// Need to put credentials in environment variables.
export class SessionFactory {
    private static cred = {
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PW,
        max: process.env.PG_MAX,
        port: process.env.PG_PORT
    };
    private static pool: Pool;

    public static GetPool(): Pool {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool;
    }
}