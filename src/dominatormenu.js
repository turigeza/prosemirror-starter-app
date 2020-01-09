import {Plugin} from "prosemirror-state"

export class DominatorMenu {

    // items - menu items
    // editorView -
    // dom - menu div
    // mousedown - true : false helps us debounce selection change

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
            console.dir(view);
            // console.log(view.lastSelectedViewDesc);
            // console.log(JSON.stringify(view.state,  null, 4));
            // console.log(view.state.selection);

            // node is selected selection type is NodeSelection
            // if(view.state.selection.node){
            //     console.log(view.state.selection.constructor.name);
            // }
            // if(view){
            //     console.log(view.state.selection.constructor.name);
            // }

            if(view.state.selection.constructor.name === 'NodeSelection'){
                console.log(view.state.selection.node);
            }
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
        this.items.forEach(({command, dom}) => {
            // let active = command(this.editorView.state, null, this.editorView);
            // console.log(active);
            // dom.style.display = active ? "" : "none";
        })
    }

    destroy() {
        this.editorView.dom.removeEventListener("mouseup");
        this.editorView.dom.removeEventListener("mousedown");
        this.dom.remove();
    }
}

function traverse(x) {
  if (isArray(x)) {
    traverseArray(x)
  } else if ((typeof x === 'object') && (x !== null)) {
    traverseObject(x)
  } else {

  }
}

function traverseArray(arr) {
  arr.forEach(function (x) {
    traverse(x)
  })
}

function traverseObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      traverse(obj[key])
    }
  }
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
