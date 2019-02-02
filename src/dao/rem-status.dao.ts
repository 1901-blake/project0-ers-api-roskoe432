import { ReimbursementStatus } from '../models/reimbursement-status'
import { Database } from './database';

export class RemStatusDao {
    private static statuses: ReimbursementStatus[];

    public static async getAll(): Promise<ReimbursementStatus[]> {
        if(!this.statuses) {
            let res = await Database.Query('select * from reimbursementstatus');
            if (!res) return undefined;

            this.statuses = res.rows.map(e => {
                return new ReimbursementStatus(e.statusid, e.status);
            });
        }
        return this.statuses;
    }

    public static async getById(id: number): Promise<ReimbursementStatus> {
        let list = await this.getAll();
        if(!list) return undefined;
        return list.find(e => {
            return e.statusId === id;
        });
    }
}