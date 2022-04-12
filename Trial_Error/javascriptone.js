// const { spawnSync } = require('child_process')
// exports.handler = async function (event, context, callback) {
//   await require('lambda-git')()
//   const clone = spawnSync('git', ['clone', 'https://github.com/chris-cloudreach/sunnychris'], {
//     cwd: '/tmp' 
//   })
//   console.log(clone.output.toString())
// git config --local user.email GITHUB_EMAIL
//git config --local user.name "chris-cloudreach && git config --global user.email "christopher.ogbunuzor@cloudreach.com
// }
const { execSync } = require('child_process')

exports.handler = async(event) => {
  execSync('rm -rf /tmp/*', { encoding: 'utf8', stdio: 'inherit' })
  execSync('cd /tmp && git clone https://github.com/chris-cloudreach/sunnychris', { encoding: 'utf8', stdio: 'inherit' })
  //var acctnos = "111111111111"
  execSync('cd /tmp/sunnychris && touch ogbunuzor2.py && git config --local user.email "christopher.ogbunuzor@cloudreach.com" && git config --local user.name "chris-cloudreach" && git add . && git commit -m"INIT - Lambda commit" && git remote rm origin && git remote add origin https://chris-cloudreach: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@github.com/chris-cloudreach/sunnychris && git push --set-upstream origin main', { encoding: 'utf8', stdio: 'inherit' })
  //execSync('touch /tmp/sunnychris/christopeher.py', { encoding: 'utf8', stdio: 'inherit' })
  

  return execSync('ls /tmp/sunnychris', { encoding: 'utf8' }).split('\n')
}