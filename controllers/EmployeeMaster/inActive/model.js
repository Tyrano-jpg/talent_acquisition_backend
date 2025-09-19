const mongoos=require("mongoose");
const dbSchema=new mongoos.Schema(
    {
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            require:true
        },
        contact:{
            type:Number,
            maxlength:12
        },
        address:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoos("tempData",dbSchema)