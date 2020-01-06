import {
    Schema
} from "prosemirror-model"

const nodes = {
    doc: {
        content: "block+"
    },
    div: {
        content: "block+",
        group: "block",
        parseDOM: [{
            tag: "div"
        }],
        toDOM() {
            return ["div", 0]
        }
    },
    text: {
        group: "inline"
    },

}

const marks = {

}

export const schemaDominator = new Schema({
    nodes,
    marks
});
