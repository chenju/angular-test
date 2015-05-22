
import {Injectable} from 'angular2/src/di/annotations_impl';
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If} from 'angular2/angular2';
import {loadAsset} from 'loadAsset'



@Component({
    selector: 'myapp',
    injectables:[SettingService],
    hostListeners: {
    'window:resize': 'onResize($event)'
    }
})
@View({
    template: `<loading></loading>
               <wrapper></wrapper>`,
    directives: [If,loadAsset]
    
})
export class Main {
    name:String;
    greeting:string;
    constructor(service:SettingService) {
       
      console.log(service.pageW)

    }
    init(){
      console.log('fuck')
    }

    onResize(event) {
       console.log(event.target)
       this.name=1
    }
    
}

@Injectable()
class SettingService {
  greeting:string;
  pageH:number;
  pageW:number;
  constructor() {
    this.greeting = 'hello';
    this.pageH = document.documentElement.clientHeight
    this.pageW = document.documentElement.clientWidth
  }
}

@Injectable()
class GreetingService {
  greeting:string;
  constructor() {
    this.greeting = 'hello';
  }
}


bootstrap(Main);
