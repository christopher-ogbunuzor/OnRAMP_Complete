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
    
//     let params = {
//     TableName: "serverlessrepo-serverless-form-handler-FormDataTable-TS4SHWVPXX9L",
//     KeyConditionExpression: "ID = :formId",
//     ExpressionAttributeValues: {
//         ":id": 'formId'
//     },
//     ScanIndexForward: false,
//     Limit: 1
// }; 
    
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
    
    console.log("Type of arr from website: ", typeof arr);
    console.log('CUSTOMER DETAILS ARE: ', arr);
    // var data = JSON.stringify(account_name);  JSON.stringify()
    // var c_name = 'copc547';  
    var _acctnos = "account_id = "+ JSON.stringify(arr[2]) + "\n";
    console.log("acct nos in tfvars file: ", _acctnos);

    var _region = "aws_region = "+ JSON.stringify(arr[6]) + "\n";
    console.log("region in tfvars file: ", _region);

    var _customer_gw_ip = "customer_gw_ip = "+ JSON.stringify(arr[9]) + "\n";
    
    console.log("regiion from website as is: ", arr[6]);
    var regionSub = JSON.stringify(arr[6]);
    var regionSub2 = arr[6];
    console.log("Type of region from website as is: ", typeof arr[6]);


    console.log("regionsub after stringifying it: ", regionSub);
    //eu-west-2
    var regionSub_MOD1 = regionSub2.substring(0,2);
    console.log("regionSub_MOD1: ", regionSub_MOD1); //eu-west-2

    var regionSub_MOD2 = regionSub2.substring(3,4);
    console.log("regionSub_MOD2: ", regionSub_MOD2);

    var regionSub_MOD3 = regionSub2.substr(regionSub2.length - 1);
    console.log("regionSub_MOD3: ", regionSub_MOD3);


    var regionSub_MODFINAL = regionSub_MOD1.concat(regionSub_MOD2).concat(regionSub_MOD3);
    console.log("regionSub_MODFINAL regionsubstring after text manipulation: ", regionSub_MODFINAL);

    var _region_substring = "region_substring = "+ JSON.stringify(regionSub_MODFINAL) + "\n";
    console.log("regionsubstr in tfvars file: ", _region_substring);

    
    //AVAILABILITY ZONES
    // var threeplus = ["us-east-1", "us-east-2", "us-west-1", "us-west-2", "eu-west-1", "eu-west-2"]
    var threeless =["cn-north-1", "ca-central-1"];
    
    if (threeless.includes(regionSub2)) {
    var azs1 = [regionSub2.concat('a'), regionSub2.concat('b')];
    var azs = [JSON.stringify(azs1[0]), JSON.stringify(azs1[1])];
    
    } else {
    var azs2 = [regionSub2.concat('a'), regionSub2.concat('b'), regionSub2.concat('c')];
    var azs = [JSON.stringify(azs2[0]), JSON.stringify(azs2[1]), JSON.stringify(azs2[2])];
    }
    
    console.log("azs after stringifying: ", azs);


//     // https://www.davidc.net/sites/default/subnets/subnets.html
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
    console.log("subnet_netmask4 is : ", subnet_netmask4);
    console.log("Type of subnet_netmask4 is : ", typeof subnet_netmask4);
    console.log("Type of subnet_netmask4 content is : ", typeof subnet_netmask4[0]);

    var public_application_subnetCIDR = subnet_netmask4.slice(0, 6);
    console.log("public_application_subnetCIDR b4 manipulating: ", public_application_subnetCIDR);
    console.log("Type of public_application_subnetCIDR b4 manipulating: ", typeof public_application_subnetCIDR);
    var PS1 = JSON.stringify(public_application_subnetCIDR[0]);
    var PS2 = JSON.stringify(public_application_subnetCIDR[1]);
    var PS3 = JSON.stringify(public_application_subnetCIDR[2]);
    var DS1 = JSON.stringify(public_application_subnetCIDR[3]);
    var DS2 = JSON.stringify(public_application_subnetCIDR[4]);
    var DS3 = JSON.stringify(public_application_subnetCIDR[5]);
    
    
    console.log('PRINTING OUT THE SUBNETS FOR TFVARS FILE')
    var _pubsubnetcidr = "public_subnet_cidr = [" + PS1 +',' + PS2 +','+ PS3 +']'+ "\n";
    console.log(_pubsubnetcidr);
    var _datacidr = "data_subnet_cidr = [" + DS1 +','+ DS2 +','+ DS3 + ']'+"\n";
    console.log(_datacidr);
    // var PASsplit = public_application_subnetCIDR.split(",");
    // var public_application_subnetCIDR2=[];
    // for (var i = 0; i < PASsplit.length; i++) {
    //     public_application_subnetCIDR2.push(JSON.stringify(PASsplit[i])); 
    // }
    // console.log("Suggested Public and Data subnet CIDRs: ", public_application_subnetCIDR2);
    
//     var PASsplitSTRNGIFY = JSON.stringify(public_application_subnetCIDR);
//     var PASsplit = PASsplitSTRNGIFY.split(",");
//     var public_application_subnetCIDR2=[];
//     for (var i = 0; i < PASsplit.length; i++) {
//         public_application_subnetCIDR2.push(JSON.stringify(PASsplit[i])); 
//     }
//     console.log("Suggested Public and Data subnet CIDRs: ", public_application_subnetCIDR2);
    
    
    var DataCidr = [];
    for (var i = 1; i < 4; i++) {
        var subnet_List = SubnetCIDRAdviser.calculate(subnet_netmask2[i].slice(0, -3), netmask2, []).subnets;
        var subnet_filteredList = subnet_List.filter((s) => s.value.endsWith("/" + netmask3));
        for (var j = 0; j < subnet_filteredList.length; j++) { DataCidr.push(subnet_filteredList[j]["value"]); }
    }
    var applicationcidr = DataCidr.slice(1, 6);
    var AP1 = JSON.stringify(applicationcidr[0]);
    var AP2 = JSON.stringify(applicationcidr[1]);
    var AP3 = JSON.stringify(applicationcidr[2]);
    var _application_subnet_cidr = "application_subnet_cidr = [" + AP1 +',' + AP2 +','+ AP3 +']'+ "\n";
    console.log(_application_subnet_cidr);
//     var applicationcidrSTRNGIFY = JSON.stringify(applicationcidr);

//     var ACsplit = applicationcidrSTRNGIFY.split(",");
//     var applicationcidr2=[];
//     for (var i = 0; i < ACsplit.length; i++) {
//         applicationcidr2.push(JSON.stringify(ACsplit[i]))}; 
//     console.log("Suggested Application subnet CIDRs: ", applicationcidr2);
    
    
    
    var str_whtlst=arr[5];
    var whitelistvarsplit = str_whtlst.split(",");
    console.log("Whitelist variable splitted: ", whitelistvarsplit);

    var whitelistvar=[];
    for (var i = 0; i < whitelistvarsplit.length; i++) {
        whitelistvar.push(JSON.stringify(whitelistvarsplit[i])); 
    }
  console.log("final Whitelist variable with strings after stringifying: ", whitelistvar);



    var _extid = "external_id = "+ JSON.stringify(arr[3]) + "\n";
    var _cidr = "vpc_cidr = "+ JSON.stringify(arr[4]) + "\n";
    var _whitelist = "whitelist = ["+ whitelistvar + ']' + "\n";
    // var _whitelist = "whitelist = ["+ JSON.stringify(arr[5]) + ']' + "\n";
    var _vpcname = "vpc_name = "+ JSON.stringify(arr[7]) + "\n";
    var _customername = "customer_name = "+ JSON.stringify(arr[1]) + "\n";
    var _acctname = "account_name = "+ JSON.stringify(arr[1]) + "\n";
    var _env = "env = "+ JSON.stringify(arr[8]) + "\n";
    var _azs = "azs = ["+ azs + ']' + "\n";
//     var _pubsubnetcidr = "public_subnet_cidr = ["+ public_application_subnetCIDR2.slice(0, 3) +']' + "\n";
//     var _application_subnet_cidr = "application_subnet_cidr = ["+ applicationcidr2.slice(0, 3) + ']' + "\n";
//     var _datacidr = "data_subnet_cidr = ["+ public_application_subnetCIDR2.slice(3, 6) + ']' + "\n";

     var bigstring = _customername  + _region  + _cidr + _whitelist + _vpcname + _env + _region_substring + _azs + _pubsubnetcidr + _application_subnet_cidr+ _datacidr + _customer_gw_ip;





//     // var bigstring = _acctname + _customername + _acctnos + _region + _extid + _cidr + _whitelist + _vpcname + _env + _region_substring + _azs + _pubsubnetcidr + _application_subnet_cidr+ _datacidr + _customer_gw_ip;
    
    AWS.config.region = 'us-east-1'; //eu-west-2.   
    process.env.EXID = arr[3];
    process.env.REGION = arr[6];
    process.env.CUSTOMERNAME = arr[1];
    process.env.ACCID = arr[2];
    process.env.SESSIONAME = arr[1] + 'session';
    process.env.ROLEARN = "arn:aws:iam::" + arr[2] + ":role/chris-assume-role";
    process.env.AREXID = "chris"
  
  
  
//   // The assume role details need to be for the AFT account so ExternalId: arr[3] should be for the AFT account not customers. UNCOMMENT OUT
//   // FOR NOW I AM SETTING IT TO PRAGEETH'S ASSUME ROLE
//             //   var sts = new AWS.STS({apiVersion: '2011-06-15'});
//             //   var sts_params = {
//             //   ExternalId: arr[3],  //"chris" MODIFY THIS TO AFT external id
//             //   RoleArn: "arn:aws:iam::" + arr[2] + ":role/chris-assume-role", //605505651286 MODIFY THIS TO AFT external id
//             //   RoleSessionName: "onramp-pipeline-session"
//             // };
              
//             //   const creds = await sts.assumeRole(sts_params).promise();
//             //   const accessparams2 = {
//             //   accessKeyId: creds.Credentials.AccessKeyId,
//             //   secretAccessKey: creds.Credentials.SecretAccessKey,
//             //   sessionToken: creds.Credentials.SessionToken,
//             // };
            
//             // const codecommit = await new AWS.CodeCommit(accessparams2);
            
  const codecommit = await new AWS.CodeCommit();


// //   const response = await codecommit.listRepositories(params2).promise();
// //   return response; 

// // LINES 98-109 WONT BE NEEDED FOR THE AFT ACCOUNT. Create main branch by committing first file to empty repo
// //   var params5 = {
// //   branchName: 'main', /* required */
// //   fileContent: 'FIRST-PUT' , /* required */
// //   filePath: 'jjj.txt', /* required */
// //   repositoryName: 'chris-temp', /* required */
// //   commitMessage: 'Pushed by Lambda',
// //   email: 'chris@yahoo.com',
// //   name: 'Christopher',
  
// // };
// // const response3 = await codecommit.putFile(params5).promise();
// // console.log(response3);


// RESETTING FILES IN CODECOMMIT REPO
 var fileList = ['/opt/FOLDER2/cloudformation/buildspec_CF_role.yml',
                '/opt/FOLDER2/cloudformation/buildspec_s3_DDB_Create.yml',
                '/opt/FOLDER2/terraform/sharedservices/lz-deployment/backend.tf',
                '/opt/FOLDER2/terraform/sharedservices/lz-deployment/provider.tf',
                '/opt/FOLDER2/terraform/sharedservices/lz-deployment/terraform.tfvars'];
                
    for (var i = 0; i < fileList.length; i++) {
      const cid11 = await codecommit.getBranch(params4).promise();
      const cid12 = cid11.branch['commitId'];
      var splt = fileList[i].split('/');
      var filename = splt[(splt.length - 1)];
        var params11 = {
                  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
                  fileContent: fs.readFileSync(fileList[i],{encoding:'utf8', flag:'r'}) , /* required */
                  filePath: fileList[i].replace("/opt/", ""), /* required */
                  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
                  commitMessage: 'RESET '+ filename + ' by lambda',
                  email: 'chris@yahoo.com',
                  name: 'Christopher',
                  parentCommitId: cid12};
                  
      const response11 = await codecommit.putFile(params11).promise();
      console.log('RESET '+ filename + ' by lambda',response11) ;
                  
                  }



// LET US EDIT THE FILES SAVED IN LAMBDA LAYER BEFORE PUSHING TO REPO
execSync("awk -v env_var7=\"$AREXID\" -v env_var=\"$EXID\" -v env_var3=\"$CUSTOMERNAME\" -v env_var2=\"$REGION\" -v env_var5=\"$ROLEARN\" -v env_var6=\"$SESSIONAME\"  '{gsub(/BBBBB/,env_var7);gsub(/XXXXX/,env_var);gsub(/ZZZZZ/,env_var3);gsub(/YYYYY/,env_var2);gsub(/JJJJJ/,env_var5);gsub(/KKKKK/,env_var6)}1' /opt/FOLDER2/cloudformation/buildspec_s3_DDB_Create.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/buildspec_s3_DDB_Create.yml", { encoding: 'utf8', stdio: 'inherit' }); 
execSync("awk -v env_var7=\"$AREXID\" -v env_var=\"$EXID\" -v env_var5=\"$ROLEARN\" -v env_var6=\"$SESSIONAME\" -v env_var2=\"$REGION\"  '{gsub(/BBBBB/,env_var7);gsub(/XXXXX/,env_var);gsub(/JJJJJ/,env_var5);gsub(/KKKKK/,env_var6);gsub(/YYYYY/,env_var2)}1' /opt/FOLDER2/cloudformation/buildspec_CF_role.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/buildspec_CF_role.yml", { encoding: 'utf8', stdio: 'inherit' }); 
execSync("awk -v env_var=\"$EXID\" -v env_var2=\"$REGION\" -v env_var3=\"$CUSTOMERNAME\" -v env_var4=\"$ACCID\" '{gsub(/XXXXX/,env_var);gsub(/YYYYY/,env_var2);gsub(/ZZZZZ/,env_var3);gsub(/AAAAA/,env_var4)}1' /opt/FOLDER2/terraform/sharedservices/lz-deployment/backend.tf > /tmp/temp.txt && mv /tmp/temp.txt /tmp/backend.tf", { encoding: 'utf8', stdio: 'inherit' });
execSync("awk -v env_var=\"$EXID\" -v env_var4=\"$ACCID\" '{gsub(/XXXXX/,env_var);gsub(/AAAAA/,env_var4)}1' /opt/FOLDER2/terraform/sharedservices/lz-deployment/provider.tf > /tmp/temp.txt && mv /tmp/temp.txt /tmp/provider.tf", { encoding: 'utf8', stdio: 'inherit' });


//ROLEARN.  SESSIONAME

// // template for modifying files
// // execSync("awk -v env_var=\"$EXID\" -v env_var2=\"$REGION\"  '{gsub(/XXXXX/,env_var);gsub(/YYYYY/,env_var2)}1' /opt/FOLDER2/cloudformation/build spec_s3_DDB_Create.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/FOLDER2/cloudformation/build spec_s3_DDB_Create.yml", { encoding: 'utf8', stdio: 'inherit' }); 
// // execSync("awk -v env_var=\"$EXID\"  '{gsub(/XXXXX/,env_var)}1' /opt/CF_TEMP/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 





  const cid5 = await codecommit.getBranch(params4).promise();
  const cid6 = cid5.branch['commitId'];
  var params8 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/backend.tf',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/terraform/sharedservices/lz-deployment/backend.tf', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed backend.tf by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid6
};
const response8 = await codecommit.putFile(params8).promise();
console.log('Pushed backend.tf by Lambda',response8) ;


  const cid7 = await codecommit.getBranch(params4).promise();
  const cid8 = cid7.branch['commitId'];
  var params9 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/provider.tf',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/terraform/sharedservices/lz-deployment/provider.tf', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed provider.tf by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid8
};
const response9 = await codecommit.putFile(params9).promise();
console.log('Pushed provider.tf by Lambda',response9) ;


// lines below is for pushing website form info to repo terraform.tfvars file
  const cid9 = await codecommit.getBranch(params4).promise();
  const cid10 = cid9.branch['commitId'];
  var params3 = {
  branchName: 'OnlyPipeline1', /* required */
  fileContent: bigstring , /* required */
  filePath: 'FOLDER2/terraform/sharedservices/lz-deployment/terraform.tfvars', /* required */
  repositoryName: 'onramp_pipeline_cc_repo',             //'chris-temp', /* CHANGE TO REPO IN AFT ACCOUNT AND UNCOMMENT STS ASSUME ROLE ABOVE */
  commitMessage: 'Pushed terraform.tfvars by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid10
};
const response2 = await codecommit.putFile(params3).promise();
console.log('Pushed terraform.tfvars by Lambda',response2); 



// lines 131-143 is how to wirte file contents and push to repo
  const cid = await codecommit.getBranch(params4).promise();
  const cid2 = cid.branch['commitId'];
  var params6 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/buildspec_s3_DDB_Create.yml',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/cloudformation/buildspec_s3_DDB_Create.yml', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed buildspec_s3_DDB_Create.yml by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid2
};
const response6 = await codecommit.putFile(params6).promise();
console.log('Pushed buildspec_s3_DDB_Create.yml by Lambda',response6) ;



  const cid3 = await codecommit.getBranch(params4).promise();
  const cid4 = cid3.branch['commitId'];
  var params7 = {
  branchName: 'OnlyPipeline1', //* required */ PLS CHANGE BACK TO MAIN BRANCH WHEN YOU DEPLOY TO AFT ACCT
  fileContent: fs.readFileSync('/tmp/buildspec_CF_role.yml',{encoding:'utf8', flag:'r'}) , /* required */
  filePath: 'FOLDER2/cloudformation/buildspec_CF_role.yml', /* required */
  repositoryName: 'onramp_pipeline_cc_repo', //* required */  CHANGE TO CC REPO IN AFT ACCOUNT
  commitMessage: 'Pushed buildspec_CF_role.yml by Lambda',
  email: 'chris@yahoo.com',
  name: 'Christopher',
  parentCommitId: cid4
};
const response7 = await codecommit.putFile(params7).promise();
console.log('Pushed buildspec_CF_role.yml by Lambda', response7) ;

  } catch (err) {
    console.log(err.message);
    throw err;
  }
  
}


