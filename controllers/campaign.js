
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
	this.title = "untitled campaign";
	this.description = "campaign description";
	this.launch = new Date();
	this.drawing = new Date();
	this.campaignId = null;
	this.cityId = null;
	this.isSpecial = false;
	this.active = false;
	this.tier1MSP = {
		msp:null,
		count:0
	};
	this.tier2MSP = {
		msp:null,
		count:0
	};
	this.tier3MSP = {
		msp:null,
		count:0
	};
	this.special = {
		msp:null,
		count:0
	};
}

/*
	CampaignListController
	• display list of campaign items
	• create new campaign
*/
campaignControllers.controller('CampaignListController', ['$scope', 'campaignFactory', '$sce',function($scope, campaignFactory, $sce ) {
	
	$scope.sectionName = "Campaign";
	$scope.createNewLink = "#/new/campaign";

	$scope.status;
	
	// new campaign method
	$scope.newCampaign = function()
	{
		console.log("createCampaign");
	}
	
	// get campaigns

	campaignFactory.get().success(function(data) {
		$scope.campaigns = data.campaigns;
		console.log($scope.campaigns);
	}); 

	
	// methods for dynamically creating campaign cells
	$scope.renderHtml = function (campaign) {
		
		return campaign.data.isSpecial ? $sce.trustAsHtml($scope.specialCell(campaign)) : $sce.trustAsHtml($scope.normalCell(campaign));
    };
    
	$scope.specialCell = function(campaign)
	{
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
		return '<div><a href="#/campaign/'+campaign.data.campaignId+'">'
		+campaign.data.title+
		'</a></div><div>'+campaign.data.description+'</div>'+
		'<div>Launch: '+campaign.data.launch+'</div>'+
		'<div>Drawing: '+campaign.data.drawing+'</div>'+
		'<div class:"campaign_msp">Tier 1: '+campaign.data.tier1MSP.msp+" count:"+campaign.data.tier1MSP.count+'</div>'+
		'<div>Tier 2: '+campaign.data.tier2MSP.msp+" count:"+campaign.data.tier2MSP.count+'</div>'+
		'<div>Tier 3: '+campaign.data.tier3MSP.msp+" count:"+campaign.data.tier3MSP.count+'</div>'+
		'<div>Active: '+campaign.data.active+'</div></div>';
	}	
	
}]);// End list Controller 

/*
	CampaignDetailsController
	• display campaign details
	• delete campaign
	• update campaign
*/
campaignControllers.controller('CampaignDetailsController', ['$rootScope','$scope','dataFactory', 'campaignFactory', '$routeParams', '$location', '$filter', function($rootScope, $scope, dataFactory, campaignFactory, $routeParams, $location, $filter) {
	$scope.sectionName = "Campaign";
	$scope.saveButtonLabel = "UPDATE";
	$scope.hasDeleteButton = true;
	$scope.drawingDate;
	$scope.drawingDate;
	

	 //console.log("current campaign launch date: " + $scope.campaignlaunch );

	$scope.$on('msps-loaded', function(event, args) {
		
	});//end scope on campaign
	
	
	// launch date change handler
	$scope.onLaunchDateChanged = function (dateString) {
		console.log("onLaunchDateChanged: " + dateString );
		var newLaunchDate = new Date(dateString);
		$scope.campaign.launch = newLaunchDate.getTime()/1000;
	}
	
	// drawing date change handler
	$scope.onDrawingDateChanged = function (dateString) {
		console.log("onLaunchDateChanged:", dateString);
		var newDrawingDate = new Date(dateString);
		$scope.campaign.drawing = newDrawingDate.getTime()/1000;
	}
	
	$scope.changeMSP = function (selected) {
		alert("changeMSP.selected: " +  selected);
	}
	
	// delete campaign method
	$scope.deleteItem = function(){
		campaignFactory.delete($scope.campaign.campaignId).success(function(data) {
			console.log("deleted campaign ",data);
			$location.path("/campaign");
		});
	}
	
	// save campaign method
	$scope.saveItem = function(campaign)
	{   

		console.log("CampaignDetailsController.saveItem - updating: ", campaign.campaignId );
		console.log("CampaignDetailsController.saveItem - updating launch date: ", campaign.launch );
	
		console.log("CampaignDetailsController.saveItem - updating epoch launch date: ", campaign.launch );
		console.log("CampaignDetailsController.saveItem - updating epoch drawing date: ", campaign.drawing );

		campaignFactory.update(campaign)
			.success(function(data) {
				console.log("CampaignDetailsController.saveItem - update returned: ",data);
				$location.path("/campaign");
				}).error(function(data){
				console.log("CampaignDetailsController.saveItem - failed to update: ", data );
			});
	}
	// get campaign details
	
	console.log("Details Controller - saveItem get campaign: " + $routeParams.itemId ); 

	campaignFactory.getCampaign( $routeParams.itemId ).success(function(data) {
		// get campaign from response
		console.log("CampaignDetailsController.getCampaign: " , data );
		$scope.campaign = data.campaign.data;
		
		console.log("CampaignDetailsController.getCampaign - launchDate: " , $scope.campaign.launch);
		console.log("CampaignDetailsController.getCampaign - drawingDate: " , $scope.campaign.drawing);

		// set drawing and launch dates on scope
		$scope.drawingDate = formatDateToString(new Date( $scope.campaign.drawing));
		$scope.launchDate = formatDateToString(new Date( $scope.campaign.launch));

		var formattedLaunchDate = new Date( $scope.campaign.launch*1000);
		var formattedDrawingDate = new Date( $scope.campaign.drawing*1000);

		$scope.launchDate = formatDate(formattedLaunchDate);
		$scope.drawingDate = formatDate(formattedDrawingDate);

		console.log("CampaignDetailsController.getCampaign - converted launchDate: " , $scope.launchDate);
		console.log("CampaignDetailsController.getCampaign - converted drawingDate: " , $scope.drawingDate);
		
	// now that we have our campaign set it to root scope 
		dataFactory.setCampaign($scope.campaign);

	}); 
	
	campaignFactory.getCities( $routeParams.itemId ).success(function(data) {
		console.log("citys",data.citys)
		$scope.cities = data.citys;
		
	});
	
	// get mspsd
	campaignFactory.getMSPs( $routeParams.itemId ).success(function(data) {
		console.log("msps",data.msps)
		$scope.msps = data.msps;
		$rootScope.$broadcast('msps-loaded');
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

campaignControllers.controller('CampaignCreateController', ['$scope', '$http','$location', function($scope, $http, $location) {
	
	
	console.log("CampaignCreateController - creating new campaign");
	$scope.sectionName = "Campaign";
	$scope.saveButtonLabel = "SAVE";
	$scope.hasDeleteButton = false;
	
	// create empty campaign
	$scope.campaign = new Campaign();

	// format text based display dates
	var displayLaunchDate = formatDate($scope.campaign.launch);
	var displayDrawingDate = formatDate($scope.campaign.drawing);

	console.log("New Campaign cityid: ", $scope.campaign.cityId );

	$scope.campaign.launch = displayLaunchDate;
	$scope.campaign.drawing = displayDrawingDate;

	// save method
	$scope.saveItem = function(){

		var utcDate1 = new Date( $scope.campaign.launch);
		var utcDate2 = new Date( $scope.campaign.drawing);
		$scope.campaign.launch =  utcDate1.getTime()/1000;
		$scope.campaign.drawing = utcDate2.getTime()/1000;

		console.log("New Campaign save launch date: " + $scope.campaign.launch );
		console.log("New Campaign save drawing date: " + $scope.campaign.drawing );

		$scope.campaign.cityId = "c7d00b20-fd5d-4538-96e9-0eadacd1bd04";

		if ($scope.campaign.active == false ) {
			$scope.campaign.active = 0;
		}

		alert("campaign special: ", $scope.campaign.special );
		console.log("campaign special: ", $scope.campaign.special );

		$http.post(endpoint()+'campaign/', $scope.campaign)
		.success(function(data) {
			console.log("CampaignCreateController.created campaign details",data);
			$location.path("/campaign");
			
		});
	}
	
	// get citys
	$http.get(endpoint() +'city').
	success(function(data) {
		$scope.cities = data.citys;
		console.log("get city information: ", $scope.cities );
	});

	
	// get msps
	$http.get(endpoint() + 'msp').
	success(function(data) {
		console.log("CampaignCreateController - created msp: ",data);
		$scope.msps = data.msps;
	});
	
	
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
}]);//End Create controller

function formatDateToString(date)
{
	var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}


