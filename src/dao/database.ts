import { Pool, PoolClient, Query } from 'pg';
import { QueryResult } from 'pg';
import pg from 'pg';

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
    private static client: PoolClient;

    public static GetPool(): Pool {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool;
    }

    
    public static async Query(text: string, params: any[]): Promise<QueryResult> {
        let client: PoolClient;
        try {
            client = await this.GetPool().connect();
            return await client.query(text);
        }
        catch {
            return undefined;
        }
        finally {
            if(client) client.release();
        }
    }
}