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

    console.log('countryController- lets checkout our countries data: ', $scope.countries[0].country );
    //create an array of option objects { name, value } pairs 

    for ( var i=0 ; i <  $scope.countries.length ; i++) {
        countryArr.push({country: $scope.countries[i].country, value: i });
    //    countryIds.push({countryId: $scope.countries[i].countryId, country: $scope.countries[i].data.country });
    }
      
    //console.log('simpleController - new mspId array: ' + mspId );
    
    var options = countryArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 
        console.log("Country selected option: ", $scope.options );
//check to see if we have our campaign

   $scope.$on('campaign-loaded', function(event, args) {
        console.log('countryController - campaign loaded!!! ');

         console.log('countryController  - current campaign: ', $scope.campaign );
            // display selected option

  /*&       
                var current = $scope.campaign.tier1MSP.msp;
                    for ( var i=0 ; i <  mspIds.length ; i++) {
                    if ( current ==  mspIds[i].mspId) {
                        console.log("selectController - matched msp: " + mspIds[i].name );
                        $scope.selectedOption = i;
                    } //end if          
               
            //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("simpleController - selection: " + $scope.selectedOption);
                    $scope.logentries.push(($scope.logentries.length + 1) + " - selection: " + $scope.selectedOption);
                    
                    var msp1 = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
                     for ( var i=0 ; i <  mspArr.length ; i++) {
                        if ( msp1 ==  i) {
                            console.log("simpleController - sending khalid msp: " + mspIds[i].mspId );
                            $scope.campaign.tier1MSP.msp  = mspIds[i].mspId;
                        } //end if          
                    }//end for loop..
                });//end watch selectedOption
*/
          //make sure options show up on update as well
          $scope.options = options;
   });//end scope on campaign
}]);// End simple Controller

//Campaign Controller for Tier2
selectControllers.controller('simpleController2', ['$rootScope','$scope','dataFactory', function($rootScope, $scope, dataFactory) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var mspArr = new Array();
    var mspIds = new Array();

    //create an array of option objects { name, value } pairs 
    for ( var i=0 ; i <  $scope.mspData.msps.length ; i++) {
        mspArr.push({name: $scope.mspData.msps[i].data.title, value: i });
        mspIds.push({mspId: $scope.mspData.msps[i].data.mspId, name: $scope.mspData.msps[i].data.name });
    }

    var options = mspArr;

    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 


//check to see if we have our campaign

   $scope.$on('campaign-loaded', function(event, args) {
        console.log('simpleController2 - campaign loaded!!! ');
   
        if ( $scope.campaign.tier2MSP.msp == null ) {
            $scope.campaign.tier2MSP.msp = "default";
        }

         console.log('simpleController2  - current campaign: ', $scope.campaign.tier2MSP.msp );
      
            // display selected option

            if ($scope.campaign.tier2MSP.msp == 'default') {    
                $scope.selectedOption = 0;
            } else {
                console.log("These are the timesL " + $scope.campaign.tier2MSP.msp )
                var current = $scope.campaign.tier2MSP.msp
                for ( var i=0 ; i <  mspIds.length ; i++) {
                    if ( current ==  mspIds[i].mspId) {
                        console.log("selectController2 - matched msp: " + mspIds[i].name );
                        $scope.selectedOption = i;
                    } //end if          
                }//end for loop
            }//end if else 

            //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("simpleController2 - selection: " + $scope.selectedOption);
                    $scope.logentries.push(($scope.logentries.length + 1) + " - selection: " + $scope.selectedOption);
                    
                    var msp2 = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
                     for ( var i=0 ; i <  mspArr.length ; i++) {
                        if ( msp2 ==  i) {
                            console.log("simpleController - sending khalid msp: " + mspIds[i].mspId );
                            $scope.campaign.tier2MSP.msp  = mspIds[i].mspId;
                        } //end if          
                    }//end for loop..
                });//end watch selectedOption

          //make sure options show up on update as well
          $scope.options = options;
   });//end scope on campaign
}]);// End simple Controller2

//Campaign Controller for Tier3
selectControllers.controller('simpleController3', ['$rootScope','$scope','dataFactory', function($rootScope, $scope, dataFactory) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var mspArr = new Array();
    var mspIds = new Array();

    //create an array of option objects { name, value } pairs 
    for ( var i=0 ; i <  $scope.mspData.msps.length ; i++) {
        mspArr.push({name: $scope.mspData.msps[i].data.title, value: i });
        mspIds.push({mspId: $scope.mspData.msps[i].data.mspId, name: $scope.mspData.msps[i].data.name });
    }

    var options = mspArr;

    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 


//check to see if we have our campaign

   $scope.$on('campaign-loaded', function(event, args) {
        console.log('simpleController3 - campaign loaded!!! ');
   
        if ( $scope.campaign.tier3MSP.msp == null ) {
            $scope.campaign.tier3MSP.msp = "default";
        }

         console.log('simpleController3  - current campaign: ', $scope.campaign.tier3MSP.msp );
      
            // display selected option

            if ($scope.campaign.tier3MSP.msp == 'default') {    
                $scope.selectedOption = 0;
            } else {
                var current = $scope.campaign.tier3MSP.msp;
               
                 for ( var i=0 ; i <  mspIds.length ; i++) {
                    if ( current ==  mspIds[i].mspId) {
                        console.log("selectController3 - matched msp: " + mspIds[i].name );
                        $scope.selectedOption = i;
                    } //end if          
                }//end for loop
        
            }//end if else 

            //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("simpleController3 - selection: " + $scope.selectedOption);
                    
                    var msp3 = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
                     for ( var i=0 ; i <  mspArr.length ; i++) {
                        if ( msp3 ==  i) {
                            console.log("simpleController - sending khalid msp: " + mspIds[i].mspId );
                            $scope.campaign.tier3MSP.msp  = mspIds[i].mspId;
                        } //end if          
                    }//end for loop..

                });//end watch selectedOption 
           

          //make sure options show up on update as well
          $scope.options = options;
   });//end scope on campaign
}]);// End simple Controller3


// cooper s - image selector controller 
selectControllers.controller('imageController', ['$rootScope','$scope','dataFactory', function($rootScope, $scope, dataFactory) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var imgArr = new Array();
    var imgIds = new Array();

    console.log("imageController - current MSP: " , $scope.mspData );
    console.log("imageController - images available: ", $scope.imageData.images );

    //create an array of option objects { name, value } pairs 
    for ( var i=0 ; i <  $scope.imageData.images.length ; i++) {
        imgArr.push({name: $scope.imageData.images[i].data.label, value: i });
    }

    for ( var i=0 ; i <  $scope.imageData.images.length ; i++) {
        imgIds[i] = $scope.imageData.images[i].data.imageId;
    }

    var selectedImg;

    console.log('imageController doing its thing: ', imgArr );
    var options = imgArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 


//check to see if we have our campaign

   $scope.$on('msp-loaded', function(event, args) {
            // wait until we have our MSP loaded and ready then fill in the form
          
            if ($scope.msp.imageId == 'default') { 
               console.log('imageController - target msp imageid: ', $scope.msp.imageId );  
                $scope.selectedOption = 0;
            } else {
              for ( var i=0 ; i <  $scope.imageData.images.length ; i++) {
                    //if ( $scope.msp.imageId == $scope.imageData.images[i].data.label) {
                    if ( $scope.msp.imageId == $scope.imageData.images[i].data.imageId) {
                        $scope.selectedOption = i;
                    } //end if          
                }//end for loop
            }//end if else  

           //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("imageController - selection: " + $scope.selectedOption);
                    
               
                    var img = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
                     for ( var i=0 ; i <  imgIds.length ; i++) {
                        if ( img ==  i) {
                            console.log("imageController - match our image: ", imgIds[i]);
                            $scope.msp.imageId = imgIds[i];
                            console.log("Our selected image: " + imgArr[i].name );
                        } //end if          
                    }//end for loop...
                });//end watch selectedOption
          
   });//end scope on campaign 
}]);// End image Controller

// cooper s - image selector controller 
selectControllers.controller('legalController', ['$rootScope','$scope','dataFactory', function($rootScope, $scope, dataFactory) {
    $scope.selectedOption = null;
    $scope.options = [];
    $scope.logentries = [];

    var legalArr = new Array();
    var legalIds = new Array();

    /*cooper s - if the data hasn't been set when creating a legal doc then whatever is
        in the data base has to be retrieved via dataFactory, in fact, ALL data should be 
        retrieved via dataFactory...
    */
    var legalData  = dataFactory.getLegalData();

    //create an array of option objects { name, value } pairs 
    for ( var i=0 ; i <  legalData.legals.length ; i++) {
        legalArr.push({name: legalData.legals[i].data.label, value: i });
    }

    for ( var i=0 ; i <  legalData.legals.length ; i++) {
        legalIds.push({legalId: legalData.legals[i].data.legalId, name: legalData.legals[i].data.lablel});
    }

    var selectedLegal;

    var options = legalArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 

//check to see if we have our campaign

   $scope.$on('msp-loaded', function(event, args) {
            // wait until we have our MSP loaded and ready then fill in the form

              for ( var i=0 ; i <  legalIds.length ; i++) {
                    if ( $scope.msp.legalId == legalData.legals[i].data.legalId) {
                        $scope.selectedOption = i;
                    } //end if          
                }//end for loop 

           //capture new selection   
                $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("legalController - selection: " + $scope.selectedOption);
                    
               
                    var legal = $scope.selectedOption;
                    //set current campaigns tier3 msp to new selection
                     for ( var i=0 ; i <  legalIds.length ; i++) {
                        if ( legal ==  i) {
                            console.log("legalController - match our image: ", legalIds[i].legalId);
                            $scope.msp.legalId = legalIds[i].legalId;
                            console.log("Our selected legal: " + legalArr[i].name );
                        } //end if          
                    }//end for loop...
                });//end watch selectedOption
          
   });//end scope on msp 

}]);// End legal Controller
