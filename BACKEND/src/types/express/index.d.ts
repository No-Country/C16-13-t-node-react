import express from 'express';
import User from '../../models/user'

declare global {
    namespace Express {
        interface Request {
            user?: Record<string , any>;
        }
    }
}

// Por este enlace se puede ver la solución al problema de typescript con express para la req.user en el middleware de validate-jwt
// https://stackoverflow.com/questions/65848442/property-user-does-not-exist-on-type-requestparamsdictionary-any-any-pars