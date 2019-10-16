// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708
function strip(html){
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

function processText(html) {
  const text = strip(html)
  console.log(text)
}

export default processText
