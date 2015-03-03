angular.module('mainApp')
    .factory('legalFactory', ['$http', function($http) {

    	var legalFactory = {};

    		legalFactory.get = function() {
    			//return $http.get('http://claimit-development.elasticbeanstalk.com/campaign');
                return $http.get(endpoint()+'legal');
    		}

    		legalFactory.new = function(legalId) {
    			alert("new campaign: " + legalId );
            	//$http.post('http://claimit-development.elasticbeanstalk.com/campaign/' + campaignId );
       		}

		    legalFactory.delete = function(legalId) {
            	$http.delete('http://claimit-development.elasticbeanstalk.com/campaign/' + legalId );
        	}

		    legalFactory.update =  function(legalId) {
            	$http.put('http://claimit-development.elasticbeanstalk.com/campaign/' + legalId, this);
        	}

		    return legalFactory;

    }]);