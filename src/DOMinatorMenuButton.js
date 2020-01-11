export default class DOMinatorMenuButton {
    // dom
    // options
    //

    constructor(options) {
        this.options = options;
        this.dom = document.createElement("button")
        this.dom.className = "DOMinatorMenuButton DOMinatorMenuButton-"+this.options.key;
        //document.createTextNode("Hello World");
        if(this.options.icon){
            if(typeof this.options.icon === 'string'){
                let icon = document.createElement("i");
                icon.className = 'fa fa-'+this.options.icon
                icon.setAttribute('aria-hidden', 'true');
                this.dom.appendChild(icon);
            }
        }
    }

    update(){
        if(typeof this.options.update === 'function'){
            this.options.update();
        }
    }

    destroy() {

    }

    getDom(){
        return this.dom;
    }

    setParent(parent){
        this.parent = parent;
    }
}
