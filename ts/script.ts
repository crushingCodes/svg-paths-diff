//Constant Variables
const parse = require('parse-svg-path');
const extract = require('extract-svg-path');

//Global Variables
let svgPathsFoundObject={};

let filename1="",filename2="";

//use to test
getSVGData('./svgs/1.svg')
getSVGData('./svgs/2.svg')

getPathsByFilename('./svgs/1.svg');

function compareSVGPaths(svgFilename1:string,svgFilename2:string){
filename1=svgFilename1;
filename2=svgFilename2;
}


function getSVGData(svgFileName:string){
//svgPathsFound[svgFileName]=[];
//let paths={};
let paths=[];

let path = extract(svgFileName)
let svg = parse(path)
console.log(svgFileName);
let pathString="";
let key="";
let x=0;
let y=0;
//let count=0;
for(let z=0;z<svg.length;z++){
    key=svg[z][0];
    //Handle new path
    if(z>1 && (key=='m' || key=="M")){
        //Char M or m signals start of new path
        
       paths.push(pathString)
       pathString="";
    }
    pathString+=key;
//Extract data to conform to the library from parse-svg-path
    for(let a=1;a<svg[z].length+1;a+=2){
        
        //First item in array is the key
        if(svg[z][a] && svg[z][a+1]){
         x=svg[z][a];
         y=svg[z][a+1];
         //Parse extracted data and add to string according to path structure
            pathString+=(x.toString());
            pathString+=",";
            pathString+=(y.toString());
            pathString+=" ";
        }

    }

}
    //Handle finish of path data
  //  console.log(pathString);

    paths.push(pathString)

    svgPathsFoundObject[svgFileName]=paths;
    pathString="";

}
function getPathsByFilename(fileName:string):string[]{
    let pathArray=[];
   let pathObject=svgPathsFoundObject[fileName];

    Object.entries(pathObject).forEach((svg) => {
        pathArray.push(svg[1]);

    //    console.log();
    //    console.log("path");
    //    console.log(svg[1]);
    })
    return pathArray;
}
function checkPathMatches(){
    let pathArray1,pathArray2;
    //Assume for now only two files
        pathArray1=getPathsByFilename(filename1);
        pathArray2=getPathsByFilename(filename2);
    


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