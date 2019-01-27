import { Pool } from 'pg';

/* 
    export POST_DB="postgres"
    export POST_HOST="ers-revature-snow.c6tetou30arg.us-east-2.rds.amazonaws.com"
    export POST_PW="BOOger47!"
    export POST_USER="bsnow32"
*/

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

    public static Connect(): Pool {
        if(!this.pool) {
            this.pool = new Pool(this.cred);
        }
        return this.pool;
    }
}