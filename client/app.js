var app = angular.module("ChatApp", ["ui.router"]);
app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state("login", {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })
        .state("register", {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerCtrl'
        })
       .state("forgotPassword", {
           url:'/forgotPassword',
           templateUrl:'templates/forgotPassword.html',
           controller:'forgotCtrl'
       })
       .state("dashboard",{
           url:'/dashboard',
           templateUrl:'templates/dashboard1.html',
           controller:'dashboardCtrl'
           })
    
       
});
//var socket=io.connect('http://localhost:3000');

// var socket=new io.socket();
// socket.connect('http://localhost:3000');
// socket.on('connect',function(){
//     console.log('client has connected to the server!');
// })



