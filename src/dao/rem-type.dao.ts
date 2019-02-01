import { ReimbursementType } from '../models/reimbursement-type'
import { Database } from './database';

export class RemTypeDao {
    public static async getAll(): Promise<ReimbursementType[]> {
        let res = await Database.Query('select * from reimbursementtype');
        if(!res) return undefined;

        return res.rows.map(e => {
            return new ReimbursementType(e.typeid, e.type);
        });
    }

    public static async getById(id: number): Promise<ReimbursementType> {
        let res = await Database.Query('select * from reimbursementtype where typeid = $1', [ id ]);
        if(!res) return undefined;
        let row = res.rows[0];
        return new ReimbursementType(row.typeid, row.type);
    }
}