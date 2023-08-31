import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{        //this is used for the dashes 
        type:String,
        lowercase:true
    }
})

export default mongoose.model('Category',categorySchema);