/* -service.js - Object factory for countrys. Creates a country singleton to use as a camapaign globle for 
    the life of the session. 

    cooper s - february 2015
*/

angular.module('mainApp')
    .factory('countryFactory', ['$http', function($http) {

    	var countryFactory = {};

    		countryFactory.get = function() {
               // return $http.get(endpoint()+'get_countries_data.php');
               return $http.get( endpoint()+'country');
                //ndpoint();
    		}

            countryFactory.getCountry = function(countryId) {
                return $http.get(endpoint()+'country/' + countryId );
            }

    		countryFactory.new = function(countryId) {
    			
            	return $http.post(endpoint()+'country/' + countryId );
       		}

		    countryFactory.delete = function(countryId) {
            	return $http.delete(endpoint()+'country/' + countryId );

        	}

		    countryFactory.update =  function(countryId, country) {
                // cooper s - collect all the current country data for the update
                console.log("countryFactory update: ", country );
                var dataObject = {
                    title: country.title
                };

            	return $http.put(endpoint()+'/country/' + countryId, dataObject, {} );
        	}

		    return countryFactory;

    }]);