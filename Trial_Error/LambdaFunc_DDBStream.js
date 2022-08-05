const { execSync } = require('child_process');
exports.handler = function (event, context, callback) {
    var arr = [];
    
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        // console.log(record.dynamodb.NewImage.formData.S);
        //console.log(record.dynamodb.NewImage.formData);
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
        
        
        // console.log('DynamoDB Record: %j', record.dynamodb);
          //callback(null, "message");
    });
    console.log(arr);
    var fs = require('fs');
    // var data = JSON.stringify(account_name);
    // var c_name = 'copc547';  
    var _acctnos = "account_id = "+ JSON.stringify(arr[2]) + "\n";
    var _region = "aws_region = "+ JSON.stringify(arr[6]) + "\n";
    var _extid = "external_id = "+ JSON.stringify(arr[3]) + "\n";
    var _cidr = "vpc_cidr = "+ JSON.stringify(arr[4]) + "\n";
    var _whitelist = "whitelist = ["+ JSON.stringify(arr[5]) + ']' + "\n";
    var _vpcname = "vpc_name = "+ JSON.stringify(arr[7]) + "\n";
    var _customername = "customer_name = "+ JSON.stringify(arr[1]) + "\n";
    var _acctname = "account_name = "+ JSON.stringify(arr[1]) + "\n";


    
    var bigstring = _acctname + _customername + _acctnos + _region + _extid + _cidr + _whitelist + _vpcname;
   
    
    
    process.env.CUSTNAME = arr[1];
    
   

    
  execSync('rm -rf /tmp/*', { encoding: 'utf8', stdio: 'inherit' }); 
  execSync('cd /tmp && git clone https://github.com/chris-cloudreach/demoRepoWed && cd /tmp/demoRepoWed && git checkout -b $CUSTNAME', { encoding: 'utf8', stdio: 'inherit' });
  // since cloudreach repo is private, clone it using pat below
  // git clone https://your_username:your_github_token@github.com/username/private-repo.git
  // https://github.com/cloudreach/onramp-customers.git
  
  fs.writeFileSync('/tmp/demoRepoWed/terraform/lz-deployment/terraform.tfvars', bigstring, { flag: 'a+' }, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});






// var logger = fs.createWriteStream('/tmp/demoRepoWed/terraform.tfvars', {flags: 'a' });

// logger.on('open', () => {
//     logger.write(_acctname);
//     logger.write(_region);

//     // Important to close the stream when you're ready
//     logger.end();
// });


  // logger.write(_acctname+ "\n");
  // logger.write(_region+ "\n");
  // logger.write(_extid+ "\n");
  // logger.end();
  
  //execSync('cd /tmp/demoRepoWed && touch terraform.tfvars', { encoding: 'utf8', stdio: 'inherit' })
  //execSync(' echo account_name = $account_name  >> /tmp/demoRepoWed/terraform.tfvars ', { encoding: 'utf8', stdio: 'inherit' })
  
  execSync('cd /tmp/demoRepoWed && git config --local user.email "christopher.ogbunuzor@cloudreach.com" && git config --local user.name "chris-cloudreach" && git add . && git commit -m"ADD - Create terraform tfvars file via Lambda commit 11 April 2022" && git remote rm origin && git remote add origin https://chris-cloudreach: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@github.com/chris-cloudreach/demoRepoWed && git push --set-upstream origin $CUSTNAME', { encoding: 'utf8', stdio: 'inherit' });


  


   
    
    

};







