import { Role } from '../models/role';
import { Database } from './database';

export class RoleDao {
    public static async getAllRoles(): Promise<Role[]> {
        let { rows } = await Database.Query('select * from "roles"');

        if(!rows) return null;
        
        return rows.map(e => {
            return new Role(e.roleid, e.role);
        });
    }

    public static async getRoleById(id: number): Promise<Role> {
        let { rows } = await Database.Query('select * from "role" where roleid = $1', [id]);
        if(!rows) return null;
        return new Role(rows[0].roleid, rows[0].role);
    }
}