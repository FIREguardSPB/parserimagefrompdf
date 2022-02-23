const path = require('path')
const fs = require('fs')
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..', '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const rootPath = path.join(isPkg ? pkgPath : notPkgPath)

module.exports = async function pdfReader() {
  return await new Promise((resolve, reject) => {
    console.log(rootPath)
    fs.readFile(path.join(rootPath, 'test.pdf'),(err, result) => {
      if(err){
        resolve(false)
      }
      if (!err) {
        resolve(result)
      }
    })
  })
}

// var pdfParser = new PDFParser();
// fs.readFile(pdfFilePath, function(err, pdfBuffer) {
//   pdfParser.parseBuffer(pdfBuffer);
// }, function(pdfBuffer){
//   pdfParser.parseBuffer(pdfBuffer);
// })