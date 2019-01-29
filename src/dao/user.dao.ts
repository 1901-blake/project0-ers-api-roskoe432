import { User } from '../models/user';
import { Database } from './database';
import { RoleDao } from './role.dao';

export class UserDao {
    public static async getAllUsers(): Promise<User[]> {
        let result = await Database.Query('select * from "user"');
        let roles = await RoleDao.getAllRoles();

        return result.rows.map(e => {
            let role = roles[e.role-1];
            return new User(e.userid, e.username, e.email, e.password, e.firstname, e.lastname, role);
        });
    }

    public static async getUserById(id: number): Promise<User> {
        let { rows } = await Database.Query(
            'select * from "user" where userid = $1', [id]
        );
        if(!rows[0]) return null;

        return new User(id,
            rows[0].username,
            rows[0].email,
            rows[0].password,
            rows[0].firstname,
            rows[0].lastname,
            null
        );
    }

    public static async updateUser(req, id: number): Promise<User> {
        let { username, password, firstname, lastname, role } = req.body;
        await Database.Query(
            'update "user" set username = $1, "password" = $2, firstname = $3, lastname = $4, "role" = $5 where userid = $6', 
            [ username, password, firstname, lastname, role, id ]
        );
        return await this.getUserById(id);
    }
}

UserDao.getUserById(6).then(e => {
    console.log(e);
});