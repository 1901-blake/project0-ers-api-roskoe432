import { User } from "./user";
import { ReimbursementStatus } from "./reimbursement-status";
import { ReimbursementType } from "./reimbursement-type";

// The Reimbursement model is used to 
//  represent a single reimbursement that
//  an employee would submit
export class Reimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;
   
    constructor(id: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number) {
        this.reimbursementId = id;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
    }

    private static getDate(value: number) {
        let t = new Date(1970, 1, 1);
        t.setSeconds(value);
        return t.toISOString();
    }

    public getDateSubmitted(): string {
        return Reimbursement.getDate(this.dateSubmitted);
    }

    public getDateResolved(): string {
        if(this.dateResolved === 0) {
            return 'pending';
        }
        return Reimbursement.getDate(this.dateResolved);
    }
}