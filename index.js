import {md2html, pug2html} from "./_libs/render.js";
import fg from "fast-glob";

switch (process.argv[2]) {
    case "test":
        test();
        break;
}

function test() {
    let md = fg.globSync("./_pages/**/*.md")[0];
    if (!md) {
        console.log("No md files");
        return -1;
    }

    let a = md2html(md);
    console.log(a);

    let pug = fg.globSync("./_layouts/**/*.pug")[0];
    if (!pug) {
        console.log("no pug files");
        return -1;
    }

    let b = pug2html(pug);
    console.log(b);
}