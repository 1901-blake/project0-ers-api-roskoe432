import { Reimbursement } from '../models/reimbursement';
import { Database } from './database';

export class RemDao {
    private static fromLiteral(obj) {
        return new Reimbursement(
            obj.reimbursementid,
            obj.author,
            obj.amount,
            obj.datesubmitted,
            obj.dateresolved,
            obj.description,
            obj.resolver,
            obj.status,
            obj.type
        );
    }

    private static async getById(id: number): Promise<Reimbursement> {
        let res = await Database.Query('select * from reimbursement where reimbursementid = $1', [id]);
        if(!res) return undefined;
        return this.fromLiteral(res.rows[0]);
    }

    public static async getByStatus(id: number): Promise<Reimbursement[]> {
        let res = await Database.Query('select * from reimbursement where status = $1 order by datesubmitted;', [ id ]);
        if(!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    public static async getByUser(id: number): Promise<Reimbursement[]> {
        let res = await Database.Query('select * from reimbursement where author = $1;', [id]);
        if (!res) return undefined;
        return res.rows.map(this.fromLiteral);
    }

    public static async create(req): Promise<Reimbursement> {
        let e = req.body;
        let res = await Database.Query(
            'insert into reimbursement (author, amount, datesubmitted, dateresolved, description, resolver, status, "type") ' +
            'values ($1, $2, $3, $4, $5, $6, $7, $8) returning reimbursementid;',
            [ e.author, e.amount, e.datesubmitted, e.dateresolved, e.description, e.resolver, e.status, e.type ]);

        return await this.getById(res.rows[0].reimbursementid);
    }

    public static async update(req): Promise<Reimbursement> {
        let e = req.body;
        await Database.Query(
            'update reimbursement set author = $1, amount = $2, ' + 
            'datesubmitted = $3, dateresolved = $4, description = $5, '+ 
            'resolver = $6, status = $7, type = $8 where reimbursementid = $9;',
            [e.author, e.amount, e.datesubmitted, e.dateresolved, e.description, 
            e.resolver, e.status, e.type, e.reimbursementid ]);

        return await this.getById(req.body.reimbursementid);
    }
}