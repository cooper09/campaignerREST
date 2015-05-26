/* image-service.js - Object factory for images. Creates a image singleton to use as a camapaign globle for 
    the life of the session. 

    cooper s - october 2014
*/


angular.module('mainApp')
    .factory('imageFactory', ['$http', function($http) {

    	var imageFactory = {};

    		imageFactory.get = function() {
                console.log("lets get our images...");
    			return $http.get(endpoint() + 'image');
    		}

            imageFactory.getImage = function(imageId) {
                console.log("imageFactory.getImage: " + imageId);
                return $http.get(endpoint() + 'image/' + imageId );
            }

    		imageFactory.new = function(imageId) {   
                alert("imageFactory - new: " + imageId ); 			
            	return $http.post(endpoint() + 'image/' + imageId );
       		}

		    imageFactory.deleteItem = function(imageId) {
                console.log("imageFactory - delete: " , imageId );
            	return $http.delete(endpoint() + 'image/' + imageId );

        	}

            //cooper s - the only image data that can change is the label, the assigned images are uploaded independantly
             imageFactory.update =  function(image) {
                console.log("ImageFactory.update: ", image );
                var imageId = image.imageId;
                return $http.put(endpoint() + 'image/' + imageId, image, {} );
            }

		    return imageFactory;

    }]);