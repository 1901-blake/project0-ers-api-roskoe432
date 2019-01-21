// The User model keeps track of 
// users information.

import { Role } from './role';

export class User {
    userId: number; // Primary Key
    username: string; // not null, unique
    password: string; // not null
    firstName: string; // not null
    lastName: string; // not null
    email: string; // not null
    role: Role; // not null

    constructor(id: number, username: string, email: string, password: string, firstName: string, lastName: string, role: Role) {
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
}