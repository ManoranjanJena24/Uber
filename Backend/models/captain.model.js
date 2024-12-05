const mongoose=require('mongoose')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const captainSchema =new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Firstname must be at least 3 character long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Firstname must be at least 3 character long"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,'please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,

    },
    status:{   //this is mainly for available for ride or not
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be atleast 3 character long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be atleast 3 character long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be atleast 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }

    },

    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number, 
        }

    }


})

captainSchema.methods.generateAuthToken= async function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}


captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}


const captainModel=mongoose.model('captain',captainSchema);
module.exports=captainModel