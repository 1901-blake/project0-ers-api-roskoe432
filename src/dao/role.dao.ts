import { Role } from '../models/role';
import { Database } from './database';

export class RoleDao {
    public static async getAllRoles(): Promise<Role[]> {
        const client = await Database.GetPool().connect();
        let result = await client.query('select * from "role"');
        client.release();
        
        return result.rows.map(e => {
            return new Role(e.roleid, e.role);
        });
    }

    public static async getRoleById(id: number): Promise<Role> {
        const client = await Database.GetPool().connect();
        let result = await client.query(`select * from "role" where roleid = ${id}`);
        client.release();

        let r = result.rows[0];
        return new Role(r.roleid, r.role);
    }
}