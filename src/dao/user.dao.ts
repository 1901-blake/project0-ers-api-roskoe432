import { User } from '../models/user';
import { SessionFactory } from '../main/session-factory';

export class UserDao {
    private static instance: UserDao;

    constructor() {
        if(!UserDao.instance) {
            UserDao.instance = this;
        }
        else throw new Error('UserDao can only have one or 0 instance.');
    }

    public static async getAllUsers(): Promise<User[]> {
        const client = await SessionFactory.Connect();
        let result = await client.query('select * from "user"');
        
        let list: User[] = await result.rows.map(e => {
            return new User(e.userid, e.username, e.email, e.password, e.firstname, e.lastname, e.role);
        });

        return list;
    }

    public static async getUserById(id: number): Promise<User> {
        let client = await SessionFactory.Connect();
        let result = await client.query(`select * from "user" where userid = ${id}`);
        let u = result.rows[0];
        return new User(id, u.username, u.email, u.password, u.firstname, u.lastname, u.role);
    }

    public static updateUser(): void {

    }
}

UserDao.getAllUsers().then(u => {
    console.log(u);
});
// UserDao.getUserById(1).then(u => {
//     console.log(u.username);
// });