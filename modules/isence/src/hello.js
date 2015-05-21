

import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';
import {Fuck} from 'services/fuck';
import {MdProgressCircular} from 'component/progress-circular/progress_circular'


@Component({
    selector: 'hello'
})
@View({
    template: `<span *if="name">Hello, {{name}}!</span>
               <loading></loading>`,
    directives: [If,loadAsset]
})
export class Hello {
    name:String;
    constructor() {
        setTimeout(() => {
          
           var a= new loadAsset(init)
          
        }, 1000);
    }
    init(){
      console.log(fuck)
    }
    
}

bootstrap(Hello);
