//import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';

@
Component({
    selector: 'loading'
})

@ View({
    template: '<md-progress-circular [value]="progress"><md-progress-circular>',
    directives: [If, MdProgressCircular]
})


export class loadAsset {
    progress: number;
    loaded: number;
    t: number;
    s: number = 60;
    constructor() {
        this.progress = 0;
    }

    step(s: number) {
        this.progress += s;
    }

    startload() {
        var src = [];
        t = src.length;

        for (var i = 0; i < t; ++i) loadImg(src[i]);

    }
    loadimg(e: String) {
        var r = new Image;
        r.onload = function() {
                ++loaded,
                step(parseInt(n / t * 100))
            },
            r.src = e
    }
    o() {
        0 >= s ? loaded / t > .5 ? u() : alert("加载图片失败，请返回刷新尝试!") : (s -= .5, loaded == t ? u() : setTimeout(o, 500))
    }
    //var u= function(){}

    return function(e) {
        typeof e == "function" && (u = e),
            o()
    }

}
