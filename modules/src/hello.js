import {test, MyCLass} from './module';



import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';

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
    	console.log(test);
    	new MyClass();
        setTimeout(() => {
          this.name = 'NEW World'
        }, 2000);
    }
}

bootstrap(Hello);