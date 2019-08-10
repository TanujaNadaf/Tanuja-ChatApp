const nodemailer = require('nodemailer');

const userModel = require('../models/user');
function userService() {

}

userService.register = function (obj, callback) {
    console.log('in reg service');

    userModel.checkemail(obj, function (err, result) {
        //console.log("Object is",obj);
        if (err) {
            console.log('error in user service', err);
            return callback(err, null)
        }
        else {
            console.log('result in user service', result);
            userModel.save(obj, function (err, result) {
                if (err) {
                    console.log('error in user service-- ', err);
                    return callback(err, null)
                }
                else {
                    console.log('result in user service-- ', result);
                    return callback(null, result);
                }
            })
        }
    })
},


    userService.login = function (obj, callback) {
        console.log("inside userservice login");
        console.log(obj);
        userModel.checkloginemail(obj, function (err, result) {
            if (err) {
                console.log('err in user service', err);
                return callback(err, null)
            }
            else {
                console.log('result in user service', result);
                return callback(null, result)
            }
        })

    },
    /*userService.forgotPassword = function (obj, callback) {
        console.log('inside user service forgot ');
        userModel.checkPasswordEmail(obj, function (err, result) {
            if (err) {
                console.log('err in user service', err);
                return callback(err, null)
            }
            else {
                console.log('result in user service forgot', result);
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: false,
                    auth: {
                        user: 'naveedaitagi@gmail.com',
                        pass: 'naveeda@7777'
                    }
                });
                var mailOptions = {
                    from: 'naveedaitagi@gmail.com',
                    to: 'tanuja107@gmail.com',
                    subject: 'Sending Email Using Node-js',
                    text: `Please click the link to reset your password`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("info in send email ", info);
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                // var transporter = nodemailer.createTransport({
                //     Service: 'Gmail',
                //     // service:'Gmail',
                //     auth: {
                //         user: 'naveedaitagi@gmail.com',
                //         pass: 'naveeda@7777'
                //     }
                // });
                // var mailOptions = {
                //     from: 'naveedaitagi@gmail.com',
                //     to: 'tanuja107@gmail.com',
                //     subject: 'Sending Email Using Node-js',
                //     text: `Please click the link to reset your password`,
                // }
                // transporter.sendMail(mailOptions, function (error, info) {
                //     if (error) {
                //         console.log('error');
                //         return callback(error)
                //     }
                //     else {

                //         console.log("Email sent:", info.response);
                //         return callback(null, info.response);

                //         // return callback(null, 'An Email is Sent to your mail-id,Please Check');
                //     }
                // })

            }
        })

    },*/


    module.exports = userService;