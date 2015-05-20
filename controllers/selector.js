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

    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.countries.length ; i++) {
       countryArr.push({country: $scope.countries[i].country, value: i });
       countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].country });
    }
    
    var options = countryArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
//check to see if we have our campaign

    for ( var i=0 ; i <  $scope.countries.length ; i++) {
        if (countryArr[i].country == $scope.country ) {
            $scope.selectedOption = i;
        }
    }


    //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("countryController - selection: " + $scope.selectedOption);
                    
                    var country = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
                    for ( var i=0 ; i <  countryArr.length ; i++) {
                        if ( country ==  i) {
                            console.log("countryController - sending country: " + countryIds[i].country );
                            $scope.country  = countryIds[i].country;
                        } //end if          
                    }//end for loop.. 

                });//end watch selectedOption 
           

}]);// End country Controller

//campaign image selector
selectControllers.controller('imageController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var imageArr = new Array();
    var imageIds = new Array();

    console.log('imageController- lets checkout our image data: ', $scope.image );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.images.length ; i++) {
        imageArr.push({label: $scope.images[i].label, location:$scope.images[i].location , value: i });
    }
    
    var options = imageArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
        console.log("Image selected option: ", $scope.options );
//check to see if we have our campaign
    for ( var i=0 ; i <  $scope.images.length ; i++) {
        if (imageArr[i].location == $scope.image ) {
            $scope.selectedOption = i;
        }
    }
    
  $scope.$watch('selectedOption', function(newValue, oldValue) {
    // handle selection change ...
    
        var image = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
            for ( var i=0 ; i <  imageArr.length ; i++) {
                        if ( image ==  i) {
                            $scope.image  =  imageArr[i].label;
                        } //end if          
                    }//end for loop..

    });//end watch selectedOption 

}]);// End image Controller

//campaign video selector
selectControllers.controller('videoController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var videoArr = new Array();
    var videoIds = new Array();

    console.log('videoController- lets checkout our videos data: '+ $scope.video  );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.videos.length ; i++) {
        videoArr.push({label:$scope.videos[i].label, location:$scope.videos[i].location , value: i });
    }
    var options = videoArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
//check to see if we have our campaign
     for ( var i=0 ; i <  $scope.videos.length ; i++) {
        
        if (videoArr[i].location == $scope.video ) {
            console.log("Set video selector to: " + $scope.campaign.video );
            $scope.selectedOption = i;
        }
    }//end for loop


  $scope.$watch('selectedOption', function(newValue, oldValue) {
    // handle selection change ...
        console.log("videoController - selection: " + $scope.selectedOption);
                    
        var video = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
            for ( var i=0 ; i <  videoArr.length ; i++) {
                        if ( video ==  i) {
                            $scope.video  =  videoArr[i].label;
                        } //end if          
                    }//end for loop..

    });//end watch selectedOption 

}]);// End Video Controller
