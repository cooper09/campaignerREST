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
            	return $http.delete(endpoint() + 'video/' + videoId );

        	}

            //cooper s - the only video data that can change is the label, the assigned videos are uploaded independantly
            /* videoFactory.update =  function(videoId, video) {
                // cooper s - collec all the current campaign data for the update
                console.log("videoFactory.update: ", video );

                return $http.put(endpoint() + 'video/' + videoId + '/' + video.data, {} );
            }
        */
            videoFactory.update =  function(video) {
                console.log("VideoFactory.update: ", video );
                var videoId = video.videoId;
                 console.log("VideoFactory.update id: ", videoId );
                return $http.put(endpoint() + 'video/' + videoId, video, {} );
            }

		    return videoFactory;

    }]);