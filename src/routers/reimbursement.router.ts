import express from 'express';
import { Reimbursement } from '../models/reimbursement';
// temp

export const reimburseRouter = express.Router();

reimburseRouter.get('', (req, res) => {
    //res.json(DB.selectAllReimbursements());
});

reimburseRouter.get('/status/:status', (req, res) => {
    let id = parseInt(req.params.status);
    //res.json(DB.selectReimbursentByStatus(id));
});