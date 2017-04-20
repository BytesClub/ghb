/*
 * ght is a command line tool for GitHub at Terminal
 *
 * Sample Usage:
 *
 * $ ght config
 * Username: <username>
 * Password: <password>
 *
 * $ ght add url <url>
 *
 * $ ght get issue [open/closed]
 *
 * $ ght add issue
 *
 * $ ght get pulls [open/merged/closed]
 *
 * $ ght add pulls
 *
 */

const argv  = process.argv,
      https = require('https'),
      fs    = require('fs'),
      readL = require('readline'),
      conf  = './ght.config.json',
      issue = './ght.issue.json',
      pulls = './ght.pull.json'

let index = 1

var config = JSON.parse(fs.readFileSync(conf, 'utf8'))/*,
    issues = JSON.parse(fs.readFileSync(issue, 'utf8')),
    pullRq = JSON.parse(fs.readFileSync(pulls, 'utf8'))*/

const rL = readL.createInterface({
  input: process.stdin,
  output: process.stdout
}),
  host = 'api.github.com',
  pathUrl = config.url.replace('https://www.github.com', '/repos')

switch (argv[index + 1]) {
  case 'config':
    rL.question('Username: ', (user) => {
      config.user = user
      fs.writeFileSync(conf, JSON.stringify(config), 'utf8')
      rL.close()
      process.exit(0)
    })
    break
  case 'set-url':
    if (typeof argv[index + 2] === 'undefined')
      throw `Fatal Error: No Git url specified!`
    config.url = argv[index + 2]
    fs.writeFileSync(conf, JSON.stringify(config), 'utf8')
    process.exit(0)
  case 'get':
    if (typeof config === 'undefined' || (Object.keys(config).length === 0 && config. constructor === Object) || typeof config.url === 'undefined')
      throw `Fatal Error: Git url is not defined!`
    if (typeof argv[index + 2] === 'undefined')
      throw `Fatal Error: No Git operation specified!\n\nUsage: ${argv[index]} get [options]\nOptions:\nissue: Get Issues\npulls: Get Pull Requests`
    switch (argv[index + 2]) {
      case 'issue':
        https.get({
          hostname: host,
          path: pathUrl,
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
          }
        }, 
          (res) => {
          console.log('statusCode:', res.statusCode)
          console.log('headers:', res.headers)

            res.on('data', (d) => {
              //let fd = fs.createWriteStream(issue)
              //fd.write(d)
              process.stdout.write(d)
            })
            //process.exit(0)
          }).on('error', (err) => {
            throw err
          })
        // process.exit(0)
        break
      default:
        throw `Fatal Error: Invalid Git operation specified!\n\nUsage: ${argv[index]} get [options]\nOptions:\nissue: Get Issues\npulls: Get Pull Requests`
    }
}
