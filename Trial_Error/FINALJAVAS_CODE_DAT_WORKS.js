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
  
  execSync('rm -rf /tmp/*', { encoding: 'utf8', stdio: 'inherit' })
  execSync('cd /tmp && git clone https://github.com/chris-cloudreach/sunnychris', { encoding: 'utf8', stdio: 'inherit' })
  
  execSync('cd /tmp/sunnychris && touch FINALTESTWITHDDBSTREAM.py && git config --local user.email "christopher.ogbunuzor@cloudreach.com" && git config --local user.name "chris-cloudreach" && git add . && git commit -m"INIT - Lambda commit" && git remote rm origin && git remote add origin https://chris-cloudreach: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@github.com/chris-cloudreach/sunnychris && git push --set-upstream origin main', { encoding: 'utf8', stdio: 'inherit' })


  


   
    
    

};



// const { execSync } = require('child_process')

// exports.handler = function (event, context, callback) {
//   execSync('rm -rf /tmp/*', { encoding: 'utf8', stdio: 'inherit' })
//   execSync('cd /tmp && git clone https://github.com/chris-cloudreach/sunnychris', { encoding: 'utf8', stdio: 'inherit' })
  
//   execSync('cd /tmp/sunnychris && touch addnewfile222222copeexactHOORAY.py && git config --local user.email "christopher.ogbunuzor@cloudreach.com" && git config --local user.name "chris-cloudreach" && git add . && git commit -m"INIT - Lambda commit" && git remote rm origin && git remote add origin https://chris-cloudreach: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@github.com/chris-cloudreach/sunnychris && git push --set-upstream origin main', { encoding: 'utf8', stdio: 'inherit' })


//   //return execSync('ls /tmp/sunnychris', { encoding: 'utf8' }).split('\n')
// }




