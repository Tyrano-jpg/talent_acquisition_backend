const mongoose=require('mongoose')
require("dotenv").config();
const dbData=()=>{
    mongoose.connect(process.env.APP_URL,{
      useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then(()=> console.log("database connect successfully"))
    .catch((error)=>{
          console.log("some error in db connection"),
        console.error(error.message);
        process.exit(1)
    })
}
module.exports=dbData;