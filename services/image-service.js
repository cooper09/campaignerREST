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
                alert("imageFactory.getImage: " + imageId);
                return $http.get(endpoint() + 'image/' + imageId );
            }

    		imageFactory.new = function(imageId) {   
                alert("imageFactory - new: " + imageId ); 			
            	return $http.post(endpoint() + 'images/' + imageId );
       		}

		    imageFactory.deleteItem = function(imageId) {
                console.log("imageFactory - delete: " , imageId );
            	return $http.get(endpoint() + 'delete_image.php?id=' + imageId );

        	}

		    imageFactory.upload =  function(imageId) {
                // cooper s - collec all the current image data for the update
                console.log("imageFactory - uploading image: " , imageId );
                //var imageName = "testimage1";

            	return $http.post(endpoint() + imageId + "/detail");
        	}

            //cooper s - the only image data that can change is the label, the assigned images are uploaded independantly
             imageFactory.update =  function(imageId, image) {
                // cooper s - collec all the current campaign data for the update
                console.log("ImageFactory.update: ", image.data );

                return $http.post(endpoint() + 'image/' + imageId + '/' + image.data.label , image.data, {} );
            }

		    return imageFactory;

    }]);