import express from 'express';

const app = express();

// Create auth functions to call in routers 
// to grant and revoke privilages to certain
// users

/**
 * Middleware that verifies a user permission to
 * access api. If roles is set to `all`, then all
 * roles have permission to that request.
 * @param roles names of allowed roles.
 */
export function authMiddleware(...roles: string[]) {
    return (req, res, next) => {
        const user = req.session.user;
        if (!user) {
            res.sendStatus(401);
            return;
        }
        if (roles && roles[0] === 'all') {
            next();
            return;
        }
        
        const hasPermission = roles.some(role => {
            return ( user.role === role );
        });
        
        if (hasPermission) {
            next();
            return;
        } else {
            res.status(403).send("User does not have permissions!");
        }
    }
}

/**
 * Middleware used verify a user's id so they
 * can view their information and reimbursements,
 * but only theirs. If admin or finance manager 
 * the check bypasses them and proceeds to request.
 * @param param name of request parameters value.
 */
export function edgeCaseMiddleware(param) {
    return function(req, res, next) {
        let { role, id } = req.session.user;
        if(role === 'associate') {
            if(id === +req.params[param]) {
                next();
                return;
            } else {
                res.status(403).send('Associate can not access other associates\' profile.');
            }
        }   
        next();
    }
}