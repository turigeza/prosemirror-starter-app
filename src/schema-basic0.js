// The basic shema got a from prosemirror-schema-basic and then modified to our needs
import {
    Schema
} from "prosemirror-model"

// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
    // :: NodeSpec The top level document node.
    doc: {
        content: "block+"
    },

    // :: NodeSpec A plain paragraph textblock. Represented in the DOM
    // as a `<p>` element.
    paragraph: {
        content: "inline*",
        group: "block",
        attrs: {
            className: {
                default: ''
            }
        },
        parseDOM: [{
            tag: "p",
            getAttrs: dom => {
                let attrs = {};

                // class
                if(dom.className){
                    attrs.className = dom.className;
                }
                return attrs;
            }
        }],
        toDOM(node) {
            let attrs = {};
            if(node.attrs.className !== ''){
                attrs.class = node.attrs.className;
            }
            return ["p", attrs, 0];

        }
    },

    // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
    blockquote: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: "blockquote"
        }],
        toDOM() {
            return ["blockquote", 0];
        }
    },

    // :: NodeSpec A horizontal rule (`<hr>`).
    horizontal_rule: {
        group: "block",
        parseDOM: [{
            tag: "hr"
        }],
        toDOM() {
            return ["hr"];
        }
    },

    // :: NodeSpec A heading textblock, with a `level` attribute that
    // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
    // `<h6>` elements.
    heading: {
        attrs: {
            level: {
                default: 1
            },
            className: {
                default: ''
            }
        },
        content: "inline*",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: "h1, h2, h3, h4, h5, h6",
            getAttrs: dom => {
                let attrs = {};

                // level
                if(dom.nodeName === 'H1'){
                    attrs.level = 1;
                }else if(dom.nodeName === 'H2'){
                    attrs.level = 2;
                }else if(dom.nodeName === 'H3'){
                    attrs.level = 3;
                }else if(dom.nodeName === 'H4'){
                    attrs.level = 4;
                }else if(dom.nodeName === 'H5'){
                    attrs.level = 5;
                }else if(dom.nodeName === 'H6'){
                    attrs.level = 6;
                }else{
                    console.error('No way ! ' + dom.nodeName);
                }

                // class
                if(dom.className){
                    attrs.className = dom.className;
                }

                return attrs;
            }
        }],
        toDOM(node) {
            let attrs = {};
            if(node.attrs.className !== ''){
                attrs.class = node.attrs.className;
            }
            return ["h" + node.attrs.level, attrs, 0]
        }
    },

    // :: NodeSpec A code listing. Disallows marks or non-text inline
    // nodes by default. Represented as a `<pre>` element with a
    // `<code>` element inside of it.
    code_block: {
        content: "text*",
        marks: "",
        group: "block",
        code: true,
        defining: true,
        parseDOM: [{
            tag: "pre",
            preserveWhitespace: "full"
        }],
        toDOM() {
            return ["pre", ["code", 0]];
        }
    },

    // :: NodeSpec The text node.
    text: {
        group: "inline"
    },

    // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
    // `alt`, and `href` attributes. The latter two default to the empty
    // string.
    image: {
        inline: true,
        attrs: {
            src: {},
            alt: {
                default: null
            },
            title: {
                default: null
            }
        },
        group: "inline",
        draggable: true,
        parseDOM: [{
            tag: "img[src]",
            getAttrs(dom) {
                return {
                    src: dom.getAttribute("src"),
                    title: dom.getAttribute("title"),
                    alt: dom.getAttribute("alt")
                }
            }
        }],
        toDOM(node) {
            let {
                src,
                alt,
                title
            } = node.attrs;
            return ["img", {
                src,
                alt,
                title
            }]
        }
    },

    // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
    hard_break: {
        inline: true,
        group: "inline",
        selectable: false,
        parseDOM: [{
            tag: "br"
        }],
        toDOM() {
            return ["br"];
        }
    }
}

// :: Object [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {
    // :: MarkSpec A link. Has `href` and `title` attributes. `title`
    // defaults to the empty string. Rendered and parsed as an `<a>`
    // element.
    link: {
        attrs: {
            href: {},
            title: {
                default: null
            }
        },
        inclusive: false,
        parseDOM: [{
            tag: "a[href]",
            getAttrs(dom) {
                return {
                    href: dom.getAttribute("href"),
                    title: dom.getAttribute("title")
                }
            }
        }],
        toDOM(node) {
            let {
                href,
                title
            } = node.attrs;
            return ["a", {
                href,
                title
            }, 0]
        }
    },

    // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
    // Has parse rules that also match `<i>` and `font-style: italic`.
    em: {
        parseDOM: [{
            tag: "i"
        }, {
            tag: "em"
        }, {
            style: "font-style=italic"
        }],
        toDOM() {
            return ["em", 0];
        }
    },

    // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
    // also match `<b>` and `font-weight: bold`.
    strong: {
        parseDOM: [{
                tag: "strong"
            },
            // This works around a Google Docs misbehavior where
            // pasted content will be inexplicably wrapped in `<b>`
            // tags with a font-weight normal.
            {
                tag: "b",
                getAttrs: node => node.style.fontWeight != "normal" && null
            },
            {
                style: "font-weight",
                getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
            }
        ],
        toDOM() {
            return ["strong", 0];
        }
    },

    // :: MarkSpec Code font mark. Represented as a `<code>` element.
    code: {
        parseDOM: [{
            tag: "code"
        }],
        toDOM() {
            return ["code", 0];
        }
    },
    span: {
        attrs: {
            className: {
                default: ''
            }
        },
        parseDOM: [{
            tag: "span",
            getAttrs: dom => {
                let attrs = {};

                // class
                if(dom.className){
                    attrs.className = dom.className;
                }
                return attrs;
            }
        }],
        toDOM(node) {
            let attrs = {};
            if(node.attrs.className !== ''){
                attrs.class = node.attrs.className;
            }
            return ["span", attrs, 0];
        }
    },
}

// :: Schema
// This schema roughly corresponds to the document schema used by
// [CommonMark](http://commonmark.org/), minus the list elements,
// which are defined in the [`prosemirror-schema-list`](#schema-list)
// module.
//
// To reuse elements from this schema, extend or read from its
// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
export const schema = new Schema({
    nodes,
    marks
})
