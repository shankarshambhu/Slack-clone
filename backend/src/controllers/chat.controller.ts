import { generateStreamToken } from "../config/stream"

export const getStreamToken = async (req: any, res: any) => {
    try {
        const token = await generateStreamToken(req.auth().userId);
        if (!token) {
            res.status(404).json({
                msg: "no token avaiable "
            })
        }
        res.status(200).json({
            msg: "token created successfully"
        })
    } catch (error) {
        console.log('error creating token ', error);
        res.status(500).json({
            msg: "failed to generate token"
        })


    }

}