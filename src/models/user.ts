// The User model keeps track of 
// users information.

import { Role } from './role';

export class User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;

    constructor(id: number = 0, username: string = '', email: string = '', password: string = '', firstName: string = '', lastName: string = '', role: Role = undefined) {
        this.userId = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    get getFullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    public static FromLiteral(obj) {
        
    }
}