const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = require('../configurations/secretkey');
//const config=require('../configurations/database');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name cant be empty'],
        minlength: [4, 'First name should have minimum 4 characters']
    },
    lastname: {
        type: String,
        required: 'Last name is required',
        minlength: [4, 'Last name should have minimum 4 characters']
    },
    email: {
        type: String,
        required: 'Email is required',
        //unique:true
    },
    createpassword: {
        type: String,
        required: 'Password is required',
        minlength: [4, 'password should have minimum 4 characters']
    },
    confirmpassword:{
         type:String,
         required:'Password is required'
      },

}, {
        timestamps: true
    })
userSchema.path('email').validate((value) => {
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return (emailRegex.test(value));
}, 'Invalid Email');

userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.createpassword, salt, (err, hash) => {
            if (err) throw err;
            this.createpassword = hash;
            //console.log(this.createpassword);
            this.saltSecret = salt;
           // console.log(this.saltSecret);
            next();
        });
    });
});
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.confirmpassword, salt, (err, hash) => {
            if (err) throw err;
            this.confirmpassword = hash;
            //console.log(this.confirmpassword);
            this.saltSecret = salt;
            //console.log(this.saltSecret);
            next();
        });
    });
});

var User = mongoose.model('User', userSchema);

function userModel() {

}


userModel.save = function (obj, callback) {
    var user = new User(obj);
    user.save((err, doc) => {
        if (err) {
            console.log('err in register model',err);
            return callback(err, null)
        }
        else {
            console.log('result in register model',doc);
            return callback(null, 'User Registered');
        }
    });
}
userModel.checkemail = function (obj, callback) {
    console.log('in check mail model');
    User.find({ "email": obj.email }, function (err, result) {
        if(err){
            console.log('check email error is',err);
            return callback(err);
        }
      else if(result.length>0){
           return callback('U have already registered with this email!!Please try again other Email',null);
        }
        else{
            return callback(null,'A step ahead to register');

        }
      });  
};


userModel.checkloginemail = function (obj, callback) {
    console.log('in user model login');
    User.find({ "email": obj.email }, function (err, result) {
        if (err) {
            console.log('err in usr model  ...', err);

            return callback(err);
        }
        else {
            console.log('Result  ', result)
            if (result.length < 1) {
                return callback('Authentication Failed');
            }
            else{
             bcrypt.compare(obj.password, result[0].confirmpassword, function (err, res) {
                    if (err) {
                        console.log('err in user model', err);
                    }
                    console.log('result is',res);
                    if (res) {
                        var token = jwt.sign({
                            "email": result[0].email,
                            "password": result[0].password
                        }, secretKey.secret, {
                                expiresIn: 86400
                            });
                        console.log("Token is", token);
                    
                    }
                    return callback(null,'Authenticated/Login Successfull');
                });
                
            }
        }
    })
   
}
/*userModel.checkPasswordEmail = function (obj, callback) {
    console.log('in user model forgotPassword',obj);
    User.find({ "email": obj.email }, function (err, result) {
        if (err) {
            console.log('err in usr model  ...', err);
           return callback(err);
        }
        else if(result){
            console.log('result ib check email password',result);
            return callback(null, result);            
            // return callback(null,'Please wait!!A mail will be sent to you');

        }
        else{
            return callback('Sorry!the mail does not exists');
        }
    })
}*/





module.exports = userModel;
