//console.log('Loading function');
exports.handler = function(event, context, callback) {
    //console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        // console.log(record.dynamodb.NewImage.formData.S);
        //console.log(record.dynamodb.NewImage.formData);
        var res = JSON.parse(record.dynamodb.NewImage.formData["S"])
        var email = res.email
        var acct = res.AccountNumber
        var extid = res.ext_id
        var region = res.region
        var cidr = res.cidr
        // console.log(typeof(res))
        console.log(region)
        
        // console.log('DynamoDB Record: %j', record.dynamodb);
    });
    // console.log(event.Records.dynamodb)
    callback(null, "message");
};
