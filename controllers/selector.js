var selectControllers = angular.module('selectControllers', []);
	
// cooper s - simple selector with watcher. Since Angular is browser dependent each view will load
//      asynchronously. I'm usig a  base $broadcast/$on system to tell me when all the data is 
//      is available for use, in this case the actual campaigns as they are created and upadate. 
//      Once the data is in place, the form elements can be completed.
//


    //cooper s - rootScope.campaignId be set whevever the campaign factory loads a new campaign. 
    //  we then use this to determine where to find the country, image and video of each campaign 
    //  and update the appropriate selector items for 
    // display.
    //
    //  may 2015

var campaignArr = new Array();
var newCampaign;


selectControllers.controller('segmentController', ['$rootScope','$scope', function($rootScope, $scope ) {
   console.log("segmentController - getting our selector prepped");
   

    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var segmentArr = new Array();

    $scope.segments = [{
          id: 1,
          label: 'sports',
          subItem: { country: 'USA' }
        }, {
          id: 2,
          label: 'luxury goods',
          subItem: { country: 'GBR' }
      },  {
          id: 3,
          label: 'womans health',
          subItem: { country: 'JPN' }
        }];


     var campaignIdx = $rootScope.campaignId;  //offset by 1 since javascript arrays begin indexing at 0

        if ( isNaN(campaignIdx) ) {
            newCampaign = true;
            campaignIdx = 0;
            $scope.selectedOption =  $scope.segments[0];
        } 

          campaignArr = $scope.campaigns;

    console.log("segmentController - campaigns: " + campaignArr  );

    for ( var i=0 ; i <  campaignArr.length ; i++) {
      if ( campaignArr[i].campaignId == campaignIdx ) {
            for ( j=0; j < $scope.segments.length ; j++ ) {
              if ( $scope.segments[j].label == campaignArr[i].segment) {
                     $scope.selectedOption =  $scope.segments[j];
              };//end inner if*/
          }//end for 
        }//end iff 
    }//end outer for

    console.log("segmentController - current segment: " , $scope.selectedOption);
    //$scope.selectedOption =  $scope.segments[0]; //$rootScope.currentSegment;

    //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("segmentController - selection: " , $scope.selectedOption );
                    
                    $scope.segment = $scope.selectedOption.label;
                    $rootScope.segment = $scope.selectedOption.label;
                    //set current campaigns tier3 msp to new selection
                    console.log("selectController - current segment: " + $scope.segment );
                });//end watch selectedOption   */
    
}]);// End segment Controller

selectControllers.controller('countryController', ['$rootScope','$scope', function($rootScope, $scope ) {
   
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var countryArr = new Array();
    var countryIds = new Array();

    
    var campaignIdx = $rootScope.campaignId - 1;  //offset by 1 since javascript arrays begin indexing at 0

    if ( isNaN(campaignIdx) ) {
        newCampaign = true;
        campaignIdx = 0;
    }

    campaignArr = $scope.campaigns;

    for ( var i=0 ; i <  $scope.countries.length ; i++) {
       countryArr.push({country: $scope.countries[i].country, value: i });
       countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].country });
    }
    
    var options = countryArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
//check to see if we have our campaign
    if ( newCampaign ) {
         $scope.selectedOption = 0;     
         $rootScope.country = countryArr[0].country;
    } else {
       for ( var i=0 ; i <  $scope.countries.length ; i++) {
            if (countryArr[i].country == campaignArr[campaignIdx].country ) {
                $scope.selectedOption = i;
                $rootScope.country = countryArr[i].country;
            }
        }  
    }//end if
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
                            $rootScope.country = countryIds[i].country;
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

    //create an array of option objects { name, value } pairs 
    var campaignIdx = $rootScope.campaignId - 1;

    campaignArr = $scope.campaigns;
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
if ( newCampaign ) {
     $scope.selectedOption = 0;     
     $rootScope.image = imageArr[0].location;
} else {
    for ( var i=0 ; i <  $scope.images.length ; i++) {
        if (imageArr[i].location == campaignArr[campaignIdx].image ) {
            $scope.selectedOption = i;
            $rootScope.image = imageArr[i].location;
        }
    }
}//end if

  $scope.$watch('selectedOption', function(newValue, oldValue) {
    // handle selection change ...
    
        var image = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
            for ( var i=0 ; i <  imageArr.length ; i++) {
                        if ( image ==  i) {
                            $scope.image  =  imageArr[i].label;
                            $rootScope.image = imageArr[i].location;
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

    //create an array of option objects { name, value } pairs 
    var campaignIdx = $rootScope.campaignId - 1;

    campaignArr = $scope.campaigns;
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.videos.length ; i++) {
        videoArr.push({label:$scope.videos[i].label, location:$scope.videos[i].location , value: i });
    }
    var options = videoArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
    if ( newCampaign ) {
             $scope.selectedOption = 0;
             $rootScope.video = videoArr[0].location;
        } else {
             for ( var i=0 ; i <  $scope.videos.length ; i++) {
                
                if (videoArr[i].location == campaignArr[campaignIdx].video ) {
                    $scope.selectedOption = i;
                    $rootScope.video = videoArr[i].location;
                }
            }//end for loop
        }//end if 

  $scope.$watch('selectedOption', function(newValue, oldValue) {
    // handle selection change ...
        console.log("videoController - selection: " + $scope.selectedOption);
                    
        var video = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
            for ( var i=0 ; i <  videoArr.length ; i++) {
                        if ( video ==  i) {
                            $scope.video  =  videoArr[i].label;
                            $rootScope.video = videoArr[i].location;
                        } //end if          
                    }//end for loop..
        });//end watch selectedOption 

}]);// End Video Controller
