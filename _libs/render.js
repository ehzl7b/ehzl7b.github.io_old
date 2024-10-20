import hljs from "highlight.js";
import markdownIt from "markdown-it";
import matter from "gray-matter";
import pug from "pug";

// hljs 초기화
hljs.registerLanguage("pseudo", (hljs) => {
    return {
        aliases: ["ps"],
        contains: [
            {
                className: "comment",
                begin: /#/,
                end: /$/,
            },
            {
                className: "leadline",
                begin: /[|/\\=+<>∧∨-]+/,
            },
        ],
    };
});

// markdown-it 초기화
const parse_md = markdownIt({
    html: true,
    xhtmlOut: true,
    highlight: (code, lang) => {
        const language = hljs.getLanguage(lang) ?? "plaintext";
        
        let line_target = new Map();
        let code_modified = code.trim().split("\n").map((x, i) => {
            if (x.endsWith("\+") || x.endsWith("\-") || x.endsWith("\=")) {
                line_target(i, x.at(-1));
                x = x.slice(0, -2);
            }
            return x;
        }).join("\n");
        
        let parsed = hljs.highlight(code_modified, {language}).value.trim().split("\n");
        return parsed.map((x, i) => {
            return `<span class="codeline ${line_target.get(i) ?? ""}">${x}</span>`;
        }).join("\n");
    },
});

export const md2html = (file) => {
    let {content, data} = matter.read(file);
    content = parse_md.render(content);
    content = `<h1>${data.title}</h1><div class="meta">${data.description}</div><div class="meta">Last Updated: ${data.updated}</div>` + content;
    return content;
};

export const pug2html = (file, args={}) => {
    let content = pug.compileFile(file)(args);
    return content;
};

export const md2json = (file) => {
    let {content, data} = matter.read(file);
    content = parse_md.render(content);
    content = `<h1>${data.title}</div>`;
    content = `<h1>${data.title}</h1><div class="meta">${data.description}</div><div class="meta">Last Updated: ${data.updated}</div>` + content;
    
    let obj = {};
    Object.assign(obj, data);
    Object.assign(obj, {content: content});
    return obj;
};