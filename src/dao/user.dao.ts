import { User } from '../models/user';
import { Database, IQueryable } from './database';
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
        const update: IQueryable = {
            isResult: false,
            query: 'update "user" set ' +
                'username = $1, ' +
                '"password" = $2, ' +
                'firstname = $3, ' +
                'lastname = $4, ' +
                'email = $5, ' +
                '"role" = $6 ' +
                'where userid = $7; ',
            params: [username, password, firstname, lastname, email, role, userid]
        };
        const select: IQueryable = {
            isResult: true,
            query: 'select u.*, r."role" as "rolename" ' +
                'from "user" as u ' +
                'inner join "role" as r ' +
                'on u."role" = r.roleid ' +
                'where u.userid = $1;',
            params: [userid]
        };

        let res = await Database.Transaction(update, select);
        return this.fromLiteral(res.rows[0]);
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