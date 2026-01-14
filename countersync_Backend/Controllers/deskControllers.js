const Desk=require("../models/desk");

const createDesk=async(req, res, next)=>{
    try{
        let{deskName, password, isAdmin}=req.body;

        const existingDesk = await Desk.findOne({ deskName });
        if (existingDesk) {
            return res.status(409)
                .json({
                    errMsg: "Desk name already exists",
                });
        }


        const newDesk=new Desk({
            deskName,
            password,
            isAdmin,
        });

        await newDesk.save();

        const token = await newDesk.generateAuthToken();

        return res.status(201).json(
                {
                    msg : "desk created",
                    token,
                    userId : newDesk._id.toString(),
                }
            );
    }
    catch(error){
        console.log(error);
        if (error.code === 11000) {
            return res.status(409).json({
                errMsg: "Desk name already exists",
            });
        }
        next(error);
    }
};

const loginDesk=async(req, res, next)=>{
    try{
        const{deskName, password}=req.body;
        console.log(deskName,password);

        const desk=await Desk.findOne({deskName});
        console.log(desk);
        if(!desk){
            return res.status(401).json({msg:" "});
        }

        const isMatch=await desk.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({msg: ""});
        }

        res.status(200).json({
            msg: "Login successfull",
            token: await desk.generateAuthToken(),
            userId: desk._id.toString(),
        });
    }
    catch(error){
        console.log(error);
        next(error);
    }
};

module.exports={createDesk, loginDesk};