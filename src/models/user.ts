export class User {
    private static count: number;

    private userId: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    // Role class

    constructor(username: string, email: string, password: string, firstName: string, lastName: string) {
        User.count++;
        this.userId = User.count;
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    } 

    public getUserId() { return this.userId; }
}

console.log("");