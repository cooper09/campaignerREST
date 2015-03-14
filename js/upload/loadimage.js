
function loadUp($rootScope, $scope, $http ) {

   $scope.$on('image-loaded', function(event, args) {
    console.log("We have our image:  ", $rootScope.image );
    //var image = dataFactory.getImage();
    console.log("loadup- image returned from data factory: " + $rootScope.image.data.imageId );

    currentId = $rootScope.image.data.imageId;
    console.log("loadUp image id: " + currentId );
  });//end scope on campaign
 

//Angular upload Function  
$scope.uploadFile = function(files,type) {
    console.log("file type: ", files[0].name );

    var file =  files[0];
    var filename = files[0].name;

    var Image = function()
              {
                this.imageId = "#",
                this.label =  "unlabeled image",
                this.location =  "www"
              }

    var label = document.getElementById('imagelabel').value;
    console.log("file label: " + label );
    var location = "https://s3-us-west-2.amazonaws.com/polyimages/"+ filename;

    AWS.config.update({
        accessKeyId: "AKIAJ7C7LFEZRSDM7BMA",
        secretAccessKey: "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"
    });

    var bucket = new AWS.S3({params: {Bucket: 'polyimages'}});

    var results = document.getElementById('results');

  
      if (file) {
      var params = {Key: file.name, ContentType: file.type, Body: file};
        bucket.upload(params, function (err, data) {
          console.log(err);
          results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
      
        });  

       var imageObj = { 
                    'imageId' : '#', 
                    'label':  label,
                    'location': location
                  }

            $.ajax({
              url : "http://localhost:8081/image",
              type: "POST",
              data : imageObj,
              dataType: 'json',
              success: function(data, textStatus, jqXHR)
              {
                  console.log("POST succeded: " , textStatus + " jqXHR: " ,  jqXHR );
              },
              error: function (jqXHR, textStatus, errorThrown)
              {
              console.log("POST failed: " + errorThrown + " textStatus: " + textStatus );
              }
          });//end ajax post 

      } else {
        results.innerHTML = 'Nothing to upload.';
	  }
   }
}//end function loadUp
