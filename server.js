const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var bodyParser = require('body-parser');
//Rekognition *************************************************************************************************************************

var config = require('./config.js')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

var AWS = require('aws-sdk');
AWS.config.region = config.region;

var uuid = require('node-uuid');
var fs = require('fs-extra');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


app.use(express.static('public'));

var rekognition = new AWS.Rekognition({region: config.region});

app.post('/api/recognize', function (req, res, next) {
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

//****************************************************************************************************************************************



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
