import mongoose from 'mongoose'
import bcrypte from 'bcryptjs'
const userShema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
},{timestamps:true})//createdAt: a date representing when this document was created updatedAt: a date representing when this document was last updated
userShema.methods.matchPassword=async function(entredPasword){
    return await bcrypte.compare(entredPasword,this.password)
}
userShema.pre('save',async function (next){
    if(!this.isModified('password')){next()}
    const salt=await bcrypte.genSalt(10)
    this.password=await bcrypte.hash(this.password,salt)
})
const User=mongoose.model('User',userShema)
export default User