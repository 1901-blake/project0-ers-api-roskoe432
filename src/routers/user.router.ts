import express from 'express';
import { UserDao } from '../dao/user.dao';
import { authMiddleware, edgeCaseMiddleware } from '../middleware/auth.middleware';



export const userRouter = express.Router();



userRouter.get('/', 
[authMiddleware('admin', 'finance manager'), 
async (req, res) => {
    let users = await UserDao.getAll();
    if(users) {
        res.json(users);
    } else {
        res.status(401).send('Could not retrieve users.');
    }
}]);



userRouter.get('/:id', 
[authMiddleware('all'), 
edgeCaseMiddleware('id'),
async (req, res) => {
    let user = await UserDao.getById(req.params.id);
    if(user) {
        res.status(201).json(user);
    } else {
        res.status(401).send('User not found!');
    }
}]);



userRouter.patch('/', 
[authMiddleware('admin'), 
async (req, res) => {
    let user = await UserDao.update(req);
    if(user) {
        res.status(201).json(user);
    } else {
        res.status(401).send('User not updated!');
    }
}]);



// userRouter.post('/sign-up', 
// [authMiddleware('admin'), 
// async (req, res) => {
//     let user = await UserDao.create(req);
//     if (user) {
//         res.status(201).json(user);
//     } else {
//         res.status(401).send('Could not submit reimbursement.');
//     }
// }]);