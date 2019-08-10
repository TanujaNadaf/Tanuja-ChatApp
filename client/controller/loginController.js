app.controller('loginCtrl', function ($scope, loginService,$location) {
    console.log("in logincontroller");

    $scope.submit = function () {
        console.log('in submit');
        var loginData = {
            email: $scope.user.email,
            password: $scope.user.password
        }
        console.log('login data',loginData);
        loginService.login(loginData, (err, result) => {
            if (err) {
                console.log('error in login controller',err);
            } else {
                console.log('data in login controller', result);
                $location.path('/dashboard'); 
                
            }
            
        });
        
    }
});