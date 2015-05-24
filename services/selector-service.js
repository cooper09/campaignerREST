/* selector-service.js - Object factory for keeping of each campaigns current select items

    cooper s - may 2015
*/


angular.module('mainApp')
    .factory('selectorFactory', ['$http', function($http) {

    	var selectorFactory = {};

            var  campaignCountry;
            var  campaignImage;
            var  campaignVideo;

            selectorFactory.setCountry = function(campaignId, currentCountry ) {
                console.log("selectFactory.setCountry - lets set our country: " + currentCountry + " for campaign: " + campaignId );
                campaignCountry = currentCountry;
                return campaignCountry;
            }

            selectorFactory.setImage = function() {
                console.log("lets set our image");
                //return $http.get(endpoint() + 'video/' + videoId );
            }

            selectorFactory.setVideo = function() {
                console.log("lets set our video");
                //return $http.get(endpoint() + 'video/' + videoId );
            }
    		selectorFactory.getCountry = function(campaignId ) {
                console.log("selectorFactory.getcountry: for campaign: " + campaignId );
    			//alert("selectorFactory.getCountry - current list of campaigns to check: " + $rootScope.campaigns );
                return campaignCountry;
    		}

            selectorFactory.getImage = function() {
                console.log("lets get our image");
               //return $http.get(endpoint() + 'video/' + videoId );
            }

            selectorFactory.getVideo = function() {
                console.log("lets get our video");
                //return $http.get(endpoint() + 'video/' + videoId );
            }
    		
		    return selectorFactory;

    }]);