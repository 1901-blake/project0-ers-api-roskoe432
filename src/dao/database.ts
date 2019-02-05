import { Pool, PoolClient, Query } from 'pg';
import { QueryResult } from 'pg';
import pg from 'pg';

export interface IQueryable {
    isResult: boolean;
    query: string;
    params?: any[]
}

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

    private static async Connect(): Promise<PoolClient> {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool.connect();
    }

    public static async Query(text: string, params?: any[]): Promise<QueryResult> {
        const client = await this.Connect();
        try { 
            let result = await client.query(text, params); 
            if(!result || result.rowCount === 0) {
                throw new Error();
            }
            return result;
        }
        catch { 
            return undefined; 
        }
        finally { 
            client.release(); 
        }
    }

    public static async Transaction(...queries: IQueryable[]): Promise<QueryResult> {
        const client = await this.Connect();
        try {
            let res: QueryResult;
            await client.query('begin;');
            for(let i = 0; i < queries.length; i++) {
                let q = queries[i];
                if(q.isResult) {
                    res = await client.query(q.query, q.params);
                    continue;
                }
                await client.query(q.query, q.params);
            }
            await client.query('commit;');
            return res;
        }
        catch {
            await client.query('rollback;');
            return undefined;
        }
        finally {
            client.release();
        }
    }
}