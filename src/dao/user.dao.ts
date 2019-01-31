import { User } from '../models/user';
import { Role } from '../models/role';
import { Database } from './database';

export class UserDao {
    private static async getRoles(): Promise<Role[]> {
        const client = await Database.Connect();
        try {
            let res = await client.query('select * from "role"');
            let rows = res.rows;
            return rows.map(e => {
                return new Role(e.roleid, e.role);
            });
        }
        catch {
            return undefined;
        }
        finally {
            client.release();
        }
    }

    private static async getRoleById(id: number): Promise<Role> {
        const client = await Database.Connect();
        try {
            let res = await client.query('select * from "role" where roleid = $1', [ id ]);
            let row = res.rows[0];
            return new Role(row.roleid, row.role);
        }
        catch {
            return undefined;
        }
        finally {
            client.release();
        }
    }

    public static async getAll(): Promise<User[]> {
        const client = await Database.Connect();
        try {
            let res = await client.query('select * from "user"');
            let roles = await this.getRoles();

            return res.rows.map(e => {
                let role = roles[e.role-1];
                return new User(e.userid, e.username, e.email, e.password, e.firstname, e.lastname, role);
            });
        }
        catch {
            return undefined;
        }
        finally {
            client.release();
        }
    }

    public static async getById(id: number): Promise<User> {
        const client = await Database.Connect();
        try {
            let res = await client.query('select * from "user" where userid = $1', [ id ]);
            let row = res.rows[0];
            return new User(
                row.userid,
                row.username,
                row.email,
                row.password,
                row.firstname,
                row.lastname,
                await this.getRoleById(row.role)
            );
        }
        catch {
            return undefined;
        }
        finally {
            client.release();
        }
    }

    // duplicate key value violates unique constraint "user_username_key"

    public static async update(req): Promise<User> {
        const client = await Database.Connect();
        try {
            let { userid, username, email, password, firstname, lastname, role } = req.body;
            await client.query(
                'update "user" set username = $1, "password" = $2, firstname = $3, lastname = $4, email = $5, "role" = $6 where userid = $7;',
                [ username, password, firstname, lastname, email, role, userid ]
            );
            return await this.getById(userid);
        }
        catch {
            return undefined;
        }
        finally {
            client.release();
        }
    }
}