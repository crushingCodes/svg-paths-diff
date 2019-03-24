const parse = require('parse-svg-path');
const extract = require('extract-svg-path');
console.log("Hello world");
getSVGData('./svgs/1.svg');
function getSVGData(svgFileName) {
    let path = extract(svgFileName);
    let svg = parse(path);
    console.log(svg);
}
