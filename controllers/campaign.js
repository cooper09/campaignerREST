
/*
	Campaign Controllers
	
	• CampaignListController: 
	• CampaignDetailsController
	• CampaignCreateController
*/
var campaignControllers = angular.module('campaignControllers', []);

/*
	Campaign Model
*/
var Campaign = function()
{
	this.campaignId = null;
	this.title = "untitled campaign";
	this.description = "campaign description";
	this.launch = new Date();
	this.end = new Date();
	this.country = null;
	this.active = false;
	this.image =  "";
	this.video = ""
	this.clicks = 0;
}

//usefull options

var selectedCountry;
var selectedImage;
var selectedVideo;

/*
	CampaignListController
	• display list of campaign items
	• create new campaign
*/
campaignControllers.controller('CampaignListController', ['$scope', 'campaignFactory', '$sce',function($scope, campaignFactory, $sce ) {
	
	$scope.sectionName = "Campaign";
	$scope.createNewLink = "#/new/campaign";

	$scope.status;
	$scope.onViewLoad();
	
	// new campaign method
	$scope.newCampaign = function()
	{
		console.log("createCampaign");
	}
	
	// methods for dynamically creating campaign cells
	$scope.renderHtml = function (campaign) {
	//	return campaign.item;
	//	return campaign ? $sce.trustAsHtml($scope.specialCell(campaign)) : $sce.trustAsHtml($scope.normalCell(campaign));
    	return $sce.trustAsHtml($scope.normalCell(campaign));
    };
    
	$scope.specialCell = function(campaign)
	{
		console("specialCell: ", campaign );
		return '<div><a href="#/campaign/'+campaign.data.campaignId+'">'
		+campaign.data.title+'</a></div>'+
		'<div>'+campaign.data.description+'</div>'+
		'<div>Launch: '+campaign.data.launch+'</div>'+
		'<div>Drawing: '+campaign.data.drawing+'</div>'+
		'<div>Special: '+campaign.data.special.msp+" count:"+campaign.data.special.count+'</div>'+
		'<div>Active: '+campaign.data.active+'</div></div>';
	}
	
	$scope.normalCell = function(campaign)
	{
		return '<div><a href="#/campaign/'+campaign.campaignId+'">'
		+campaign.campaignId+
		'</a></div><div>'+campaign.title+'</div>';
	}	
	
}]);// End list Controller 

/*
	CampaignDetailsController
	• display campaign details
	• delete campaign
	• update campaign
*/
campaignControllers.controller('CampaignDetailsController', ['$rootScope','$scope', 'campaignFactory', '$routeParams', '$location', '$filter', function($rootScope, $scope, campaignFactory, $routeParams, $location, $filter) {
	$scope.sectionName = "Campaign";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;
	$scope.drawingDate;
	$scope.drawingDate;

	var countries = $scope.countries;
	var images = $scope.images;
	
	$scope.$on('campaign-loaded', function(event, args) {
		//alert("CampaignDetailsController - scope on campaign loaded: " ,   args + " event: "+  $scope.campaign );
		console.log("CampaignDetailsController - current scope campaign loaded: " ,  $scope.campaignId );
		$scope.country = args.country;
		$scope.image = args.image;
		$scope.video = args.video;
	});//end scope on campaign
	
	// launch date change handler
	$scope.onLaunchDateChanged = function (dateString) {
		//console.log("onLaunchDateChanged: " + dateString );
		var newLaunchDate = new Date(dateString);
		//$scope.campaign.launch = newLaunchDate.getTime()/1000;
		$scope.launchDate = newLaunchDate;

		//alert("onLaunchDateChanged: " + $scope.launchDate );
	}
	
	// drawing date change handler
	$scope.onDrawingDateChanged = function (dateString) {
		//console.log("onLaunchDateChanged:", dateString);
		var newEndDate = new Date(dateString);
		
		$scope.endDate = newEndDate;

		//alert("onLaunchDateChanged: " + $scope.endDate );
	}
	
	$scope.changeCountry = function (selected) {
		$scope.country  = $scope.countries[selected].country;
	}

	$scope.changeImage = function (selected) {
		$scope.image = $scope.images[selected].location;
	}
	
	$scope.changeVideo = function (selected) {
		console.log("CampaignDetailsController - changeVideo: " + $scope.videos[selected].location );
		$scope.video = $scope.videos[selected].location;
	}

	// delete campaign method
	$scope.deleteItem = function(){
		campaignFactory.delete($scope.campaignId).success(function(data) {
			console.log("deleted campaign ",data);
			$location.path("/campaign");
		});
	}
	
	// save campaign method
	$scope.saveItem = function(campaign)
	{   
		console.log("OK here's the campaign we're updating launchDate: " + campaign.launch + " and end date: " + $scope.launchDate );		
		var launch_date = $filter('date')(new Date($scope.launchDate), 'MM/dd/yyyy');
		var end_date = $filter('date')(new Date($scope.endDate), 'MM/dd/yyyy');
		var campId = $scope.campaignId;

		var updateObj = { 
			campaignId: campId,
			title: $scope.campaign.title,
			description: $scope.campaign.description,
			launch: launch_date,
			end: end_date,
			country: $scope.country,
			image: $scope.image,
			video: $scope.video,
			clicks: 0
		}

		campaignFactory.update(updateObj).success(function(data) {
			console.log("CampaignDetailsController - updated campaign ",data);
			$location.path("/campaign");
		});
	}
	// get campaign details
	
	console.log("Details Controller - saveItem get campaign: " + $routeParams.itemId ); 

campaignFactory.getCampaign( $routeParams.itemId ).success(function(data) {
		// get campaign from response

		$scope.campaign = data;
		$scope.campaignId = data[0].campaignId;
		// set drawing and launch dates on scope
		//$scope.drawingDate = formatDateToString(new Date( $scope.campaign.end));
		//$scope.launchDate = formatDateToString(new Date( $scope.campaign.launch));
		$scope.campaign.title = data[0].title;
		$scope.campaign.description = data[0].description;
		$scope.launchDate = data[0].launch;
		$scope.endDate = data[0].end;
		$scope.campaign.country =  data[0].country;

		$scope.campaign.image  = data[0].image;
		$scope.campaign.video = data[0].video;
		$scope.campaign.clicks = data[0].clicks;

		//$scope.selectedOption.country = 2;
	// now that we have our campaign set it to root scope 
	//	dataFactory.setCampaign($scope.campaign);

		$scope.$broadcast('campaign-loaded', $scope.campaign )
			console.log("Broadcasting NOW!!!",  $scope.campaign);
			}).error (function(data) {
				alert("GET CAMPAIGN - ERROR: "+  data );
			}); 


//cooper s - need a little standalone date formatter 
	function formatDate(date) {
		  
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;

		 return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
		}

	function convertDate(date) {

	}

}]);//end Detail Controller

/*
	Campaign Create Controller
	• populate new campaign
	• save new campaign
*/

campaignControllers.controller('CampaignCreateController', ['$scope','$rootScope', '$http','$location','$filter', function($scope, $rootScope, $http, $location, $filter) {
	
	
	console.log("CampaignCreateController - creating new campaign");
	$scope.sectionName = "Campaign";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;
	
	// create empty campaign
	$scope.campaign = new Campaign();

	/* format text based display dates
	var displayLaunchDate = formatDate($scope.campaign.launch);
	var displayDrawingDate = formatDate($scope.campaign.drawing);

	$scope.campaign.launch = displayLaunchDate;
	$scope.campaign.end = displayDrawingDate; */

	//Lets start with default dates
	var today = new Date();
	var thirtydays = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var mmm = today.getMonth()+2; //January is 0!
	var yyyy = today.getFullYear();

		if(dd<10) {
			    dd='0'+dd;
			} 

		if(mm<10) {
			    mm='0'+mm;
			} 
		if(mmm<10) {
			    mmm='0'+mmm;
			} 


		today = mm+'/'+dd+'/'+yyyy;
		thirtydays = mmm+'/'+dd+'/'+yyyy;

	$scope.launchDate = today;
	$scope.endDate = thirtydays;

	// save method
	$scope.saveItem = function(){

		/*var utcDate1 = new Date( $scope.campaign.launch);
		var utcDate2 = new Date( $scope.campaign.drawing);
		$scope.campaign.launch =  utcDate1.getTime()/1000;
		$scope.campaign.drawing = utcDate2.getTime()/1000; */
 
		console.log("New Campaign: " , $scope.campaign );
		console.log("New Campaign title: " , $scope.campaign.title );
		console.log("New Campaign description: " , $scope.campaign.description );
		console.log("New Campaign country: " , $scope.country );
		console.log("New Campaign image: " , $scope.image );
		console.log("New Campaign video: " , $scope.video );

		var launch_date = $filter('date')(new Date($scope.launchDate), 'MM/dd/yyyy');
		var end_date = $filter('date')(new Date($scope.endDate), 'MM/dd/yyyy');

		if ($scope.campaign.active == false ) {
			$scope.campaign.active = 0;
		}

		var tempId = $scope.campaigns.length + 1;
		var currentId = tempId.toString();

		var campaignObj = { 
							campaignId: tempId,		//$scope.campaigns.length,
  							title: $scope.campaign.title, 
  							description: $scope.campaign.description, 
  							launch: launch_date, 
  							end: end_date,
  							country: $scope.country,
  							image: $scope.image,
  							video: $scope.video,
  							clicks: 0
  							}

  		console.log("Final Campaign Object:", campaignObj );
		$http.post(endpoint()+'campaign/', campaignObj )
		.success(function(data) {
			console.log("CampaignCreateController.created campaign details",data);
			$location.path("/campaign");
		});
		$location.path("/campaign");  
	}
	
	
	
	function formatDate(date) {
		/*  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'pm' : 'am';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear(); */
		}
}]);//End Create controller

function formatDateToString(date)
{
	var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}


