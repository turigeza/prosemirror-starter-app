export default class DOMinatorSubMenu {

    // items - the menu items
    // dom - the dom element for this submenu
    // options
    constructor(options) {
        this.options = options;
        this.items = options.items;
        this.dom = document.createElement("div");
        this.dom.className = "DOMinatorSubMenu DOMinatorSubMenu-"+this.options.key;

        this.items.forEach(item=>{
            this.dom.appendChild( item.getDom() );
            item.setParent(this);
        });
    }

    update(){
        this.items.forEach(item=>{
            if(typeof item.update === 'function'){
                item.update();
            }
        });
    }

    hide(){
        this.dom.style.display = "none";
    }

    show(){
        this.dom.style.display = "";
    }

    getDom(){
        return this.dom;
    }

    destroy() {
        this.dom.remove();
    }
}
