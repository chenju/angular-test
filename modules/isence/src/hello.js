

import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';
import {Fuck} from 'services/fuck';


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
    }
}

bootstrap(Hello);
