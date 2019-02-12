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
    dateSubmitted: Date;
    dateResolved: Date;
    description: string;
    resolver: User;
    status: ReimbursementStatus;
    type: ReimbursementType;
   
    constructor(id: number, author: User, amount: number, dateSubmitted: Date, dateResolved: Date, description: string, resolver: User, status: ReimbursementStatus, type: ReimbursementType) {
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
}