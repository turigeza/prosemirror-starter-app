import {Plugin, EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {addListNodes} from "prosemirror-schema-list"

// We declared this dependency directly in our project.
import {schema} from "prosemirror-schema-basic"

// bring in the prosemirror-example-setup package define this as a dependency
import {keymap} from "prosemirror-keymap"
import {history} from "prosemirror-history"
import {baseKeymap} from "prosemirror-commands"
import {dropCursor} from "prosemirror-dropcursor"
import {gapCursor} from "prosemirror-gapcursor"
import {menuBar} from "prosemirror-menu"

import {buildMenuItems} from "./menu"
import {buildKeymap} from "./keymap"
import {buildInputRules} from "./inputrules"

window.DOMinator = class DOMinator {

    constructor(options) {
        // init options
        const defaults = {
            container: ''
        };

        this.options = {
            ...defaults,
            ...options
        };

        if (!this.options.container) {
            throw 'Container selector is empty!';
        }

        // init editorSchema
        this.editorSchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
        })

        // init view
        this.view = new EditorView(document.querySelector("#editor"), {
            state: EditorState.create({
                doc: DOMParser.fromSchema(this.editorSchema).parse(document.querySelector("#content")),
                // plugins: exampleSetup({schema: this.editorSchema}),
                plugins: [
                    buildInputRules(this.editorSchema),
                    keymap(buildKeymap(this.editorSchema, this.options.mapKeys)),
                    keymap(baseKeymap),
                    dropCursor(),
                    gapCursor(),
                    history(),
                    menuBar({
                        floating: this.options.floatingMenu !== false,
                        content: this.options.menuContent || buildMenuItems(this.editorSchema).fullMenu
                    }),
                    new Plugin({
                        props: {
                            attributes: {
                                class: "ProseMirror-example-setup-style"
                            }
                        }
                    })
                ]

            })
        })
    }

}

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.

// 1) Put 'view' on window object just for easy inspection/debugging
// 2) '#editor' is the ID of the DOM element that will host the DOM.
// window.view = new EditorView(document.querySelector("#editor"), {
//
//     state: EditorState.create({
//
//         // Here the document state is read from the DOM, the HTML markup on
//         // the simple file, public/index.html page that contains the editor;
//         // '#content' is the ID of the DOM element that has your pre-prepared content
//         // to be injected into the editor.  The only reason this is done in this
//         // demo project is to prevent you from starting with a blank editor.
//         doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
//
//         // Instantiate all the plugins to make a very basic editor
//         plugins: exampleSetup({schema: mySchema})
//
//     })//,
//
//     // The rest is commented out as you have a basic editor.
//     // This section uses a sort of 'wiretap' into ProseMirror's event flow to
//     // let you see inside the basic editor model.
//
//     //dispatchTransaction( transaction ) {
//         // console.log("Document size went from", transaction.before.content.size,
//         //            "to", transaction.doc.content.size)
//
//         // console.log( 'State', JSON.stringify( this.state.toJSON(), null, 4 ))
//
//         // let newState = window.view.state.apply(transaction)
//         //window.view.updateState(newState)
//     //}
// })
