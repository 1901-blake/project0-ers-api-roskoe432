import { User } from '../models/user';
import { Database } from './database';
import { RoleDao } from './role.dao';

export class UserDao {
    public static async getAllUsers(): Promise<User[]> {
        const client = await Database.GetPool().connect();
        let result = await client.query('select * from "user"');
        client.release();

        let roles = await RoleDao.getAllRoles();

        return result.rows.map(e => {
            let role = roles[e.role-1];
            return new User(e.userid, e.username, e.email, e.password, e.firstname, e.lastname, role);
        });
    }

    public static async getUserById(id: number): Promise<User> {
        let client = await Database.GetPool().connect();
        let result = await client.query(`select * from "user" where userid = ${id}`);
        client.release();
        
        let user = result.rows[0];
        return new User(id,
            user.username, 
            user.email, 
            user.password, 
            user.firstname, 
            user.lastname, 
            await RoleDao.getRoleById(user.role)
        );
    }

    public static async updateUser(req, id: number): Promise<User> {
        const client = await Database.GetPool().connect();
        await client.query(
            'update "user"' +
            `set username = '${req.body.username}',` +
            `"password" = '${req.body.password}',` +
            `firstname = '${req.body.firstname}',` +
            `lastname = '${req.body.lastname}',` +
            `"role" = ${req.body.role}` +
            `where userid = ${id};`
        );
        client.release();
        return await this.getUserById(id);
    }
}