// The User model keeps track of 
// users information.

export class User {
    private static count: number = 0;

    private _userId: number; // Primary Key
    public username: string; // not null, unique
    public password: string; // not null
    public firstName: string; // not null
    public lastName: string; // not null
    public email: string; // not null
    // Role class // not null

    constructor(username: string, email: string, password: string, firstName: string, lastName: string) {
        this._userId = User.count;
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;

        User.count++;
        console.log(this._userId);
    } 

    get getUserId(): number { return this._userId; }
    get getFullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}

let a = new User('bill', 'bill@gmail.com', 'pw', 'bill', 'bo');
let b = new User('bob', 'bob@yahoo.com', 'pw', 'bob', 'by');
let c = new User('john', 'who@gmail.com', 'pw', 'john', 'doe');

console.log(a.getFullName);
console.log(b.getFullName);
console.log(c.getFullName);