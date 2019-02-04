import { User } from '../models/user';
import { RoleDao } from './role.dao';
import { Database } from './database';
import { Role } from '../models/role';

export class UserDao {
    private static fromLiteral(obj) {
        let role = new Role(obj.roleid, obj.role);
        return new User(obj.id, obj.username, obj.email, obj.password, obj.firstname, obj.lastname, role);
    }

    public static async getAll(): Promise<User[]> {
        let res = await Database.Query(
            'select u.userid as "id", u.username, u."password", u.firstname, u.lastname, u.email, u."role" as "roleid", r."role"'+
            'from "user" as u inner join "role" as r on u."role" = r.roleid;'
        );
        if(!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    public static async getById(id: number): Promise<User> {
        let res = await Database.Query(
            'select u.userid as "id", u.username, u."password", u.firstname, u.lastname, u.email, u."role" as "roleid", r."role"' +
            'from "user" as u inner join "role" as r on u."role" = r.roleid where u.userid = $1;',
            [id]
        );
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    public static async update(req): Promise<User> {
        let { userid, username, email, password, firstname, lastname, role } = req.body;
        console.log(req.body);
        let res = await Database.Query(
            'update "user" set username = $1, "password" = $2, firstname = $3, lastname = $4, email = $5, "role" = $6 where userid = $7 returning *;',
            [username, password, firstname, lastname, email, role, userid]);

        console.log(res.rows[0]);
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    public static async getByLogin(req): Promise<User> {
        let { username, password } = req.body;
        let res = await Database.Query('select * from "user" where username = $1 and password = $2', [ username, password ]);
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    public static async create(req) {
        let e = req.body;
        let res = await Database.Query(
            'insert into "user" (username, "password", firstname, lastname, email, "role") ' +
            'values ($1, $2, $3, $4, $5, $6) returning *;',
            [e.username, e.password, e.firstname, e.lastname, e.email, e.role]);

        console.log(res);
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }
}