import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';
import {MdProgressCircular} from 'Component/progress-circular/progress_circular'

@Component({
    selector: 'myapp'
})

@View({
    template: '<md-progress-circular [value]="progress"><md-progress-circular>',
    directives: [If, MdProgressCircular]
})
export class Test {
    progress:number;
    constructor() {
       

    }
    init(){
      console.log('fuck')
    }
    
}

bootstrap(Test);
