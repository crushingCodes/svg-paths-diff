//Constant Variables
const SVG = require('svgi')
var fs = require('fs'),
    path = require('path'),
    xmlReader = require('read-xml');
//Global Variables

//Test SVGs
//compareSVGPaths('./svgs/2.svg','./svgs/1.svg');


var compareSVGPaths = function(svgFilename1: string, svgFilename2: string) {
    checkPathMatches(svgFilename1,svgFilename2);
}
var getPathArraySVG = function(svgFileName: string) {
    return new Promise((resolve, reject) => {

    'use strict';

    //Read the XML data in by filename
    xmlReader.readXML(fs.readFileSync(svgFileName), function (err, data) {
        if (err) {
            console.error(err);
            reject(err);
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
                }
            }
            resolve(paths)
        }
    });
})
}
//Currently only finds exact matches and thus will return non exact paths from primary
async function checkPathMatches(primarySVGFilename:string,secondarySVGFilename:string) {
    let pathArray1, pathArray2;

    let primaryPaths={};
    let uniquePaths=[];

    //Assume for now only two files
    await getPathArraySVG(secondarySVGFilename).then(data=>{
        // console.log(data)
         pathArray1=data
     }).catch(err=>{
         return console.error(err);
     })
    await getPathArraySVG(primarySVGFilename).then(data=>{
     //   console.log(data)
        pathArray2=data
    }).catch(err=>{
        return console.error(err);
    })
    
    //Add the paths from pathArray1 and add to object
    for(let path of pathArray1){
        if(!primaryPaths[path]){
            primaryPaths[path]=true;
        }
    }
    //Check the second array for unique paths
    for(let path2 of pathArray2){
        if(!primaryPaths[path2]){
            uniquePaths.push(path2)
        }
    }
    console.log(uniquePaths);
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


//Exports
exports.compareSVGPaths = compareSVGPaths;
exports.getPathArraySVG = getPathArraySVG;