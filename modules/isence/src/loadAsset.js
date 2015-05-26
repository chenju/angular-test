//preloading
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,ViewContainerRef} from 'angular2/angular2';
import {MdProgressCircular} from 'Component/progress-circular/progress_circular'
import {DOM} from 'angular2/src/dom/dom_adapter';
import {Main} from 'main'
import {Parent} from 'angular2/src/core/annotations_impl/visibility';


@Component({
    selector: 'loading'
})

@View({
    template: '<md-progress-circular [value]="progress" [hidden]="!visible"><md-progress-circular>',
    directives: [If, MdProgressCircular]
})


export class loadAsset {
    progress: number;
    loaded: number=0;
    t: number;
    s: number = 60;

    constructor(b:Main) {
        this.progress = 0;
        this.startload()
        this.o(b)
        this.visible = true;
    }

    step(s: number) {
        this.progress += s;
    }

    startload() {
        var src = ['img/arrow_down.png'];
        this.t = src.length;
        for (var i = 0; i < this.t; ++i) this.loadimg(src[i]);

    }
    loadimg(e: String) {
        var r = new Image;
        var self=this
        r.onload = function() {
                ++self.loaded
                self.step(parseInt(self.loaded / self.t) * 100)
            }
        r.src = e
    }

    o(b:Main) {
        
        /*if( this.s >= 0){
            this.s -= .5
            if(this.loaded == this.t) {
                //b.init()
            }
            else{
                //this.o(b)
                setTimeout(() => {this.o(b)},500)
                //setTimeout(this.o(b), 500)
            }
        }*/
        0 >= this.s ? this.loaded / this.t > .5 ? (this.hide()):(alert("加载图片失败，请返回刷新尝试!")): (this.s -= .5,this.loaded==this.t? (this.hide()):setTimeout(() => {this.o(b)},500))

    }
    hide(){

        
        setTimeout(() => {this.visible=false},500)
        //setTimeout(() => {DOM.setStyle(DOM.query('loading'),"display","none")},500)
        
    }

}
