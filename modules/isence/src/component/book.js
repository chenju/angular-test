import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,ElementRef} from 'angular2/angular2';
//import {Parent} from 'angular2/src/core/annotations_impl/visibility';
import {DOM} from 'angular2/src/dom/dom_adapter';
//import {ListWrapper} from 'angular2/src/facade/collection';
//import {StringWrapper, isPresent, isString, NumberWrapper, RegExpWrapper} from 'angular2/src/facade/lang';
//import {Math} from 'angular2/src/facade/math';
import {Directive} from 'angular2/src/core/annotations_impl/annotations';

/*
@Component({
    selector: 'wrapper'
    
})
@View({
    template:`<section></section>`,
    directives:[Mdbookcontain]
    
})


export class Mdbook {
    constructor(){

        console.log('fuck1')
    }

}*/
var _nextPageId=0
@Directive({ selector: 'wrapper' })
export class Mdbook{
    _nextPageId:number;

     constructor(){

        /*constructor(loader: DynamicComponentLoader) {
          this.componentLoader = loader;
        }*/
        //this._nextPageId=0
        var pageElement = this._createHostElement()
        DOM.appendChild(DOM.query('wrapper'), pageElement)
        DOM.addClass(pageElement,'md-page')




     }

  _createHostElement() {
    var hostElement = DOM.createElement('md-page');
    hostElement.id = `Mdbook${_nextPageId++}`;
    return hostElement;
  }


}

@Component({
  selector: 'md-page'
})
@View({
  template: `<md-page-hwrp><</md-page-hwrp>`
  //directives: [MdDialogContent]
})
export class MdPage{
    constructor(){

       console.log('mdpage')
    }
}

@Directive({selector: 'md-page-hwrp'})
class MdPageContent {
  constructor(@Parent() page: Mdpage, elementRef: ElementRef) {
    page.contentRef = elementRef;
  }
}
