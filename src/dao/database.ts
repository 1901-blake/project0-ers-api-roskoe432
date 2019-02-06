import { Pool, PoolClient } from 'pg';
import { QueryResult } from 'pg';
import pg from 'pg';

export interface IQueryable {
    isResult: boolean;
    query: string;
    params?: any[]
}

/**
 * Utility class used to open up connection
 * to database through the connection pool and
 * query the data in the database.
 */
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

    /**
     * Connects to the database.
     * @returns Promise<Client> 
     */
    private static async Connect(): Promise<PoolClient> {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool.connect();
    }

    /**
     * Use to perform queries, but closes
     * the connection immediately after success
     * or fail.
     * @param text query string
     * @param params values to be passed into query string
     */
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

    /**
     * User to perform transactions. Very similar
     * to `Query` function but allows multiple
     * queries to be ran in succession. If query
     * fails a final query is used to rollback and
     * discard all changes.
     * @param queries Objects used to define the queries to be ran.
     * @returns a promised query result
     */
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