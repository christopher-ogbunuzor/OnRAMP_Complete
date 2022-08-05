const AWS = require('aws-sdk');
// var fs = require('fs');

AWS.config.region = 'us-east-1';

const codecommit = new AWS.CodeCommit({apiVersion: '2015-04-13'}); 


// var params2 = {
//     order:  "descending",
//     sortBy: "lastModifiedDate" 
// };

var params4 = {
  branchName: 'main',
  repositoryName: 'onramp-chined'
};


exports.handler = async (event) => {
    // TODO implement
try {

//   const response = await codecommit.listRepositories(params2).promise();
//   return response; 

  const cid = await codecommit.getBranch(params4).promise();
  const cid2 = cid.branch['commitId'];
  
  var params3 = {
  branchName: 'main', /* required */
  fileContent: 'THIS SHLD HAVE BEEN CONTENTS FROM ONRAMP WEBSITE and codecommit id is obtained using getbranch' , /* required */
  filePath: 'terraform.tfvars3', /* required */
  repositoryName: 'onramp-chined', /* required */
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};

const response2 = await codecommit.putFile(params3).promise();
return response2; 





  } 
  
  catch (err) {
    console.log(err.message);
    throw err;
  }
  
  
  
};