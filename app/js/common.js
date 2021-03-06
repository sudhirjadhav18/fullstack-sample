
var fullStackApp = angular.module("fullStackApp", ["ui.router"])


fullStackApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
  
  	var loginState = {
    	name: 'login',
    	url: '/',
    	templateUrl: "templates/login.html",
		  controller: "loginController"
  	}

  	var homeState = {
    	name: 'home',
    	url: '/home',
    	templateUrl: "templates/home.html",
		  controller: "homeController"
  	}

  	var signUpState = {
    	name: 'signup',
    	url: '/signup',
    	templateUrl: "templates/signup.html",
		  controller: "signUpController"
  	}

  	var productState = {
    	name: 'product',
    	url: '/product/:id',
    	templateUrl: "templates/product.html",
		  controller: "productController"
  	}

  	$urlMatcherFactoryProvider.caseInsensitive(true);
  	
  	$stateProvider.state(loginState);
  	$stateProvider.state(homeState);
  	$stateProvider.state(signUpState);
  	$stateProvider.state(productState);

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

})

fullStackApp.run(['$rootScope', 'sharedProperties', '$state', function ($rootScope, sharedProperties, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {

    	if(sharedProperties.isLoggedIn()) {
    		if(toState.name == "login") {
    			event.preventDefault();
            	$state.go('home');
        	}    		
    	}
    	else {
    		if(toState.name != "login" && toState.name != "signup") {
    			event.preventDefault();
            	$state.go('login');
        	} 
    	}
        
    });
}]);

fullStackApp.service("sharedProperties", function() {
	var STORAGE_LOGIN_ID = "APP_LoggedInUserID";
  var infoBoxMessage = "";

	return {
		getLoggedInUser: function() {
			return sessionStorage.getItem(STORAGE_LOGIN_ID);
		},
		setLoggedInUser: function(userId) {
			sessionStorage.setItem(STORAGE_LOGIN_ID, userId);
		},
		isLoggedIn: function() {
			return sessionStorage.getItem(STORAGE_LOGIN_ID) && sessionStorage.getItem(STORAGE_LOGIN_ID) != 0;
		},
		logoutUser: function() {
			sessionStorage.setItem(STORAGE_LOGIN_ID, 0);
		},
    setInfoBox: function(message) {
      infoBoxMessage = message;
    },
    getInfoBox: function() {
      var _return = infoBoxMessage;
      infoBoxMessage = ""; // clean an return
      return _return;
    }
	};
});


fullStackApp.controller("indexController", function($scope) {
	$scope.angularHeader = "Your angular app is running !!!";
});


