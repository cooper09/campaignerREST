/* campaign-service.js - Object factory for campaigns. Creates a Campaign singleton to use as a camapaign globle for 
    the life of the session. 

    cooper s - october 2014
*/


angular.module('mainApp').factory('campaignFactory', ['$http', function($http) {
	var campaignFactory = {};

	campaignFactory.get = function() {
		console.log("getting data");
		return $http.get(endpoint()+'campaign');
		//return $http.get('http://default-environment-nm5p9qwapp.elasticbeanstalk.com/');
	}

	campaignFactory.getCampaign = function(campaignId) {
		console.log('getCampaign: ' + campaignId );
		return $http.get(endpoint()+'campaign/' + campaignId );
	}
	
	campaignFactory.new = function(campaignId) {
		return $http.post(endpoint()+'campaign/' + campaignId );
	}
	
	campaignFactory.delete = function(campaignId) {
		return $http.delete(endpoint()+'campaign/' + campaignId );
	}

	campaignFactory.update =  function(campaign) {
		// cooper s - collec all the current campaign data for the update
		console.log("campaignFactory.update title: " , campaign.title );
		var campaignId = campaign.campaignId.toString();
	
		return $http.post(endpoint()+'campaign/' + campaignId, campaign, {} );
	}
	
	campaignFactory.getCities =  function() {
		return $http.get(endpoint()+'/city');
	}

	campaignFactory.getMSPs =  function() {
		return $http.get(endpoint()+'/msp');
	}

	return campaignFactory;

}]);