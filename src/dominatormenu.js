import {Plugin} from "prosemirror-state"

export class DominatorMenu {

    // items - menu items
    // editorView -
    // dom - menu div

    constructor(items, editorView) {
        
        this.items = items
        this.editorView = editorView

        this.dom = document.createElement("div")
        this.dom.className = "DOMinatorMenu"
        items.forEach(({dom}) => this.dom.appendChild(dom))
        this.update();

        this.dom.addEventListener("mousedown", e => {
            e.preventDefault()
            this.editorView.focus()
            items.forEach(({command, dom}) => {
                if (dom.contains(e.target)){
                    command(this.editorView.state, this.editorView.dispatch, this.editorView);
                }
            })
        })
    }

    update() {
        //console.log('update');
        //console.log(this.editorView);
        this.items.forEach(({command, dom}) => {
            // let active = command(this.editorView.state, null, this.editorView);
            // console.log(active);
            // dom.style.display = active ? "" : "none";
        })
    }

    destroy() { this.dom.remove() }
}
