import {ComponentAnnotation as Component} from 'angular2/angular2';


@Component({
    selector: 'hello'
})

export class Fuck {
    name: string = 'Fuck';
    constructor() {
        setTimeout(() => {

          this.name = "Fuck the World"
          console.log(this.name)	
        }, 1000);
    }
}

