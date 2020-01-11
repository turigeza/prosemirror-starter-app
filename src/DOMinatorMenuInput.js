export default class DOMinatorMenuInput {

    // dom - the dom element for this submenu
    // options

    constructor(options) {
        this.options = options;
        this.dom = document.createElement("input")
        this.dom.className = "DOMinatorMenuInput DOMinatorMenuInput-"+this.options.key;


        this.dom.setAttribute('placeholder', options.placeholder || 'More tea Vicar ... ?');
    }

    update(){
        this.items.forEach(item=>{
            if(typeof item.update === 'function'){
                item.update();
            }
        });
    }

    setParent(parent){
        this.parent = parent;
    }

    getDom(){
        return this.dom;
    }

    destroy() {
        this.dom.remove();
    }
}
