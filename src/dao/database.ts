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

    public static async Connect(): Promise<PoolClient> {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool.connect();
    }

    private static async Query(text: string, params?: any[]): Promise<QueryResult> {
        const client = await this.Connect();
        console.log(client);
        try { 
            let result = await client.query(text, params); 
            // if(!result || result.rowCount === 0) {
            //     console.log(result);
            //     throw new Error();
            // }
            return result;
        }
        catch { 
            console.log('Error Happen');
            return undefined; 
        }
        finally { 
            client.release(); 
        }
    }
}