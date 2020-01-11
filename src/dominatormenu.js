import {Plugin} from "prosemirror-state"
import {baseKeymap, toggleMark, setBlockType, wrapIn} from "./commands"
import {schema} from "./schema-basic"

import DOMinatorMenuButton from "./DOMinatorMenuButton"
import DOMinatorMenuDropdown from "./DOMinatorMenuDropdown"
import DOMinatorMenuInput from "./DOMinatorMenuInput"
import DOMinatorSubMenu from "./DOMinatorSubMenu"

export default class DOMinatorMenu {

    // items - menu items
    // editorView -
    // dom - menu div
    // mousedown - true : false helps us debounce selection change
    // dominator
    // editorSchema
    // leftMenuDom
    // rightMenuDom

    constructor(dominator, editorView) {
        this.dominator = dominator;

        this.editorView = editorView;
        this.editorSchema = dominator.editorSchema;

        this.initMenu();

        this.update();
        document.body.classList.add("dominatorMenuActive");
        // this.dom.addEventListener("mousedown", e => {
        //     e.preventDefault()
        //     this.editorView.focus()
        //     // this.items.forEach(({command, dom}) => {
        //     //     if (dom.contains(e.target)){
        //     //         command(this.editorView.state, this.editorView.dispatch, this.editorView);
        //     //     }
        //     // })
        // })

        this.editorView.dom.addEventListener("mousedown", e => {
            this.mousedown = true;
        });

        this.editorView.dom.addEventListener("mouseup", e => {
            this.mousedown = false;
            this.update(this.editorView);
        });
    }

    update(view) {
        if(this.mousedown){
            return;
        }

        // console.dir(view);
        // traverse(view)
        if(view){
            if(!view){
                return;
            }

            // console.dir(view);
            console.dir(view.state.selection);
            
            // make all submenues invisible then make the matching submenu visible
            Object.keys(this.submenus).forEach(key=>{
                this.submenus[key].hide();
            });

            if(view.state.selection.constructor.name === 'TextSelection'){
                // watch out because text selection responds to none editable custom html selection as well
                console.log('Text Selection');
            }else if (view.state.selection.constructor.name === 'NodeSelection'){
                console.log('Node Selection');
            }



            // console.log(JSON.stringify(view.state,  null, 4));
            // console.log(view.state.selection);

            // node is selected selection type is NodeSelection
            // if(view.state.selection.node){
            //     console.log(view.state.selection.constructor.name);
            // }
            // if(view){
            //     console.log(view.state.selection.constructor.name);
            // }


        }

        // there is a selected node
        if(view && view.lastSelectedViewDesc){

        }

        // console.log(JSON.stringify(view, null, 4));
        // view.lastClick
        // time: 1578571884813
        // x: 580
        // y: 297
        // type: "singleClick"



        //console.log('update');
        //console.log(this.editorView);
        // this.items.forEach(({command, dom}) => {
        //     // let active = command(this.editorView.state, null, this.editorView);
        //     // console.log(active);
        //     // dom.style.display = active ? "" : "none";
        // })
    }

    initMenu(){
        // this.items = [
        //     {
        //         command: toggleMark(this.editorSchema.marks.strong),
        //         dom: this.icon("B", "strong")
        //     },
        //     {
        //         command: toggleMark(this.editorSchema.marks.em),
        //         dom: this.icon("i", "em")
        //     },
        //     {
        //         command: setBlockType(this.editorSchema.nodes.paragraph),
        //         dom: this.icon("p", "paragraph")
        //     },
        //     this.heading(1),
        //     this.heading(2),
        //     this.heading(3),
        //     {
        //         command: wrapIn(this.editorSchema.nodes.blockquote),
        //         dom: this.icon(">", "blockquote")
        //     }
        // ];

        let align_center = { key: 'align_center', icon: 'align-center', command: toggleMark(this.editorSchema.marks.strong) };
        let align_left = { key: 'align_left', icon: 'align-left', command: toggleMark(this.editorSchema.marks.strong) };
        let align_right = { key: 'align_right', icon: 'align-right', command: toggleMark(this.editorSchema.marks.strong) };
        let devider = { key: 'devider', html: '<span class=""></span>' };

        this.submenus = {
            inline: new DOMinatorSubMenu({
                key: 'inline',
                items: [
                    new DOMinatorMenuButton ({
                        key: 'bold',
                        icon: 'bold',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'italic',
                        icon: 'italic',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'underline',
                        icon: 'underline',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link',
                        icon: 'link',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'strikethrough',
                        icon: 'strikethrough',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'subscript',
                        icon: 'subscript',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'superscript',
                        icon: 'superscript',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'remove_formatting',
                        icon: 'eraser',

                    }),
                ]
            }),
            a: new DOMinatorSubMenu({
                key: 'a',
                items: [
                    new DOMinatorMenuInput ({
                        key: 'href',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'unlink',
                        icon: 'chain-broken',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_external',
                        icon: 'external-link',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_style_default',
                        icon: 'paint-brush',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_style_primary',
                        icon: 'paint-brush',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_style_warning',
                        icon: 'paint-brush',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_style_danger',
                        icon: 'paint-brush',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_style_success',
                        icon: 'paint-brush',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'link_style_info',
                        icon: 'paint-brush',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                ]
            }),
            paragraph: new DOMinatorSubMenu({
                key: 'paragraph',
                items: [
                    new DOMinatorMenuButton ({
                        key: 'outdent',
                        icon: 'outdent',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'indent',
                        icon: 'indent',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'list_ul',
                        icon: 'list-ul',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'list_ol',
                        icon: 'list-ol',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'paragraph',
                        icon: 'paragraph',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'undo',
                        icon: 'undo',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'redo',
                        icon: 'repeat',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                    new DOMinatorMenuButton ({
                        key: 'layouts',
                        icon: 'columns',
                        command: toggleMark(this.editorSchema.marks.strong)
                    }),
                ]
            })
        }

        this.dom = document.createElement("div")
        this.dom.className = "DOMinatorMenu"

        Object.keys(this.submenus).forEach(key=>{
            this.dom.appendChild( this.submenus[key].getDom() );
        });

        // this.items.forEach(({dom}) => this.dom.appendChild(dom))
    }

    // Create an icon for a heading at the given level
    heading(level) {
        return {
            command: setBlockType(this.editorSchema.nodes.heading, {
                level
            }),
            dom: this.icon("H" + level, "heading")
        }
    }

    // Helper function to create menu icons
    icon(text, name) {
        let span = document.createElement("span")
        span.className = "menuicon " + name
        span.title = name
        span.textContent = text
        return span;
    }

    destroy() {
        this.editorView.dom.removeEventListener("mouseup");
        this.editorView.dom.removeEventListener("mousedown");
        this.dom.remove();
    }
}
