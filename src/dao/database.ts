import { Pool } from 'pg';
import { QueryResult } from 'pg';

export class Database {
    private static cred = {
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PW,
        max: 5,
        port: 5432
    };
    private static pool: Pool;

    public static GetPool(): Pool {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool;
    }

    public static async Query(query_string: string): Promise<QueryResult> {
        const client = await this.GetPool().connect();
        let results = await client.query(query_string);
        client.release();
        return results;
    }
}