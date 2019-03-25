//Constant Variables
const SVG = require('svgi');
var fs = require('fs'), path = require('path'), xmlReader = require('read-xml');
//Global Variables
//use to test
compareSVGPaths('./svgs/1.svg', './svgs/2.svg');
function compareSVGPaths(svgFilename1, svgFilename2) {
    //getSVGData(svgFilename2);
    checkPathMatches(svgFilename1, svgFilename2);
}
function getPathArraySVG(svgFileName) {
    return new Promise((resolve, reject) => {
        'use strict';
        //Read the XML data in by filename
        xmlReader.readXML(fs.readFileSync(svgFileName), function (err, data) {
            if (err) {
                console.error(err);
            }
            let svg = new SVG(data.content);
            let svgData = svg.report();
            let svgPaths, path;
            let paths = [];
            if (svgData["nodes"]["children"][1]["children"]) {
                svgPaths = svgData["nodes"]["children"][1]["children"];
                for (let item of svgPaths) {
                    if (item["properties"]["d"]) {
                        path = item["properties"]["d"];
                        paths.push(path);
                        //   console.log(path)
                    }
                }
                // console.log(paths)
                resolve(paths);
            }
        });
    });
}
async function checkPathMatches(svgFilename1, svgFilename2) {
    let pathArray1, pathArray2;
    let matchCount = 0;
    //Assume for now only two files
    await getPathArraySVG(svgFilename1).then(data => {
        //   console.log(data)
        pathArray1 = data;
    });
    await getPathArraySVG(svgFilename2).then(data => {
        // console.log(data)
        pathArray2 = data;
    });
    for (let path of pathArray1) {
        for (let path2 of pathArray2) {
            if (path == path2) {
                matchCount += 1;
            }
        }
    }
    console.log("matches", matchCount);
}
//SVG Structure for reference
// M = moveto
// L = lineto
// H = horizontal lineto
// V = vertical lineto
// C = curveto
// S = smooth curveto
// Q = quadratic Bézier curve
// T = smooth quadratic Bézier curveto
// A = elliptical Arc
// Z = closepath
