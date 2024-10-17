import {md2html, pug2html} from "./_libs/render.js";
import fg from "fast-glob";

switch (process.argv[2]) {
    case "test":
        test();
        break;
    case "build":
        break;
}

function test() {
    let a = fg.globSync(`${process.env.PWD}/_pages/**/*.json`);
    console.log(a);
}