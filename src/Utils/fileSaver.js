export default function fileSaver(file, i) {
  try {
    const blob = new Blob([file], {type: 'image/jpeg'})
    console.log(blob)
    const downloadUrl = window.URL.createObjectURL(blob)
    console.log(downloadUrl)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `image_from_pdf_${i}.jpg`
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
  catch (e) {
    console.log(e)
  }
}