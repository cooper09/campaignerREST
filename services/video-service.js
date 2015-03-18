/* video-service.js - Object factory for videos. Creates a video singleton to use as a camapaign globle for 
    the life of the session. 

    cooper s - october 2014
*/


angular.module('mainApp')
    .factory('videoFactory', ['$http', function($http) {

    	var videoFactory = {};

    		videoFactory.get = function() {
                console.log("lets get our videos...");
    			return $http.get(endpoint() + 'video');
    		}

            videoFactory.getVideo = function(videoId) {
                console.log("videoFactory.getvideo: " + videoId);
                return $http.get(endpoint() + 'video/' + videoId );
            }

    		videoFactory.new = function(videoId) {   
                alert("videoFactory - new: " + videoId ); 			
            	return $http.post(endpoint() + 'videos/' + videoId );
       		}

		    videoFactory.deleteItem = function(videoId) {
                console.log("videoFactory - delete: " , videoId );
            	return $http.get(endpoint() + 'delete_video.php?id=' + videoId );

        	}

		    videoFactory.upload =  function(videoId) {
                // cooper s - collec all the current video data for the update
                console.log("videoFactory - uploading video: " , videoId );
                //var videoName = "testvideo1";

            	return $http.post(endpoint() + videoId + "/detail");
        	}

            //cooper s - the only video data that can change is the label, the assigned videos are uploaded independantly
             videoFactory.update =  function(videoId, video) {
                // cooper s - collec all the current campaign data for the update
                console.log("videoFactory.update: ", video.data );

                return $http.post(endpoint() + 'video/' + videoId + '/' + video.data.label , video.data, {} );
            }

		    return videoFactory;

    }]);