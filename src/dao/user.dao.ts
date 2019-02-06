import { User } from '../models/user';
import { Database, IQueryable } from './database';
import { Role } from '../models/role';


export class UserDao {
    /**
     * Helper function to construct User instance
     * from database queries.
     * @param obj 
     */
    private static fromLiteral(obj) {
        let role = new Role(obj.role, obj.rolename);
        return new User(obj.userid, obj.username, obj.email, obj.password, obj.firstname, obj.lastname, role);
    }

    /**
     * Queries all users from database.
     */
    public static async getAll(): Promise<User[]> {
        let res = await Database.Query(
            'select u.*, r."role" as "rolename"'+
            'from "user" as u ' + 
            'inner join "role" as r ' + 
            'on u."role" = r.roleid;'
        );
        if(!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    /**
     * Queries one user by id.
     * @param id 
     */
    public static async getById(id: number): Promise<User> {
        let res = await Database.Query(
            'select u.*, r."role" as "rolename"' +
            'from "user" as u ' + 
            'inner join "role" as r ' + 
            'on u."role" = r.roleid ' + 
            'where u.userid = $1;',
            [id]
        );
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    /**
     * Updates a user by id and input provided in request
     * body.
     * @param req 
     * @returns Promise<User> 
     */
    public static async update(req): Promise<User> {
        let { userid, username, email, password, firstname, lastname, role } = req.body;

        // Set up first query to update user.
        const update: IQueryable = {
            isResult: false,
            query: 'update "user" set ' +
                'username = $1, ' +
                '"password" = $2, ' +
                'firstname = $3, ' +
                'lastname = $4, ' +
                'email = $5, ' +
                '"role" = $6 ' +
                'where userid = $7; ',
            params: [username, password, firstname, lastname, email, role, userid]
        };

        // Set up second query to return user that was updated.
        const select: IQueryable = {
            isResult: true,
            query: 'select u.*, r."role" as "rolename" ' +
                'from "user" as u ' +
                'inner join "role" as r ' +
                'on u."role" = r.roleid ' +
                'where u.userid = $1;',
            params: [userid]
        };

        // Runs both queries in a transaction.
        let res = await Database.Transaction(update, select);
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    /**
     * Verifies login credentials if someone
     * tries to login to api.
     * @param req 
     * @returns by login 
     */
    public static async getByLogin(req): Promise<User> {
        let { username, password } = req.body;
        let res = await Database.Query(
            'select u.*, r."role" as "rolename"' +
            'from "user" as u ' + 
            'inner join "role" as r ' + 
            'on u."role" = r.roleid ' + 
            'where u.username = $1 and u."password" = $2;', 
            [ username, password ]
        );
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }
}