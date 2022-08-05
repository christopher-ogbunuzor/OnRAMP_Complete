// CODE FOR RETRIEVING PARENTCOMMITID
const AWS = require('aws-sdk');
// var fs = require('fs');

AWS.config.region = 'us-east-1';

const codecommit = new AWS.CodeCommit({apiVersion: '2015-04-13'}); 


// var params1 = {
//   commitId: '3cb3eaa9cd3497a1536100fd5dbd3f715918128d',
//   repositoryName: 'onramp-chined' 
// };

// var params2 = {
//     order:  "descending",
//     sortBy: "lastModifiedDate" 
// };

// var params3 = {
//   branchName: 'main', /* required */
//   fileContent: 'THIS SHLD HAVE BEEN CONTENTS FROM ONRAMP WEBSITE2' , /* required */
//   filePath: 'terraform.tfvars2', /* required */
//   repositoryName: 'onramp-chined', /* required */
//   commitMessage: 'Pushed by Lambda',
//   email: 'chris@yahoo.com',
//   name: 'Christopher',
//   parentCommitId: await codecommit.getBranch(params4).promise()
// };

var params4 = {
  branchName: 'main',
  repositoryName: 'onramp-chined'
};


exports.handler = async (event) => {
    // TODO implement
try {

  // const response = await codecommit.listRepositories(params2).promise();
  // return response; 

    const cid = await codecommit.getBranch(params4).promise();
    return cid.branch['commitId'];
    
//     {
//   "branch": {
//     "branchName": "main",
//     "commitId": "16d7a9154ddef9b8e61824426eef944fb927f137"
//   }
// }
   

// const response2 = await codecommit.putFile(params3).promise();
// return response2; 





  } 
  
  catch (err) {
    console.log(err.message);
    throw err;
  }
  
  
  
};