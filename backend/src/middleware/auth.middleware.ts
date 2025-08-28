import { NextFunction } from "express"

export const protectRoute = (req: any, res: any, next: NextFunction) => {
    if (!req.auth().isAuthenticated) {
        return res.status(401).json({ msg: "unauthorized you are not authenticated" })

    }
    next();
}