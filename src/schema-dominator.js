export default {
    layout_12: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.layout_12'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"layout layout_12"
                },
                0
            ]
        }
    },
    layout_48: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.layout_48'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"layout layout_48"
                },
                0
            ]
        }
    },
    layout_66: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.layout_66'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"layout layout_66"
                },
                0
            ]
        }
    },
    layout_84: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.layout_84'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"layout layout_84"
                },
                0
            ]
        }
    },
    layout_444: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.layout_444'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"layout layout_444"
                },
                0
            ]
        }
    },
    layout_3333: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.layout_3333'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"layout layout_3333"
                },
                0
            ]
        }
    },

    cl_3: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.cl_3'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"cl_3"
                },
                0
            ]
        }
    },
    cl_4: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.cl_4'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"cl_4"
                },
                0
            ]
        }
    },
    cl_6: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.cl_6'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"cl_6"
                },
                0
            ]
        }
    },
    cl_8: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.cl_8'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"cl_8"
                },
                0
            ]
        }
    },
    cl_12: {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
            tag: 'div.cl_12'
        }],
        toDOM() {
            return [
                "div",
                {
                    class:"cl_12"
                },
                0
            ]
        }
    },
    custom_html: {
        content: "block+",
        group: "block",
        defining: true,
        draggable: true,
        parseDOM: [{
            tag: 'div',
            // ignore: true,
            // getAttrs: dom => {
            //     console.log(dom);
            //     // let type = dom.getAttribute("dino-type")
            //     // return dinos.indexOf(type) > -1 ? {type} : false
            // }
            // getContent: dom => {
            //     return 'This is the content of it.'
            // }
        }],
        toDOM(node) {
            console.log(node);
            let n = document.createElement("div");
            n.innerHTML = '<p>Some shit</p>';
            // n.innerHtml = 'Heyho';
            // console.log(n)
            return n;

        }
    },

}
