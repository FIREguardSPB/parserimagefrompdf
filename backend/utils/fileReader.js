const path = require('path')
const fs = require('fs')
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..', '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const rootPath = path.join(isPkg ? pkgPath : notPkgPath)

module.exports = async function fileReader() {
  return await new Promise((resolve, reject) => {
    fs.readFile(path.join(rootPath, '.env'), 'utf-8',(err, result) => {
      if(err){
        resolve(false)
      }
      if (!err) {
        resolve(result)
      }
    })
  })
}
