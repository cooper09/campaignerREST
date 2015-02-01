angular.module('mainApp')
    .factory('dataFactory', ['$http', function($http) {

    	var dataFactory = {};

    		dataFactory.get = function() {
                return $http.get('http://claimit-development.elasticbeanstalk.com/campaign');
    		}

    		dataFactory.new = function(campaignId) {
    			alert("new campaign: " + campaignId );
            	//$http.post('http://claimit-development.elasticbeanstalk.com/campaign/' + campaignId );
       		}

		    dataFactory.delete = function(campaignId) {
            	$http.delete('http://claimit-development.elasticbeanstalk.com/campaign/' + campaignId );
        	}

		    dataFactory.update =  function(campaignId) {
            	$http.put('http://claimit-development.elasticbeanstalk.com/campaign/' + campaignId, this);
        	}

		    return dataFactory;

    }]);