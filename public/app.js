angular.module('app', ['facebook'])
  .config(function(FacebookProvider){
    // TODO: Change the api key
    FacebookProvider.init('1628148114141257');
  })

  .controller('authenticationCtrl', function($scope, Facebook){
    $scope.$watch(function() {
      // This is for convenience, to notify if Facebook is loaded and ready to go.
      return Facebook.isReady();
    }, function(newVal) {
      // You might want to use this to disable/show/hide buttons and else
      $scope.facebookReady = true;
    });

    $scope.login = function(){
      Facebook.login(function(response){
        console.log(response);
      })
    };

    $scope.getLoginStatus = function(){
      Facebook.getLoginStatus(function(response){
        console.log(response);

        if(response.status === 'connected'){
          $scope.isLoggedIn = true;
          $scope.me();
        } else {
          $scope.isLoggenIn = false;
        }
      });
    };

    $scope.me = function(){
      Facebook.api('/me', function(response){
        console.log(response);
        $scope.user = response;
        $scope.friendList();
      })
    };

    $scope.friendList = function(){
      var userId = $scope.user.id;
      Facebook.api('/friend-list-id', function(response){
        console.log(response);
      })
    }

    $scope.logout = function(){
      Facebook.logout(function(response) {
        console.log(response);
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.isLoggenIn = false;
        });
      });
    };

    $scope.getLoginStatus();

  })

  .directive('debug', function() {
		return {
			restrict:	'E',
			scope: {
				expression: '=val'
			},
			template:	'<pre>{{debug(expression)}}</pre>',
			link:	function(scope) {
				// pretty-prints
				scope.debug = function(exp) {
					return angular.toJson(exp, true);
				};
			}
		}
	})
