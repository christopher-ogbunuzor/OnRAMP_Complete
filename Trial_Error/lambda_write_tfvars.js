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
        var acct = res.AccountNumber;
        arr.push(acct); 
        var extid = res.ext_id;
        arr.push(extid);
        var region = res.region;
        arr.push(region);
        var cidr = res.cidr;
        arr.push(cidr);
        
        // console.log('DynamoDB Record: %j', record.dynamodb);
          //callback(null, "message");
    });
    console.log(arr);
    // var account_name = arr[1];
    var fs = require('fs');
    // var data = JSON.stringify(account_name);
    var _acctname = "account_name = "+ JSON.stringify(arr[1]) + "\n";
    var _region = "aws_region = "+ JSON.stringify(arr[4]) + "\n";
    var _extid = "vpc_cidr = "+ JSON.stringify(arr[3]) + "\n";
    var bigstring = _acctname + _region + _extid;
    // var _acctname = "account_name = "+ data;
    // var _acctname = "account_name = "+ data;
    
    

  
  execSync('rm -rf /tmp/*', { encoding: 'utf8', stdio: 'inherit' });
  execSync('cd /tmp && git clone https://github.com/chris-cloudreach/demoRepoWed', { encoding: 'utf8', stdio: 'inherit' });
  
  fs.writeFileSync('/tmp/demoRepoWed/terraform.tfvars', bigstring, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});






// var logger = fs.createWriteStream('/tmp/demoRepoWed/terraform.tfvars', {
//   flags: 'a' // 'a' means appending (old data will be preserved)
// });

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
  
  execSync('cd /tmp/demoRepoWed && git config --local user.email "christopher.ogbunuzor@cloudreach.com" && git config --local user.name "chris-cloudreach" && git add . && git commit -m"ADD - Create terraform tfvars file via Lambda commit" && git remote rm origin && git remote add origin https://chris-cloudreach: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@github.com/chris-cloudreach/demoRepoWed && git push --set-upstream origin main', { encoding: 'utf8', stdio: 'inherit' });


  


   
    
    

};







