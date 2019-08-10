app.service('loginService', function ($http) {
  console.log('inside loginservice');
  this.login = (object, callback) => {
    console.log('data in user login service',object);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: object
    }).then(function successCallback(response) {
      console.log('response in user login service ', response);
      return callback(null, response)
    }, function errorCallback(err) {
      console.log('error in user service', err);

      return callback(err);
    });
  }
  
}),
app.service('registerService', function ($http) {
  this.register = (object,callback) => {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/register',
      data: object
    }).then(function successCallback(response) {
      console.log('response in user register service ', response);
      return callback(null, response)
    }, function errorCallback(err) {
      console.log('error in user register service', err);

      return callback(err);

    });
  }
}),

app.service('passwordService', function ($http) {
  console.log('in passwordService');
  this.send = (object,callback) => {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/forgotPassword',
      data: object
    }).then(function successCallback(response) {
      console.log('response in user register service ', response);
      return callback(null, response)
    }, function errorCallback(err) {
      console.log('error in user register service', err);

      return callback(err);

    });
  }
})
      
/*app.service('socketService', function ($http) {
  console.log('in socketService');
  this.send = (object,callback) => {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/forgotPassword',
      data: object
    }).then(function successCallback(response) {
      console.log('response in user register service ', response);
      return callback(null, response)
    }, function errorCallback(err) {
      console.log('error in user register service', err);

      return callback(err);

    });
  }
})*/
/*app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
  return socketFactory({
      ioSocket: io.connect('http://localhost:3000')
  });
}]);*/
/*app.service('socketService',(err,res)=>{
  var socket=io.connect('http://localhost:3000');
  //var socket=new io.socket();
  //socket.connect('http://localhost:3000');
  socket.on('connect',function(){
  console.log('client has connected to the server!');
  })
})*/
app.service('chatService',function($http){
  console.log('in socketservice');
  var socket=io.connect('http://localhost:3000');

  this.send=(object,callback)=>{
    console.log("in send function");
    socket.emit('chat',{
      object
    })
  socket.on('chat',function(message){
    console.log("message is",message);
    return callback(null,message);
  })
   
}
  
})
  