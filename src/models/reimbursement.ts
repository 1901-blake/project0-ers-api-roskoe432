// The Reimbursement model is used to 
//  represent a single reimbursement that
//  an employee would submit

export class Reimbursement {
    private static count: number = 0;

    private _reimbursementId: number; // primary key
    public author: number; // foreign key -> User, not null
    public amount: number; // not null
    public dateSubmitted: number; // not null
    public dateResolved: number; // not null
    public description: string; // not null
    public resolver: number; // foreign key -> User
    public status: number; // foreign key -> ReimbursementStatus, not null
    public type: number; // foreign key -> ReimbursementType
   
    constructor() {
        this._reimbursementId = Reimbursement.count;
        

        Reimbursement.count++;
        console.log(this._reimbursementId);
    }
}