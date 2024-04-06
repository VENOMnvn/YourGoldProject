import { Router } from "express";
const router = Router();

router.get('/',(req,res)=>{
    res.send("API Route Working Fine");
});

export default router;
