import express from 'express';
import { RemDao } from '../dao/rem.dao';
import { authMiddleware, edgeCaseMiddleware } from './middleware/auth.middleware';



export const reimburseRouter = express.Router();


// Request to access reimbursements by status id.
reimburseRouter.get('/status/:status', 
[authMiddleware('admin', 'finance manager'), 
async (req, res) => {
    let rems = await RemDao.getByStatus(req.params.status);
    if (rems) {
        res.status(201).json(rems);
    } else {
        res.status(401).send('Could not retrieve reimbursements.');
    }
}]);


// Request to access reimbursements by user id.
reimburseRouter.get('/user/:user', 
[authMiddleware('all'), 
edgeCaseMiddleware('user'),
async (req, res) => {
    let rems = await RemDao.getByUser(req.params.user);
    if (rems) {
        res.status(201).json(rems);
    } else {
        res.status(401).send('Could not retrieve reimbursements.');
    }
}]);



// No permissions needed
// Request to submit/create a reimbursement.
reimburseRouter.post('/', [authMiddleware('all'), async (req, res) => {
    let rem = await RemDao.create(req);
    if (rem) {
        res.status(201).json(rem);
    } else {
        res.status(401).send('Could not submit reimbursement.');
    }
}]);


// Request to update a reimbursement
// In case of finance manager to approve or deny
// pending reimbursements.
reimburseRouter.patch('/', 
[authMiddleware('finance manager'), async (req, res) => {
    let rem = await RemDao.update(req);
    if (rem) {
        res.status(201).json(rem);
    } else {
        res.status(401).send('Could not update reimbursement.');
    }
}]);