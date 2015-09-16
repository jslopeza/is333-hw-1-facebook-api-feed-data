angular.module('app', ['facebook'])
  .config(function(FacebookProvider){
    // TODO: Change the api key
    FacebookProvider.init('1628148114141257');
  })
