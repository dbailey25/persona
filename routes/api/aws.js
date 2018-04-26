const router = require("express").Router();
const aws = require('aws-sdk');
// const config = require('../../config/config.js');
const rekognition = new aws.Rekognition({region: "us-east-1"});
const collectionName = "myCollection";
aws.config = new aws.Config();
// aws.config.region = config.region;
aws.config.accessKeyId = process.env.S3_KEY;
aws.config.secretAccessKey = process.env.S3_SECRET;
aws.config.region = "us-east-1";


// aws.config.update({
//   accessKeyId: process.env.S3_KEY,
//   secretAccessKey: process.env.S3_SECRET,
//   region: "usa-east-1"
// });
// Matches with "/api/aws";
router.route("/")
  .post(function (req, res, next) {
  var image = req.body.imageData.replace("data:image/jpeg;base64,", "");
  var bitmap =  Buffer.from(image, 'base64');
  
    rekognition.searchFacesByImage({
      "CollectionId": collectionName,
      "FaceMatchThreshold": 70,
      "Image": { 
        "Bytes": bitmap,
      },
      "MaxFaces": 1 
    }, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
        {
          res.send(data);	
        } else {
          res.send("Not recognized");
        }
      }
    });
});

router
  .route("/collection")
  .post(function (req, res, next) {
    const image = req.body.imageData.lastPhoto.replace("data:image/jpeg;base64,", "");
    const bitmap =  Buffer.from(image, 'base64');
    const name = req.body.imageData.name;
   
    // console.log(name);
        
    rekognition.indexFaces({
        "CollectionId": collectionName,
        "DetectionAttributes": ["ALL"],
        "ExternalImageId": name,
        "Image": { 
        "Bytes": bitmap
        }
    }, function(err, data) {
    	if (err) {
				console.log(err, err.stack); // an error occurred
			} else {
        res.send(data.FaceRecords[0].Face); 
				console.log(data);           // successful response
			}
    });
  });



// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
