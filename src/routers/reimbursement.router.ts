import express from 'express';
import { RemDao } from '../dao/rem.dao';
import { authMiddleware } from '../middleware/auth.middleware';



export const reimburseRouter = express.Router();



reimburseRouter.get('/status/:status', 
[authMiddleware('finance-manager'), 
async (req, res) => {
    let rems = await RemDao.getByStatus(req.params.status);
    if (rems) {
        res.status(201).json(rems);
    } else {
        res.status(401).send('Could not retrieve reimbursements.');
    }
}]);



reimburseRouter.get('/user/:user', 
[authMiddleware('finance-manager', 'associate'), 
async (req, res) => {
    let rems = await RemDao.getByUser(req.params.user);
    if (rems) {
        res.status(201).json(rems);
    } else {
        res.status(401).send('Could not retrieve reimbursements.');
    }
    res.end("Testing");
}]);



// No permissions needed
reimburseRouter.post('/', async (req, res) => {
    let rem = await RemDao.create(req);
    if (rem) {
        res.status(201).json(rem);
    } else {
        res.status(401).send('Could not submit reimbursement.');
    }
});



reimburseRouter.patch('/', 
[authMiddleware('finance-manager'), async (req, res) => {
    let rem = await RemDao.update(req);
    if (rem) {
        res.status(201).json(rem);
    } else {
        res.status(401).send('Could not update reimbursement.');
    }
}]);