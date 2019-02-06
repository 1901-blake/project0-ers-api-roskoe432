import { User } from "./user";
import { ReimbursementStatus } from "./rem-status";
import { ReimbursementType } from "./rem-type";

/**
 * The Reimbursement model is used to
 * represent a single reimbursement that
 * an employee would submit
 */
export class Reimbursement {
    reimbursementId: number;
    author: User;
    amount: number;
    dateSubmitted: string;
    dateResolved: string;
    description: string;
    resolver: User;
    status: ReimbursementStatus;
    type: ReimbursementType;
   
    constructor(id: number, author: User, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: User, status: ReimbursementStatus, type: ReimbursementType) {
        this.reimbursementId = id;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = Reimbursement.getDate(dateSubmitted);
        this.dateResolved = Reimbursement.getDate(dateResolved);
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
    }

    private static getDate(value: number) {
        if(value === 0)
            return 'Not Resolved!';
        let t = new Date(1970, 1, 1);
        t.setSeconds(value);
        return t.toISOString();
    }
}