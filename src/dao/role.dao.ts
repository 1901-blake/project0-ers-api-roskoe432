import { Database } from './database';
import { Role } from '../models/role';

export class RoleDao {
    private static roles: Role[];

    public static async getAll(): Promise<Role[]> {
        if(!this.roles) {
            let res = await Database.Query('select * from "role"');
            if (!res) return undefined;
            this.roles = res.rows.map(e => {
                return new Role(e.roleid, e.role);
            });
        }
        return this.roles;
    }

    public static async getById(id: number): Promise<Role> {
        let list = await this.getAll();
        if(!list) return undefined;
        return list.find(e => {
            return e.roleId === id;
        });
    }
}