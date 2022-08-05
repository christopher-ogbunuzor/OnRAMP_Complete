const AWS = require('aws-sdk');
const { execSync } = require('child_process');
var fs = require('fs');
var SubnetCIDRAdviser = require('subnet-cidr-calculator'); 



// var params1 = {
//   commitId: '3cb3eaa9cd3497a1536100fd5dbd3f715918128d',
//   repositoryName: 'onramp-chined' 
// };


// var params2 = {
//     order:  "descending",
//     sortBy: "lastModifiedDate"   
// };


var params4 = {
  branchName: 'OnlyPipeline1',
  repositoryName: 'onramp_pipeline_cc_repo'
};


exports.handler = async (event) => {
    // TODO implement
try {
      // TODO implement
    var arr = [];
    
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        
        var res = JSON.parse(record.dynamodb.NewImage.formData["S"]);
        var email = res.email;
        arr.push(email);
        var c_name = res.customername;
        arr.push(c_name);
        var acct = res.AccountNumber;
        arr.push(acct); 
        var extid = res.ext_id;
        arr.push(extid);
        var cidr = res.cidr;
        arr.push(cidr);
        var whitelist = res.Whitelist;
        arr.push(whitelist);
        var region = res.region;
        arr.push(region);
        var v_name = res.vpcname;
        arr.push(v_name);
        var env = res.env;
        arr.push(env);
        var cgwip = res.cgwIP;
        arr.push(cgwip);
    });
    
    console.log('CUSTOMER DETAILS ARE: ', arr);
    // var data = JSON.stringify(account_name);
    // var c_name = 'copc547';  
    var _acctnos = "account_id = "+ JSON.stringify(arr[2]) + "\n";
    var _region = "aws_region = "+ JSON.stringify(arr[6]) + "\n";
    var _customer_gw_ip = "customer_gw_ip = "+ JSON.stringify(arr[9]) + "\n";

    var regionSub = JSON.stringify(arr[6]);
    
    
    var regionSub_MOD = regionSub.substr(0,2) + regionSub.substr(3,1) + regionSub.substr(regionSub.length - 1);
    var _region_substring = "region_substring = "+ regionSub_MOD + "\n";
    
    //AVAILABILITY ZONES
    // var threeplus = ["us-east-1", "us-east-2", "us-west-1", "us-west-2", "eu-west-1", "eu-west-2"]
    var threeless =["cn-north-1", "ca-central-1"];
    
    if (threeless.includes(regionSub)) {
    var azs = [regionSub+'a', regionSub+'b'];
    } else {
    var azs = [regionSub+'a', regionSub+'b', regionSub+'c'];}
    
    

    // https://www.davidc.net/sites/default/subnets/subnets.html
    let VPC_CIDR = arr[4];      //"10.106.0.0/24";
    
    let netmask = VPC_CIDR.slice(-2);
    
    let FourIpOctets = VPC_CIDR.slice(0, -3);
    
    var netmask_num = parseInt(netmask);
    var netmask2 = (netmask_num + 2).toString();
    var netmask4 = (netmask_num + 4).toString();
    var netmask3 = (netmask_num + 3).toString();
    
    
    let subnetList = SubnetCIDRAdviser.calculate(FourIpOctets, netmask, []).subnets;
    let filteredList = subnetList.filter((s) => s.value.endsWith("/" + netmask2));
    var subnet_netmask2 = [];
    for (var i = 0; i < filteredList.length; i++) {
        subnet_netmask2.push(filteredList[i]["value"]);
    }
    
    
    var subnet_netmask4 = [];
    for (var i = 0; i < 2; i++) {
        var subnet_netmask4List = SubnetCIDRAdviser.calculate(subnet_netmask2[i].slice(0, -3), netmask2, []).subnets;
        var subnet_netmask4filteredList = subnet_netmask4List.filter((s) => s.value.endsWith("/" + netmask4));
        for (var j = 0; j < subnet_netmask4filteredList.length; j++) { subnet_netmask4.push(subnet_netmask4filteredList[j]["value"]); }
    }
    let public_application_subnetCIDR = subnet_netmask4.slice(0, 6);
    //console.log("Suggested Public and Data subnet CIDRs: ", public_application_subnetCIDR);
    
    
    var DataCidr = [];
    for (var i = 1; i < 4; i++) {
        var subnet_List = SubnetCIDRAdviser.calculate(subnet_netmask2[i].slice(0, -3), netmask2, []).subnets;
        var subnet_filteredList = subnet_List.filter((s) => s.value.endsWith("/" + netmask3));
        for (var j = 0; j < subnet_filteredList.length; j++) { DataCidr.push(subnet_filteredList[j]["value"]); }
    }
    var applicationcidr = DataCidr.slice(1, 6);
    //console.log("Suggested Application subnet CIDRs: ", DataCidr.slice(1, 6));
    
    
    var str_whtlst=arr[5];
    const whitelistvar = str_whtlst.split(",");
    // console.log(whitelistvar);



    var _extid = "external_id = "+ JSON.stringify(arr[3]) + "\n";
    var _cidr = "vpc_cidr = "+ JSON.stringify(arr[4]) + "\n";
    var _whitelist = "whitelist = "+ whitelistvar + "\n";
    // var _whitelist = "whitelist = ["+ JSON.stringify(arr[5]) + ']' + "\n";
    var _vpcname = "vpc_name = "+ JSON.stringify(arr[7]) + "\n";
    var _customername = "customer_name = "+ JSON.stringify(arr[1]) + "\n";
    var _acctname = "account_name = "+ JSON.stringify(arr[1]) + "\n";
    var _env = "env = "+ JSON.stringify(arr[8]) + "\n";
    var _azs = "azs = "+ azs + "\n";
    var _pubsubnetcidr = "public_subnet_cidr = "+ public_application_subnetCIDR.slice(0, 3) + "\n";
    var _application_subnet_cidr = "application_subnet_cidr = "+ applicationcidr.slice(0, 3) + "\n";
    var _datacidr = "data_subnet_cidr = "+ public_application_subnetCIDR.slice(3, 6) + "\n";

    var bigstring = _customername  + _region  + _cidr + _whitelist + _vpcname + _env + _region_substring + _azs + _pubsubnetcidr + _application_subnet_cidr+ _datacidr + _customer_gw_ip;





    // var bigstring = _acctname + _customername + _acctnos + _region + _extid + _cidr + _whitelist + _vpcname + _env + _region_substring + _azs + _pubsubnetcidr + _application_subnet_cidr+ _datacidr + _customer_gw_ip;
    
    AWS.config.region = 'us-east-1'; //eu-west-2.   
    process.env.EXID = arr[3];
    process.env.REGION = arr[6];
    process.env.CUSTOMERNAME = arr[1];
    process.env.ACCID = arr[2];
  
  
  
  // The assume role details need to be for the AFT account so ExternalId: arr[3] should be for the AFT account not customers. UNCOMMENT OUT
  // FOR NOW I AM SETTING IT TO PRAGEETH'S ASSUME ROLE
            //   var sts = new AWS.STS({apiVersion: '2011-06-15'});
            //   var sts_params = {
            //   ExternalId: arr[3],  //"chris" MODIFY THIS TO AFT external id
            //   RoleArn: "arn:aws:iam::" + arr[2] + ":role/chris-assume-role", //605505651286 MODIFY THIS TO AFT external id
            //   RoleSessionName: "onramp-pipeline-session"
            // };
              
            //   const creds = await sts.assumeRole(sts_params).promise();
            //   const accessparams2 = {
            //   accessKeyId: creds.Credentials.AccessKeyId,
            //   secretAccessKey: creds.Credentials.SecretAccessKey,
            //   sessionToken: creds.Credentials.SessionToken,
            // };
            
            // const codecommit = await new AWS.CodeCommit(accessparams2);
            
  const codecommit = await new AWS.CodeCommit();

//   const response = await codecommit.listRepositories(params2).promise();
//   return response; 

// LINES 98-109 WONT BE NEEDED FOR THE AFT ACCOUNT. Create main branch by committing first file to empty repo
//   var params5 = {
//   branchName: 'main', /* required */
//   fileContent: 'FIRST-PUT' , /* required */
//   filePath: 'jjj.txt', /* required */
//   repositoryName: 'chris-temp', /* required */
//   commitMessage: 'Pushed by Lambda',
//   email: 'chris@yahoo.com',
//   name: 'Christopher',
  
// };
// const response3 = await codecommit.putFile(params5).promise();
// console.log(response3);


  const cid = await codecommit.getBranch(params4).promise();
  const cid2 = cid.branch['commitId'];
// lines below is for pushing website form info to repo terraform.tfvars file
  var params3 = {
  branchName: 'OnlyPipeline1', /* required */
  fileContent: bigstring , /* required */
  filePath: 'FOLDER2/terraform/sharedservices/lz-deployment/terraform.tfvars', /* required */
  repositoryName: 'onramp_pipeline_cc_repo',             //'chris-temp', /* CHANGE TO REPO IN AFT ACCOUNT AND UNCOMMENT STS ASSUME ROLE ABOVE */
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};

const response2 = await codecommit.putFile(params3).promise();
// return response2; 


// LET US EDIT THE FILES SAVED IN LAMBDA LAYER BEFORE PUSHING TO REPO
 execSync("awk -v env_var3=\"$CUSTOMERNAME\" -v env_var2=\"$REGION\"  '{gsub(/ZZZZZ/,env_var3);gsub(/YYYYY/,env_var2)}1' /opt/FOLDER2/cloudformation/buildspec_s3_DDB_Create.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/FOLDER2/cloudformation/build spec_s3_DDB_Create.yml", { encoding: 'utf8', stdio: 'inherit' }); 
 execSync("awk -v env_var=\"$EXID\"  '{gsub(/XXXXX/,env_var)}1' /opt/FOLDER2/cloudformation/buildspec_CF_role.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/FOLDER2/cloudformation/buildspec_CF_role.yml", { encoding: 'utf8', stdio: 'inherit' }); 
 execSync("awk -v env_var=\"$EXID\" -v env_var2=\"$REGION\" -v env_var3=\"$CUSTOMERNAME\" -v env_var4=\"$ACCID\" '{gsub(/XXXXX/,env_var);gsub(/YYYYY/,env_var2);gsub(/ZZZZZ/,env_var3);gsub(/AAAAA/,env_var4)}1' /opt/FOLDER2/terraform/sharedservices/lz-deployment/backend.tf > /tmp/temp.txt && mv /tmp/temp.txt /tmp/FOLDER2/terraform/sharedservices/lz-deployment/backend.tf", { encoding: 'utf8', stdio: 'inherit' });
 execSync("awk -v env_var=\"$EXID\" -v env_var4=\"$ACCID\" '{gsub(/XXXXX/,env_var);gsub(/AAAAA/,env_var4)}1' /opt/FOLDER2/terraform/sharedservices/lz-deployment/provider.tf > /tmp/temp.txt && mv /tmp/temp.txt /tmp/FOLDER2/terraform/sharedservices/lz-deployment/provider.tf", { encoding: 'utf8', stdio: 'inherit' });






// template for modifying files
// execSync("awk -v env_var=\"$EXID\" -v env_var2=\"$REGION\"  '{gsub(/XXXXX/,env_var);gsub(/YYYYY/,env_var2)}1' /opt/FOLDER2/cloudformation/build spec_s3_DDB_Create.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/FOLDER2/cloudformation/build spec_s3_DDB_Create.yml", { encoding: 'utf8', stdio: 'inherit' }); 
// execSync("awk -v env_var=\"$EXID\"  '{gsub(/XXXXX/,env_var)}1' /opt/CF_TEMP/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 


// lines 131-143 is how to wirte file contents and push to repo
  var params6 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/FOLDER2/cloudformation/build spec_s3_DDB_Create.yml',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/cloudformation/build spec_s3_DDB_Create.yml', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};
const response6 = await codecommit.putFile(params6).promise();
console.log(response6) ;

  var params7 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/FOLDER2/cloudformation/buildspec_CF_role.yml',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/cloudformation/buildspec_CF_role.yml', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};
const response7 = await codecommit.putFile(params7).promise();
console.log(response7) ;

  var params8 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/FOLDER2/terraform/sharedservices/lz-deployment/backend.tf',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/terraform/sharedservices/lz-deployment/backend.tf', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};
const response8 = await codecommit.putFile(params8).promise();
console.log(response8) ;

  var params9 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/FOLDER2/terraform/sharedservices/lz-deployment/provider.tf',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/terraform/sharedservices/lz-deployment/provider.tf', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};
const response9 = await codecommit.putFile(params9).promise();
console.log(response9) ;



  } 
  
  catch (err) {
    console.log(err.message);
    throw err;
  }
  
  
  
};