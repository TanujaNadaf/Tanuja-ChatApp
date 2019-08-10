app.controller('registerCtrl', function ($scope, registerService, $location) {
    console.log("in reg controller");
    $scope.submit = function () {
        console.log('in submit');
        var registerData = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            createpassword: $scope.user.password,
            confirmpassword: $scope.user.confirmpassword
        }
        console.log(registerData);
        registerService.register(registerData, (err, result) => {
            if (err) {
                console.log('error in register controller', err);
            } else {
                console.log('result in register controller', result);
            }
        });


        if ($scope.registerForm.$valid) {
            console.log("sending request to browser");
        }

    }
});
app.controller('forgotCtrl', function ($scope, passwordService, $location) {
    console.log('in forgotcontroller');
    $scope.submit = function () {
        console.log('in submit');
        var data = {
            email: $scope.user.email
        }
        console.log(data);
        passwordService.send(data, (err, result) => {
            if (err) {
                console.log('error in password controller', err);
            } else {
                console.log('result in password controller', result);
            }
        });
    }
});
app.controller('dashboardCtrl', function ($scope,chatService,$location) {
    console.log('in dashboardcontroller 11');
    /*
    $scope.message = {};
    SocketService.emit('room', { roomId: "temp" });
    $scope.ReciverName="";
    $scope.chatHistory=[];
    
        $scope.chatHistory=[{"message":"hello"},"hi","good","bad"]
    }*/
    //$scope.array = [];
    //$scope.message = {};
    $scope.openContacts=function(contactName) {
    $scope.ReciverName=contactName;
    }
    $scope.submit = function () {
        console.log('in submit');
        $scope.array = [];
        var messageObj = {
            message: $scope.user.message
        }
        console.log("message is", messageObj);
        chatService.send(messageObj,(err,result)=>{
            if (err) {
                console.log('error in chat controller', err);
            } else {
                console.log('result in chat controller', result);
                $scope.array.push(result);
                //console.log(array);
                 
            }
        })
        // $scope.array.push({ data: $scope.messageObj, date: new Date() })
    }

    /*socketService.on('message', function (msg) {
        $scope.array.push(msg)
    });*/

    })

