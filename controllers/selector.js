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

    //console.log('countryController- lets checkout our countries data: ', $scope.countries[0].country );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.countries.length ; i++) {
        countryArr.push({country: $scope.countries[i].country, value: i });
    //    countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].data.country });
    }
    
    var options = countryArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
    //    console.log("Country selected option: ", $scope.options );
//check to see if we have our campaign


}]);// End country Controller

//campaign image selector
selectControllers.controller('imageController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var imageArr = new Array();
    var imageIds = new Array();

    console.log('imageController- lets checkout our countries data: ', $scope.images );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.images.length ; i++) {
        imageArr.push({label: $scope.images[i].label, value: i });
    //    countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].data.country });
    }
    
    var options = imageArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
        console.log("Image selected option: ", $scope.options );
//check to see if we have our campaign

}]);// End image Controller

//campaign image selector
selectControllers.controller('videoController', ['$rootScope','$scope', function($rootScope, $scope) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var videoArr = new Array();
    var videoIds = new Array();

    console.log('videoController- lets checkout our videos data: ', $scope.videos[0].location );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.videos.length ; i++) {
        imageArr.push({country:$scope.videos[0].location, value: i });
    //    countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].data.country });
    }
    
    var options = videoArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
        console.log("Videos selected option: ", $scope.options );
//check to see if we have our campaign

}]);// End image Controller
