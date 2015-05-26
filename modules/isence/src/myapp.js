import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,ElementRef,onChange, onAllChangesDone} from 'angular2/angular2';
import {Directive} from 'angular2/src/core/annotations_impl/annotations';

@Component({
  selector: 'myapp'
})
@View({
	template:`<div layout="auto"></div>
	          <div tooltip="some text here"></div>`,
	directives:[Tooltip]
})
export class MyApp{


	constructor(){
		console.log('fuck')
	}
}


@Directive({
  selector: '[layout]',
  lifecycle: [onAllChangesDone]
})
class ClassSet {
  onAllChangesDone() {
    console.log('run')
  }
}


//tooltip

@Directive({
  selector: '[tooltip]',
  properties: {
    'text': 'tooltip'
  },
  hostListeners: {
    'mouseover': 'onMouseEnter()',
    'onmouseleave': 'onMouseLeave()'
  }
})
class Tooltip{
  text:string;
  //overlay:Overlay; // NOT YET IMPLEMENTED
  //overlayManager:OverlayManager; // NOT YET IMPLEMENTED
  constructor() {
    //this.overlay = overlay;
  }
  onMouseEnter() {
  	console.log(this.text)
    // exact signature to be determined
    //this.overlay = this.overlayManager.open(text, ...);
  }
  onMouseLeave() {
    //this.overlay.close();
    //this.overlay = null;
  }
}

bootstrap(MyApp);
