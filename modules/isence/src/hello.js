

import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';
import {Fuck} from 'services/fuck';
import {MdProgressCircular} from 'component/progress-circular/progress_circular'


@Component({
    selector: 'hello'
})
@View({
    template: `<span *if="name">Hello, {{name}}!</span>`,
    directives: [If]
})
export class Hello {
    name: string = 'World';
    constructor() {
        setTimeout(() => {
          var a =new Fuck()
          this.name = a.name
          //console.log(Fuck)
        }, 1000);
        MdProgressCircular()
    }
    
}

bootstrap(Hello);
