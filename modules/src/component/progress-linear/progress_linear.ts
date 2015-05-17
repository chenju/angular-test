import {Component,View} from "angular2/angular2";

 

@Component({
  selector: 'loading-progress',
  //lifecycle: [onChange],
  properties: {
    'value': 'value',
    'bufferValue': 'buffer-value'
  },
  hostProperties: {
    'role': 'attr.role',
    'ariaValuemin': 'attr.aria-valuemin',
    'ariaValuemax': 'attr.aria-valuemax',
    'value': 'attr.aria-valuenow'
  }
})
@View({
  template: `<div class="loading_wrp">
            <div class="loading">
                <div class="loading_bar"></div>
            </div>
            <b id="loading_text">0%</b>
        </div>`,
  directives: []
})

export class MdProgressLinear {

       constructor() {
        
        
       }
	


 onChange(_) {

 }

 transformForValue(value) {
   
  }
}

  var Mode = {
  'DETERMINATE': 'determinate',
  'INDETERMINATE': 'indeterminate',
  'BUFFER': 'buffer',
  'QUERY': 'query'
};