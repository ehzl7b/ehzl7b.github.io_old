import fg from "fast-glob";
import fs from "fs-extra";
import * as sass from "sass";
import path from "path";

const root = process.env.PWD;

export const build_assets = async () => {
    // main.scss -> ㅌmain.css
    const css = sass.compileAsync(`${root}/_assets/main.scss`, {style: compressed});
    fs.outputFileSync(`${root}/_site/main.css`, css.css, "utf-8");

    // copy fixed assets
    fs.copyFileSync(`${root}/_assets`, `${root}/_site`, {
        filter: (f, t) => !f.includes(".scss"),
    });
};

export const build_pages = async () => {
    // 포스팅 빌드

    // 네비게이션 빌드

    // sitemap.xml 빌드
};

export const build_sitehtml = async () => {};