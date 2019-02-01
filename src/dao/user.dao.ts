import { User } from '../models/user';
import { RoleDao } from './role.dao';
import { Database } from './database';

export class UserDao {
    public static async getAll(): Promise<User[]> {
        let res = await Database.Query('select * from "user"');
        if(!res) return undefined;

        let roles = await RoleDao.getAll();

        return res.rows.map(e => {
            let role = roles[e.role - 1];
            return new User(e.userid, e.username, e.email, e.password, e.firstname, e.lastname, role);
        });
    }

    public static async getById(id: number): Promise<User> {
        let res = await Database.Query('select * from "user" where userid = $1', [ id ]);
        if(!res) return undefined;

        let row = res.rows[0];
        return new User(
            row.userid,
            row.username,
            row.email,
            row.password,
            row.firstname,
            row.lastname,
            await RoleDao.getById(row.role)
        );
    }

    public static async update(req): Promise<User> {
        let { userid, username, email, password, firstname, lastname, role } = req.body;

        await Database.Query(
            'update "user" set username = $1, "password" = $2, firstname = $3, lastname = $4, email = $5, "role" = $6 where userid = $7;',
            [username, password, firstname, lastname, email, role, userid]);

        return await this.getById(userid);
    }

    public static async getByLogin(req): Promise<User> {
        let { username, password } = req.body;
        let res = await Database.Query('select * from "user" where username = $1 and password = $2', [ username, password ]);
        if(!res) return undefined;

        let row = res.rows[0];
        return new User(
            row.userid,
            row.username,
            row.email,
            row.password,
            row.firstname,
            row.lastname,
            await RoleDao.getById(row.role)
        );
    }
}