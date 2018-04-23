const router = require("express").Router();
const AWS = require('aws-sdk');
const config = require('../../config.js')
AWS.config.region = config.region;
const rekognition = new AWS.Rekognition({region: config.region});


// Matches with "/api/books"
router.route("/")
  // .get(booksController.findAll)
.post(function (req, res, next) {
 var image = req.body.imageData.replace("data:image/jpeg;base64,", "");
 var bitmap =  Buffer.from(image, 'base64');
 

	rekognition.searchFacesByImage({
	 	"CollectionId": config.collectionName,
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
				res.send(data.FaceMatches[0].Face);	
			} else {
				res.send("Not recognized");
			}
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
