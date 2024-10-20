import fg from "fast-glob";
import fs from "fs-extra";
import * as sass from "sass";
import path from "path";
import {md2html, pug2html} from "./render.js";

const root = process.env.PWD;
const mdfiles = fg.globSync(`${root}/_pages/**/*.md`);
// const navfile = (() => {
//     let tmp = fg.globSync(`${root}/_pages/**/*.json`)?.[0];
//     if (!tmp) {
//         console.log("No json file for navigation in _pages folder");
//         process.exit(-1);
//     }
//     return tmp;
// })();
const site = {title: "EHZL7b 블로그"};
const nav = fs.readJSONSync(`${root}/_pages/nav.json`);
const today = new Date().toISOString().split("T")[0];

export const build_assets = async () => {
    // main.scss -> main.css
    const css = sass.compileAsync(`${root}/_assets/main.scss`, {style: compressed});
    fs.outputFileSync(`${root}/_site/main.css`, css.css, "utf-8");

    // copy fixed assets
    fs.copyFileSync(`${root}/_assets`, `${root}/_site`, {
        filter: (f, t) => !f.includes(".scss"),
    });
};

export const build_pages = async () => {
    // 포스팅 빌드
    for (let x of mdfiles) {
        let parsed = path.parse(x);
        let ver = parsed.name.match(/\[\S*\]/g)?.[0];
        if (!ver) continue;

        let name = parsed.name.replace(ver, "");
        let content = md2html(x);
        fs.outputFileSync(`${root}/_site/pages/${name}.html`);
    }

    // 네비게이션 페이지 빌드
    for (let x of nav) {
        let pages = mdfiles.filter((y) => path.parse(y).dir.includes(id));

        let r = `<h1>${x.title} 관련 포스팅들</h1><div class="meta">${x.title} 관련 포스팅 링크 리스트</div><div class="meta">Last Updated: ${today}</div>`;
        for (let y of pages) {
            // r += `<p><a href="${}">${}</a></p>`;
        }
        

    }

    // sitemap.xml 빌드
};

export const build_sitehtml = async () => {};