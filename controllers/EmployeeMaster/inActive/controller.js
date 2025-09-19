const Val=require("./model")
exports.routesData=async(req,res)=>{
    try{
        let data={...req.body}
    console.log(data,"this is req.body data")
    const response=await Val.create(data)
    return res.status(201).json({
        status:true,
        data:response,
        message:"data save successfully"
    })
    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json(
            {
                success:false,
                data:"internal server erro",
                message:err.message
            }
        )

    }
}