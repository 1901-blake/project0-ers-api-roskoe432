import { User } from '../models/user';
import { RoleDao } from './role.dao';
import { Database } from './database';
import { Role } from '../models/role';

export class UserDao {
    private static fromLiteral(obj) {
        let role = new Role(obj.role, obj.rolename);
        return new User(obj.userid, obj.username, obj.email, obj.password, obj.firstname, obj.lastname, role);
    }

    public static async getAll(): Promise<User[]> {
        let res = await Database.Query(
            'select u.*, r."role" as "rolename"'+
            'from "user" as u ' + 
            'inner join "role" as r ' + 
            'on u."role" = r.roleid;'
        );
        if(!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    public static async getById(id: number): Promise<User> {
        let res = await Database.Query(
            'select u.*, r."role" as "rolename"' +
            'from "user" as u ' + 
            'inner join "role" as r ' + 
            'on u."role" = r.roleid ' + 
            'where u.userid = $1;',
            [id]
        );
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    public static async update(req): Promise<User> {
        let { userid, username, email, password, firstname, lastname, role } = req.body;
        let client = await Database.Connect();
        try {
            await client.query('begin;');
            await client.query(
                'update "user" set ' +
                'username = $1, ' +
                '"password" = $2, ' +
                'firstname = $3, ' +
                'lastname = $4, ' +
                'email = $5, ' +
                '"role" = $6 ' +
                'where userid = $7; ',
                [username, password, firstname, lastname, email, role, userid]
            );

            let res = await client.query(
                'select u.*, r."role" as "rolename" ' +
                'from "user" as u ' +
                'inner join "role" as r ' +
                'on u."role" = r.roleid ' +
                'where u.userid = $1;',
                [userid]
            );

            await client.query('commit;');
            let u = this.fromLiteral(res.rows[0]);
            console.log(u);
            return u;
        }
        catch {
            client.query('rollback;')
            return undefined;
        }
        finally {
            client.release();
        }
    }

    public static async getByLogin(req): Promise<User> {
        let { username, password } = req.body;
        let res = await Database.Query(
            'select u.*, r."role" as "rolename"' +
            'from "user" as u ' + 
            'inner join "role" as r ' + 
            'on u."role" = r.roleid ' + 
            'where u.username = $1 and u."password" = $2;', 
            [ username, password ]
        );
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    // public static async create(req) {
    //     let e = req.body;
    //     let res = await Database.Query(
    //         'insert into "user" (username, "password", firstname, lastname, email, "role") ' +
    //         'values ($1, $2, $3, $4, $5, $6) returning *;',
    //         [e.username, e.password, e.firstname, e.lastname, e.email, e.role]);

    //     if(!res) return undefined;
    //     return this.fromLiteral(res.rows[0]);
    // }
}