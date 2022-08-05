const AWS = require('aws-sdk');

AWS.config.region = 'eu-west-2';

// const codecommit = new AWS.CodeCommit({apiVersion: '2015-04-13'}); 


// var params1 = {
//   commitId: '3cb3eaa9cd3497a1536100fd5dbd3f715918128d',
//   repositoryName: 'onramp-chined' 
// };

// var params2 = {
//     order:  "descending",
//     sortBy: "lastModifiedDate" 
// };

var params4 = {
  branchName: 'main',
  repositoryName: 'chris-temp'
};


  var sts = new AWS.STS({apiVersion: '2011-06-15'});
  var sts_params = {
    ExternalId: "chris",
    RoleArn: "arn:aws:iam::605505651286:role/chris-assume-role",
    RoleSessionName: "chrisPrageeth"
  };







exports.handler = async (event) => {
    // TODO implement
try {
  
  const creds = await sts.assumeRole(sts_params).promise();
   const accessparams2 = {
    accessKeyId: creds.Credentials.AccessKeyId,
    secretAccessKey: creds.Credentials.SecretAccessKey,
    sessionToken: creds.Credentials.SessionToken,
  };
  
  const codecommit = await new AWS.CodeCommit(accessparams2);

//   const response = await codecommit.listRepositories(params2).promise();
//   return response; 

// LINES 54-65 WONT BE NEEDED FOR THE AFT ACCOUNT
  var params5 = {
  branchName: 'main', /* required */
  fileContent: 'FIRST-PUT' , /* required */
  filePath: 'jjj..txt', /* required */
  repositoryName: 'chris-temp', /* required */
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  
};
 const response3 = await codecommit.putFile(params5).promise();
 console.log(response3);


  const cid = await codecommit.getBranch(params4).promise();
  const cid2 = cid.branch['commitId'];
  
  var params3 = {
  branchName: 'main', /* required */
  fileContent: 'hello 25 july WE RECEIVED OUR BONUS TODAY. and codecommit id is obtained using getbranch' , /* required */
  filePath: 'terraform.tfvars', /* required */
  repositoryName: 'chris-temp', /* required */
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