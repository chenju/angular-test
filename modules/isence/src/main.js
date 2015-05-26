
import {Injectable} from 'angular2/src/di/annotations_impl';
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,ElementRef,onChange, onAllChangesDone} from 'angular2/angular2';
import {loadAsset} from 'loadAsset';
import {Parent} from 'angular2/src/core/annotations_impl/visibility';
import {ListWrapper} from 'angular2/src/facade/collection';
import {Math} from 'angular2/src/facade/math';
import {StringWrapper, isPresent, isString, NumberWrapper, RegExpWrapper} from 'angular2/src/facade/lang';
import {Directive} from 'angular2/src/core/annotations_impl/annotations';


@Component({
    selector: 'myapp',
    injectables:[SettingService],
    
    hostListeners: {
    'window:resize': 'onResize($event)'
    }

})
@View({
    templateUrl:'demo.html',
    directives: [loadAsset,Mdsence,Mdpage]
    
})
export class Main {

    senceWidth:string;
    senceHeight:string;
    _pageCount:number;
    set:SettingService;

    constructor(set:SettingService) {
       this.set=set
       this.senceWidth=set.pageW
       this.senceHeight=set.pageH
       this.pageCount=1
       this.setSize()

      
    }
    init(){
      
      console.log('fuck')
    }

    onResize(event) {

       
       //this.senceHeight=`${this.width}px`
       this.setSize()
       
    }

    set pageCount(value){

      this._pageCount=value
      this.setSize()

    }
    get pageCount(){
      return this._pageCount
    }


    setSize(){

       var h = this.pageCount*document.documentElement.clientHeight
       this.senceHeight= `${h}px`
       this.senceWidth = `${document.documentElement.clientWidth}px`

    }

    onChange(_){

       this.setSize()

    }

    transformForValue(value) {
    // TODO(jelbourn): test perf gain of caching these, since there are only 101 values.
    var scale = value / 100;
    var translateX = (value - 100) / 2;
    return `translateX(${translateX}%) scale(${scale}, 1)`;
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




@Directive({
    selector: 'md-sence',
    lifecycle: [onAllChangesDone]
})

export class Mdsence {
   
   pages:List<Mdpage>;
   m:Main;

   

  constructor(m:Main){
    this.pages = [];
    this.m=m
  }


  layoutPages() {

    //var tracker = new PageCoordinator(this.pages);
    var p=this.pages.length
    
    this.m.pageCount= p

    var h = 100/p
    console.log(p)
   
    for (var i = 0; i < this.pages.length; i++) {

      var page = this.pages[i];
      var top = h*i
      page.styleWidth= `100%`
      page.styleHeight= `${h}%`
      page.styleTop=`${top}%`
      
      //this.layoutPage(@child sets:Query<Field>)



    }
     
  }

  onAllChangesDone() {
    this.layoutPages();
  }

  addPage(page: Mdpage){
    ListWrapper.push(this.pages, page);
  }

}



@Directive({
  selector: 'md-page',
  properties: {
    'pagerow': 'pagerow',
    'layout' : 'layout'
  },
  hostProperties: {
    'styleHeight': 'style.height',
    'styleWidth': 'style.width',
    'styleTop': 'style.top'
  },
  lifecycle: [onChange]
})

export class Mdpage {
  pageList: Mdsence;
  _rowspan: number;
  _layout:string;
  
  styleHeight: string;
  styleWidth: string;
  styleTop: string;
  /*styleLeft: string;
  styleMarginTop: string;
  stylePaddingTop: string;
  role: string;
  */

  isRegisteredWithPageList: boolean;

  constructor(@Parent() pageList:Mdsence){
    this.pageList = pageList;
    this.layout='auto'
    //this.role = 'listitem';

    // Tiles default to 1x1, but rowspan and colspan can be changed via binding.
    this.pagerow = 1;
  }

  set pagerow(value) {
    this._pagerow = isString(value) ? NumberWrapper.parseInt(value, 10) : value;

  }

  get pagerow() {
    return this._rowspan;
  }

  set layout(value){
    this._layout=value
  }

  get layout(){
    return this._layout
  }
  onChange(_) {

    //console.log(`grid-tile on-change ${this.gridList.tiles.indexOf(this)}`);
    if (!this.isRegisteredWithGridList) {
      this.pageList.addPage(this);
      this.isRegisteredWithGridList = true;
    }
  }

}







@Injectable()
class SettingService {
  greeting:string;
  //pageH:number;
  //pageW:number;
  constructor() {
    this.greeting = 'hello';
    //this.pageH = document.documentElement.clientHeight
    //this.pageW = document.documentElement.clientWidth
  }
  get pageH(){
    return document.documentElement.clientHeight
  }
  get pageW(){
    return document.documentElement.clientWidth
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
