import { Role } from '../models/role';
import { Database } from './database';

export class RoleDao {
    public static async getAllRoles(): Promise<Role[]> {
        let result = await Database.Query('select * from "role"');
        return result.rows.map(e => {
            return new Role(e.roleid, e.role);
        });
    }

    public static async getRoleById(id: number): Promise<Role> {
        let result = await Database.Query(`select * from "role" where roleid = ${id}`);
        let r = result.rows[0];
        return new Role(r.roleid, r.role);
    }
}