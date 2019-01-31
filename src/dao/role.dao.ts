import { Database } from './database';
import { Role } from '../models/role';

export class RoleDao {
    public static async getAll(): Promise<Role[]> {
        let res = await Database.Query('select * from "role"');
        if(!res) return undefined;

        return res.rows.map(e => {
            return new Role(e.roleid, e.role);
        });
    }

    public static async getById(id: number): Promise<Role> {
        let res = await Database.Query('select * from "role" where roleid = $1', [id]);
        if(!res) return undefined;
        return new Role(res.rows[0].roleid, res.rows[0].role);
    }
}

// RoleDao.getAll().then(e => {
//     console.log(e);
// });

RoleDao.getById(4).then(e => {
    console.log(e);
});