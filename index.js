import {md2html, pug2html} from "./_libs/render.js";
import {build_assets, build_pages, build_sitehtml} from "./_libs/build.js";
import fg from "fast-glob";

switch (process.argv[2]) {
    case "test":
        test();
        break;
    case "build":
        build_assets();
        console.log("building assets are done.");
        build_pages();
        console.log("building pages are done.");
        build_sitehtml();
        console.log("building site is done.");
        break;
}

function test() {
    let a = fg.globSync(`${process.env.PWD}/_pages/**/*.json`);
    console.log(a);
}