import fg from "fast-glob";
import fs from "fs-extra";
import * as sass from "sass";
import path from "path";
import {md2json, pug2html} from "./render.js";

const root = process.env.PWD;
const mdfiles = fg.globSync(`${root}/_pages/**/*.md`);
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
    // 포스팅 저장용 임시파일
    let h = new Map();

    // 포스팅 빌드
    for (let x of mdfiles) {
        let parsed = path.parse(x);
        let ver = parsed.name.match(/\[\S*\]/g)?.[0];
        if (!ver) continue;

        let name = parsed.name.replace(ver, "");
        let content = md2json(x);
        fs.outputJSONSync(`${root}/_site/pages/${name}.json`, content);

        let dir = parsed.dir.replace(`./_pages`, ``);
        if (dir) {
            if (!h.has(dir)) h.set(dir, new Map());
            h.get(dir).set(`/pages/${name}`, [content.title, content.updated]);
        }
    }

    // 네비게이션 페이지 빌드
    for (let x of nav) {
        if (h.has(x)) {
            let dir = h.get(x);
            let title = `${x.title} 관련 포스팅들`;
            let description = `${x.title} 관련 표스팅 링크 리스트`;
            let updated = today;
            let content = `<h1>${title}</h1><div class="meta">${description}</div><div class="meta">Last Updated: ${updated}</div>`;
            for (let [address, [title, updated]] of dir) {
                content += `<p><a href=${address}>${title}</a> <span>${updated}</span></p>`;
            }
            fs.outputJSONSync(`${root}/_site${dir}.json`, {layout: "nav", title, description, updated, content});
        }
    }

    // sitemap.xml 빌드
    {
        let content = `<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        content += `<url><loc>https://ehzl7b.github.io/</loc></url>`;
        for (let dir of h) {
            content += `<url><loc>https://ehzl7b.github.io${dir}</loc></url>`;
            for (let [address, _] of dir) {
                content += `<url><loc>https://ehzl7b.github.io${address}</loc></url>`;
            }
        }
        content += `</urlset>`;

        fs.outputFileSync(`${root}/_site/sitemap.xml`, content, "utf-8");
    }
    // doctype xml
    // urlset(xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    //     each page in pages
    //         url
    //             loc https://tezyns.github.io#{page.pathname}
};

export const build_sitehtml = async () => {
    let content = pug2html(`${root}/_layouts/base.pug`, {site, nav});
    fs.outputFileSync(`${root}/_site/index.html`, content, "utf-8");
    fs.copyFileSync(`${root}/_site/index.html`, `${root}/_site/404.html`);
};