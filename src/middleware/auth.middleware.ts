import express from 'express';

const app = express();

// Create auth functions to call in routers 
// to grant and revoke privilages to certain
// users

export function authMiddleware(...roles: string[]) {
    return (req, res, next) => {
        const user = req.session.user;
        if (!user) {
            res.sendStatus(401);
            return;
        }
        const hasPermission = roles.some(role => {
            return ( user.role === role );
        });
        
        if (hasPermission) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
}

export function verifyUserId(req, res, next) {
    let { role, id } = req.session.user;
    if(role === 'associate') {
        if(id === +req.params.id) {
            next();
            return;
        }
    }
    res.sendStatus(403);
}