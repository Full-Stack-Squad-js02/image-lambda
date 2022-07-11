'use strict';



let AWS = require('aws-sdk');
let S3 = new AWS.S3();



exports.handler = async (event) => {

 
  let request = await S3.getObject({ Bucket: "Full-Stack-Squad-js02", Key: "images.JSON" }).promise();
  let imageLogArr = JSON.parse(request.Body);

  console.log(imageLogArr);

  if (!imageLogArr) {
    imageLogArr = [];
  }

  let imageLogObj = {
    name: event.Records[0].s3.object.key.split('/')[1],
    size: `${event.Records[0].s3.object.size / 1000}KB`,
    timestamp: new Date(),
  };

  imageLogArr.push(imageLogObj);

  console.log(imageLogArr);

  await S3.putObject({ Bucket: "Full-Stack-Squad-js02", Key: "images.JSON", Body: JSON.stringify(imageLogArr) }).promise();

};