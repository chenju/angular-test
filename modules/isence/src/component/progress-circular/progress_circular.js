
import {Component, onChange} from 'angular2/src/core/annotations_impl/annotations';
import {View} from 'angular2/src/core/annotations_impl/view';
import {isPresent, isBlank} from 'angular2/src/facade/lang';
import {Math} from 'angular2/src/facade/math';

@Component({
  selector: 'md-progress-circular',
  properties: {'value':'value'},
  hostProperties: {'value':'value'}
})

@View({
  templateUrl: 'component/progress-circular/progress_circular.html'
})
export class MdProgressCircular {
  value_: number= 0;

  constructor() {

      

  }

  get value() {
    return this.value_;
  }

  set value(v) {
    if (isPresent(v)) {
      this.value_ = MdProgressCircular.clamp(v);
    }
  }
  
  static clamp(v) {
    return Math.max(0, Math.min(100, v));
  }
}
