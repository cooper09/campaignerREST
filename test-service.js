angular.module('mainApp')
    .factory('testFactory', [ '$rootScope','$http', '$filter', function($rootScope, $http, $filter) {

    	var testFactory = {};

    		testFactory.getDate = function() {
    			alert("Get our current Date...");
                $rootScope.currentDate = new Date();
    			return new Date();
    		}

    		testFactory.setDate = function(cdate) {
    			console.log("testFactory - new date: ", cdate );
                $rootScope.currentDate = cdate;
       		}

		    return testFactory;

    }]);