const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({  auth: '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'});

exports.handler = async (event) => {
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
    
    
    // creating static string for tfvars file

    
    const owner = 'chris-cloudreach';
    const name = 'onramp-'+arr[1];
    const private = true;
    const repo = 'onramp-'+arr[1];

    const template_owner = 'chris-cloudreach';
    const template_repo = 'demoRepo2';

    const url =  '/repos/{owner}/{repo}/{path}'; // leave this as is
    const ref =  'heads/main'; // 'master' represents the name of my primary branch

    await octokit.repos.createUsingTemplate({
        template_owner,
        template_repo,
        name,
        private
      });

      // create pipeline in customer's account
    //   connect to repo2
    //   write to another tfvars file to kick itoff

    const commits = await octokit.repos.listCommits({
        owner,
        repo,
    });

    const latestCommitSHA = commits.data[0].sha;


    const files = [{
        mode: '100644',
        path: 'terraform/lz-deployment/terraform.tfvars',
        content: bigstring 
    }];

    const {
        data: { sha: treeSHA },
    } =  await octokit.git.createTree({
        owner,
        repo,
        tree: files,
        base_tree: latestCommitSHA,
    });

    const {
        data: { sha: newCommitSHA },
    } =  await octokit.git.createCommit({
        owner,
        repo,
        tree: treeSHA,
        message: 'Changes via API',
        parents: [latestCommitSHA],
    });

    const response = await octokit.git.updateRef({
        owner,
        repo,
        ref,
        sha: newCommitSHA,
    });
   
};

