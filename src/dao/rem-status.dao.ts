import { ReimbursementStatus } from '../models/reimbursement-status'
import { Database } from './database';

export class RemStatusDao {
    public static async getAll(): Promise<ReimbursementStatus[]> {
        let res = await Database.Query('select * from reimbursementstatus');
        if (!res) return undefined;

        return res.rows.map(e => {
            return new ReimbursementStatus(e.statusid, e.status);
        });
    }

    public static async getById(id: number): Promise<ReimbursementStatus> {
        let res = await Database.Query('select * from reimbursementstatus where statusid = $1', [id]);
        if (!res) return undefined;
        let row = res.rows[0];
        return new ReimbursementStatus(row.statusid, row.status);
    }
}