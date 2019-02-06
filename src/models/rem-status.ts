

/**
 * The ReimbursementStatus model is
 * used to track the status of
 * reimbursements. Status possibilities
 * are `Pending`, `Approved`, or `Denied`.
 */
export class ReimbursementStatus {
    statusId: number; // primary key
    status: string; // not null, unique

    constructor(id: number, status: string) {
        this.statusId = id;
        this.status = status;
    }
}