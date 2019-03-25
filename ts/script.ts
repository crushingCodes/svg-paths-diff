//Constant Variables
const SVG = require('svgi')
var fs = require('fs'),
    path = require('path'),
    xmlReader = require('read-xml');
//Global Variables
let svgPathsFoundObject = {};

let filename1 = "", filename2 = "";

//use to test
compareSVGPaths('./svgs/1.svg', './svgs/2.svg')


function compareSVGPaths(svgFilename1: string, svgFilename2: string) {


    //getSVGData(svgFilename2);
    checkPathMatches(svgFilename1,svgFilename2);

}
function getPathArraySVG(svgFileName: string):string[] {
    'use strict';

    //Read the XML data in by filename
    xmlReader.readXML(fs.readFileSync(svgFileName), function (err, data) {
        if (err) {
            console.error(err);
        }


        let svg = new SVG(data.content)
        let svgData = svg.report();
        let svgPaths, path;
        let paths = [];
        if (svgData["nodes"]["children"][1]["children"]) {
            svgPaths = svgData["nodes"]["children"][1]["children"]
            for (let item of svgPaths) {
                if (item["properties"]["d"]) {
                    path = item["properties"]["d"]
                    paths.push(path)
                    console.log(path)
                }
            }
            return paths;
        }
    });
    return null;
}

function checkPathMatches(svgFilename1:string,svgFilename2:string) {
    let pathArray1, pathArray2;

    //Assume for now only two files
    pathArray1=getPathArraySVG(svgFilename1);
    pathArray2=getPathArraySVG(svgFilename2);

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