//Constant Variables
const parse = require('parse-svg-path');
const extract = require('extract-svg-path');

//Global Variables
let pathsFound={};

//use to test
getSVGData('./svgs/1.svg')
getSVGData('./svgs/2.svg')
console.log(pathsFound);

function getSVGData(svgFileName:string){

let path = extract(svgFileName)
let svg = parse(path)
console.log(svgFileName);
//console.log(svg);
let pathString="";
let key="";
let x=0;
let y=0;
for(let z=0;z<svg.length;z++){
    key=svg[z][0];
    //Handle new path
    if(z>1 && (key=='m' || key=="M")){
        //Char m signals start of new path

       // console.log(pathString);
       pathsFound[pathString]=pathsFound[pathString]+1 || 1;
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
    pathsFound[pathString]=pathsFound[pathString]+1 || 1;
    pathString="";

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