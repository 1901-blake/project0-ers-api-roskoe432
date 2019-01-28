import { Pool } from 'pg';
import { ClientRequest } from 'http';
import { Result } from 'range-parser';

/* 
    export POST_DB="postgres"
    export POST_HOST="ers-revature-snow.c6tetou30arg.us-east-2.rds.amazonaws.com"
    export POST_PW="BOOger47!"
    export POST_USER="bsnow32"
*/

// Need to put credentials in environment variables.
export class SessionFactory {
    private static cred = {
        database: 'postgres',
        host: 'ers-revature-snow.c6tetou30arg.us-east-2.rds.amazonaws.com',
        user: 'bsnow32',
        password: 'BOOger47!',
        max: 10,
        port: 5432
    };
    private static pool: Pool;
    private static client: Object;

    public static GetPool(): Pool {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool;
    }
}