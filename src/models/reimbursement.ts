import { User } from "./user";
import { ReimbursementStatus } from "./reimbursement-status";
import { ReimbursementType } from "./reimbursement-type";

// The Reimbursement model is used to 
//  represent a single reimbursement that
//  an employee would submit

export class Reimbursement {
    reimbursementId: number; // primary key
    author: User;
    amount: number; // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null
    resolver: User; // foreign key -> User
    status: ReimbursementStatus; // foreign key -> ReimbursementStatus, not null
    type: ReimbursementType; // foreign key -> ReimbursementType
   
    constructor(id: number, author: User, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: User, status: ReimbursementStatus, type: ReimbursementType) {
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