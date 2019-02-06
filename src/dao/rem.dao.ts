import { Reimbursement } from '../models/rem';
import { ReimbursementStatus } from '../models/rem-status';
import { ReimbursementType } from '../models/rem-type';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Database } from './database';

export class RemDao {
    /**
     * Helper function to plug select query
     * string into various dao methods.
     * @param [cond] optional condition to attach to select query
     * @returns query string
     */
    private static getQuery(cond?: string): string {
        return 'select r.*, ' +
            'u.username as "a_username", ' +
            'u.firstname as "a_firstname", ' +
            'u.lastname as "a_lastname", ' +
            'u."password" as "a_password", ' +
            'u.email as "a_email", ' +
            'u."role" as "a_role", ' +
            '(select "role"."role" from "role" where "role".roleid = u."role") as "a_rolename", ' +
            'u2.username as "r_username", ' +
            'u2.firstname as "r_firstname", ' +
            'u2.lastname as "r_lastname", ' +
            'u2."password" as "r_password", ' +
            'u2.email as "r_email", ' +
            'u2."role" as "r_role", ' +
            '(select "role"."role" from "role" where "role".roleid = u2."role") as "r_rolename", ' +
            's.status as "statusname", ' +
            't."type" as "typename" ' +

            'from reimbursement as r ' +
            'join "user" as u ' +
            'on u.userid = r.author ' +
            'join "user" as u2 ' +
            'on u2.userid = r.resolver ' +
            'join reimbursementstatus as s ' +
            'on s.statusid = r.status ' +
            'join reimbursementtype as t ' +
            'on t.typeid = r."type"' + (!cond ? '' : ' ' + cond) + ';';
    }

    /**
     * Helper function to help create
     * Reimbursement instance from data.
     * @param obj result set
     */
    private static fromLiteral(obj): Reimbursement {
        let authorUser = new User(
            obj.author, 
            obj.a_username, 
            obj.a_email, 
            obj.a_password, 
            obj.a_firstname, 
            obj.a_lastname, 
            new Role(obj.a_role, obj.a_rolename)
        );
        let resolverUser = new User(
            obj.resolver,
            obj.r_username,
            obj.r_email,
            obj.r_password,
            obj.r_firstname,
            obj.r_lastname,
            new Role(obj.r_role, obj.r_rolename)
        );
        let status = new ReimbursementStatus(obj.status, obj.statusname);
        let type = new ReimbursementType(obj.type, obj.typename);
        
        return new Reimbursement(
            obj.reimbursementid,
            authorUser,
            obj.amount,
            obj.datesubmitted,
            obj.dateresolved,
            obj.description,
            resolverUser,
            status,
            type
        );
    }

    /**
     * Query to help locate reimbursements by id
     * @param id 
     * @returns Promise<Reimbursement>
     */
    private static async getById(id: number): Promise<Reimbursement> {
        let res = await Database.Query(
            this.getQuery('where r.reimbursementid = $1'), [ id ]
        );
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    /**
     * Retrieves reimbursements by status id
     * @param id 
     * @returns Promise<Reimbursement[]>
     */
    public static async getByStatus(id: number): Promise<Reimbursement[]> {
        let res = await Database.Query(
            this.getQuery('where r.status = $1'), [ id ]
        );
        if(!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    /**
     * Retrieves reimbursements by User id
     * @param id 
     * @returns Promise<Reimbursement[]>
     */
    public static async getByUser(id: number): Promise<Reimbursement[]> {
        let res = await Database.Query(
            this.getQuery('where r.author = $1'), [id]
        );
        if (!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    /**
     * Creates a new reimbursement
     * @param req request body
     * @returns Promise<Reimbursement>
     */
    public static async create(req): Promise<Reimbursement> {
        let e = req.body;
        let res = await Database.Query(
            'insert into reimbursement (author, amount, datesubmitted, dateresolved, description, resolver, status, "type") ' +
            'values ($1, $2, $3, $4, $5, $6, $7, $8) returning reimbursementid;',
            [ e.author, e.amount, e.datesubmitted, e.dateresolved, e.description, e.resolver, e.status, e.type ]);

        return await this.getById(res.rows[0].reimbursementid);
    }

    /**
     * Updates a submitted reimbursement
     * @param req request body
     * @returns Promise<Reimbursement>
     */
    public static async update(req): Promise<Reimbursement> {
        let e = req.body;

        let res = await Database.Query(
            'update reimbursement set author = $1, amount = $2, ' +
            'datesubmitted = $3, dateresolved = $4, description = $5, ' +
            'resolver = $6, status = $7, type = $8 where reimbursementid = $9 returning reimbursementid;', [ 
                e.author, e.amount, e.datesubmitted, e.dateresolved, e.description,
                e.resolver, e.status, e.type, e.reimbursementid 
            ]
        );
        if(!res) return undefined;
        return await this.getById(res.rows[0].reimbursementid);
    }
}