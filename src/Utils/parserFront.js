import fileSaver from "./fileSaver";

export default async function parserFront(existingPdfBytes) {
  try {
    const myBuffer = Buffer.from(existingPdfBytes.split(',')[1], 'base64');
    const convertedBuffer = new Uint8Array(myBuffer)
    const firstBeginSignatureSymbol = parseInt('ff', 16)
    const secondBeginSignatureSymbol = parseInt('d8', 16)
    const indexesStartSignatureImage = []
    convertedBuffer.forEach((el, i) => {
      if (el === firstBeginSignatureSymbol &&
        convertedBuffer[i + 1] === secondBeginSignatureSymbol &&
        convertedBuffer[i + 2] === firstBeginSignatureSymbol &&
        (convertedBuffer[i + 3] === parseInt('e0', 16) ||
          convertedBuffer[i + 3] === parseInt('e1', 16) ||
          convertedBuffer[i + 3] === parseInt('e2', 16) ||
          convertedBuffer[i + 3] === parseInt('e3', 16) ||
          convertedBuffer[i + 3] === parseInt('e8', 16))) {
        indexesStartSignatureImage.push(i)
      }
    })
    const resultSlicedCodeImage = indexesStartSignatureImage.reduce((arr, el) => {
      arr.push(convertedBuffer.slice(el));
      return arr
    }, [])
    if (!resultSlicedCodeImage.length) {
      alert('Изображений в файле нет')
    } else {
      resultSlicedCodeImage.forEach((file, i) => {
        fileSaver(file, i)
      })
    }
  }
  catch (e) {
    console.log(e)
  }
}