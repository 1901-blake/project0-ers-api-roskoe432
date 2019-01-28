import { Role } from '../models/role';
import { SessionFactory } from '../main/session-factory';

export class RoleDao {
    public static async getAllRoles(): Promise<Role[]> {
        const client = await SessionFactory.GetPool().connect();
        let result = await client.query('select * from "role"');
        return result.rows.map(e => {
            return new Role(e.roleid, e.role);
        });
    }

    public static async getRoleById(id: number): Promise<Role> {
        const client = await SessionFactory.GetPool().connect();
        let result = await client.query(`select * from "role" where roleid = ${id}`);
        let r = result.rows[0];
        return new Role(r.roleid, r.role);
    }
}