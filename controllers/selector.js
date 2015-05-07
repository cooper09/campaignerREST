var selectControllers = angular.module('selectControllers', []);
	
// cooper s - simple selector with watcher. Since Angular is browser dependent each view will load
//      asynchronously. I'm usig a  base $broadcast/$on system to tell me when all the data is 
//      is available for use, in this case the actual campaigns as they are created and upadate. 
//      Once the data is in place, the form elements can be completed.
//

selectControllers.controller('countryController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var countryArr = new Array();
    var countryIds = new Array();

    $scope.$on('campaign-loaded', function(event, args) {
        alert("Country Selector - campaign loaded: " + args + " event: ",  event );
  

    for ( var i=0 ; i <  $scope.countries.length ; i++) {
       countryArr.push({country: $scope.countries[i].country, value: i + 1 });
       countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].country });
    }
    
    var options = countryArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 


    //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("countryController - selection: " + $rootScope.country );
                    
                    var country = $scope.campaign.country;
                    //set current campaigns tier3 msp to new selection
                     for ( var i=0 ; i <  countryArr.length ; i++) {
                        if ( country ==  countryArr[i].country ) {
                            //alert("countryController - sending country: " + countryArr[i].value );
                            $scope.selectedOption = countryArr[i].value;
                        } //end if          
                    }//end for loop..  

                });//end watch selectedOption   

    /*    $scope.$on('campaign-loaded', function(event, args) {
            console.log("Country Selector - campaign loaded: " , args + " load event: ", event );
        });//end scope on campaign */

       });//end scope on campaign */
       
}]);// End country Controller

//campaign image selector
selectControllers.controller('imageController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var imageArr = new Array();
    var imageIds = new Array();

    console.log('imageController- lets checkout our image data: ', $scope.images );
    //create an array of option objects { name, value } pairs 

            for ( var i=0 ; i <  $scope.images.length ; i++) {
                imageArr.push({label: $scope.images[i].label, location:$scope.images[i].location , value: i+1 });
            //    countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].data.country });
            }
            
            var options = imageArr;
            // make sure the selector get the final options
                $scope.options = options;
                $scope.selectedOption = 0; 

      $scope.$on('campaign-loaded', function(event, args) {
            console.log("Image Selector - campaign loaded: " , args + " load event: ", event );
       
      
          $scope.$watch('selectedOption', function(newValue, oldValue) {
            // handle selection change ...
                console.log("imagecontroller - selection: " + $scope.campaign.image );
                            
                var image = $scope.campaign.image;

                //set image selector to selected image
                    for ( var i=0 ; i <  imageArr.length ; i++) {
                                if ( image ==  imageArr[i].location ) {
                                   $scope.selectedOption = imageArr[i].value;
                                } //end if          
                            }//end for loop..

                        });//end watch selectedOption 
         });//end scope on campaign */
}]);// End image Controller

//campaign image selector
selectControllers.controller('videoController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var videoArr = new Array();
    var videoIds = new Array();

    console.log('videoController- lets checkout our videos data: ', $scope.videos );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.videos.length ; i++) {
        videoArr.push({label:$scope.videos[i].label, location:$scope.videos[i].location , value: i+1 });
    //    countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].data.country });
    }
    var options = videoArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 

$scope.$on('campaign-loaded', function(event, args) {
            console.log("Video Selector - campaign loaded: " , args + " load event: ", event );

  $scope.$watch('selectedOption', function(newValue, oldValue) {
    // handle selection change ...
        console.log("videoController - selection: " + $scope.campaign.video);
                    
        var video = $scope.campaign.video;
                    //set current campaigns tier3 msp to new selection
            for ( var i=0 ; i <  videoArr.length ; i++) {
                        if ( videoArr[i].location  ==  video ) {
                            alert("video selection " + videoArr[i].value )
                            $scope.selectedOption = videoArr[i].value;
                        } //end if          
                    }//end for loop..

                });//end watch selectedOption 

   });//end scope on campaign */
}]);// End Video Controller
