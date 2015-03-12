
function loadUp($rootScope, $scope, $http ) {

   $scope.$on('image-loaded', function(event, args) {
    console.log("We have our image:  ", $rootScope.image );
    //var image = dataFactory.getImage();
    console.log("loadup- image returned from data factory: " + $rootScope.image.data.imageId );

    currentId = $rootScope.image.data.imageId;
    console.log("loadUp image id: " + currentId );
  });//end scope on campaign
 
   $scope.uploadFile = function(files,type) {
    console.log("file type: ", files[0].name );

    var label = document.getElementById('imagelabel');
    console.log("file label: " + $(label).text() );
   /*  $http.post(endpoint() + "image/"+currentId, fd, {
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).success( function(data) {
            console.log("loadImages - load claim image:  ",data);
          }) */

    AWS.config.update({
        accessKeyId: "AKIAJ7C7LFEZRSDM7BMA",
        secretAccessKey: "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"
    });

    var bucket = new AWS.S3({params: {Bucket: 'polyimages'}});

    var results = document.getElementById('results');

    var file =  files[0];
    var filename = files[0].name;
      if (file) {
    /*    var params = {Key: file.name, ContentType: file.type, Body: file};
        bucket.upload(params, function (err, data) {
          console.log(err);
          results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
      
        });  */
      } else {
        results.innerHTML = 'Nothing to upload.';
	  }
   }
}//end function loadUp
