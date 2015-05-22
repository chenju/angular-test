

import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';
import {loadAsset} from 'loadAsset'


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
        setTimeout(()=> {
          
           console.log()
          
        }, 1000);
    }
    init(){
      console.log('fuck')
    }
    
}

bootstrap(Hello);
