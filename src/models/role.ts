// The Role model is used to track
//  what permissions a user has.
export class Role {
    private static count: number = 0;
    
    private _roleId: number; // primary key
    private _role: string; // not null, unique

    constructor(role: string) {
        this._roleId = Role.count;
        this._role = role;

        Role.count++;
        console.log(this._roleId);
    }

    get getRoleId(): number { return this._roleId; }
    get getRole(): string { return this._role; }
}

let a = new Role("cook");
let b = new Role("plumber");