// const AWS = require('aws-sdk');
const { execSync } = require('child_process');

var fs = require('fs');
var arr = ['chrisPrageeth26JUl', 'us-east-100'];

process.env.EXID = arr[0];
process.env.REGION = arr[1];





// REPLACE MULTIPLE TEXT/WORDS IN ONE AWK COMMAND
 execSync("awk -v env_var=\"$EXID\" -v env_var2=\"$REGION\"  '{gsub(/XXXXX/,env_var);gsub(/YYYYY/,env_var2)}1' /opt/CF_TEMP/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 



// REPLACE MULTIPLE TEXT/WORDS IN TWO AWK COMMAND
// execSync("awk -v env_var=\"$EXID\"  '{gsub(/XXXXX/,env_var)}1' /opt/CF_TEMP/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 
// execSync("awk -v env_var=\"$REGION\"  '{gsub(/YYYYY/,env_var)}1' /tmp/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 


// execSync("awk '{gsub(/XXXXX/,\"chrisTO\")}1' /opt/CF_TEMP/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 
// execSync("awk '{gsub(/YYYYY/,\"us-east-1\")}1' /tmp/rmdbckup.yml > /tmp/temp.txt && mv /tmp/temp.txt /tmp/rmdbckup.yml", { encoding: 'utf8', stdio: 'inherit' }); 



exports.handler = async (event) => {

try {
  const data = fs.readFileSync('/tmp/rmdbckup.yml', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
   
};
