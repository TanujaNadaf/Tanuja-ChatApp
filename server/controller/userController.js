const userService = require('../service/userService');
module.exports.register = (req, resp) => {
    console.log("inside registercontroller");
    var user = {};
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.createpassword = req.body.createpassword;
    user.confirmpassword= req.body.confirmpassword;
    userService.register(user, function (err, result) {
        console.log("inside registerfunction ", result);

        if (err) {
            resp.status(400).send(err);
        }
        else {
            resp.status(200).send(result);
           
        }
    })
},
module.exports.login = (req, resp) => {
    console.log("inside logincontroller");
    var user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(user);
    userService.login(user, function (err, result) {
        if (err) {
            console.log('error n user cntrol login', err);
            resp.status(400).send(err);
        }
        else {
            console.log('result in user control login', result);
            resp.status(200).send(result);
        }
    })
}
/*module.exports.forgotPassword = (req, resp) => {
    console.log("inside forgotcontroller");
    var user = {};
    user.email = req.body.email;
    userService.forgotPassword(user, function (err, result) {
        if (err) {
            console.log('error n user cntrol forgot', err);
            resp.status(400).send(err);
        }
        else {
            console.log('result in user control forgot', result);
            resp.status(200).send(user);
        }
    })
}*/
