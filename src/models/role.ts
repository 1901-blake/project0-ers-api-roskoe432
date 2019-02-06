
/**
 * The Role model is used to track
 * what permissions a user has. Can
 * be `Admin`, `Finance Manager`, or 
 * `Associate`
 */
export class Role {    
    roleId: number; // primary key
    role: string; // not null, unique

    constructor(id: number, role: string) {
        this.roleId = id;
        this.role = role;
    }
}