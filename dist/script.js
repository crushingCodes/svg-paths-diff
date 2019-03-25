//Constant Variables
const parse = require('parse-svg-path');
const extract = require('extract-svg-path');
//Global Variables
let svgPathsFoundObject = {};
let filename1 = "", filename2 = "";
//use to test
compareSVGPaths('./svgs/1.svg', './svgs/2.svg');
function compareSVGPaths(svgFilename1, svgFilename2) {
    filename1 = svgFilename1;
    filename2 = svgFilename2;
    getSVGData2(svgFilename1);
    //getSVGData(svgFilename2);
    //checkPathMatches();
}
function getSVGData2(svgFileName) {
    'use strict';
    var fs = require('fs'), path = require('path'), xmlReader = require('read-xml');
    //var FILE = path.join(__dirname, 'test/xml/simple-iso-8859-1.xml');
    // pass a buffer or a path to a xml file
    xmlReader.readXML(fs.readFileSync(svgFileName), function (err, data) {
        if (err) {
            console.error(err);
        }
        //  console.log('xml encoding:', data.encoding);
        //  console.log('Decoded xml:', data.content);
        const SVG = require('svgi');
        //let svg = new SVG('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="10" y="10" height="100" width="100" style="fill: #0000ff"/></svg>')
        // Get the report
        let svg = new SVG(data.content);
        // console.log(svg.report())
        let svgData = svg.report();
        let paths, path;
        if (svgData["nodes"]["children"][1]["children"]) {
            paths = svgData["nodes"]["children"][1]["children"];
            for (let item of paths) {
                if (item["properties"]["d"]) {
                    path = item["properties"]["d"];
                    console.log(path);
                }
            }
        }
        // if(svgData["nodes"]){
        // if(svgData["nodes"]["children"]){
        //     if(svgData["nodes"]["children"]){
        //         if(svgData["nodes"]["children"][1]["children"]){
        //             if(svgData["nodes"]["children"][1]["children"][0]){
        //                 if(svgData["nodes"]["children"][1]["children"][0]["properties"]){
        //                 if(svgData["nodes"]["children"][1]["children"][0]["properties"]["d"]){
        //     console.log(svgData["nodes"]["children"][1]["children"][0]["properties"]["d"])
        // }
        //                 }
        // }
        // }
        // }
        // }
        // }
    });
}
function getSVGData(svgFileName) {
    //svgPathsFound[svgFileName]=[];
    //let paths={};
    let paths = [];
    let path = extract(svgFileName);
    let svg = parse(path);
    let pathString = "";
    let key = "";
    let x = 0;
    let y = 0;
    //let count=0;
    for (let z = 0; z < svg.length; z++) {
        key = svg[z][0];
        //Handle new path
        if (z > 1 && (key == 'm' || key == "M")) {
            //Char M or m signals start of new path
            paths.push(pathString);
            pathString = "";
        }
        pathString += key;
        if (key == 'z' || key == "Z") {
            pathString += " ";
        }
        //Extract data to conform to the library from parse-svg-path
        for (let a = 1; a < svg[z].length + 1; a += 2) {
            //First item in array is the key
            if (svg[z][a] && svg[z][a + 1]) {
                x = svg[z][a];
                y = svg[z][a + 1];
                //Parse extracted data and add to string according to path structure
                pathString += (x.toString());
                //  pathString+=",";
                pathString += " ";
                pathString += (y.toString());
                pathString += " ";
            }
        }
    }
    //Handle finish of path data
    //  console.log(pathString);
    paths.push(pathString);
    svgPathsFoundObject[svgFileName] = paths;
    pathString = "";
}
function getPathsByFilename(fileName) {
    let pathArray = [];
    let pathObject = svgPathsFoundObject[fileName];
    console.log(fileName);
    Object.entries(pathObject).forEach((svg) => {
        pathArray.push(svg[1]);
        console.log();
        console.log("<path d='");
        console.log(svg[1]);
        console.log("'/>");
    });
    return pathArray;
}
function checkPathMatches() {
    let pathArray1, pathArray2;
    //Assume for now only two files
    pathArray1 = getPathsByFilename(filename1);
    pathArray2 = getPathsByFilename(filename2);
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
