
import {Injectable} from 'angular2/src/di/annotations_impl';
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,ElementRef,onChange, onAllChangesDone,CSSClass} from 'angular2/angular2';
import {loadAsset} from 'loadAsset';
import {Parent,Ancestor} from 'angular2/src/core/annotations_impl/visibility';
import {ListWrapper} from 'angular2/src/facade/collection';
import {Math} from 'angular2/src/facade/math';
import {StringWrapper, isPresent, isString, NumberWrapper, RegExpWrapper} from 'angular2/src/facade/lang';
import {Directive} from 'angular2/src/core/annotations_impl/annotations';
import {Attribute} from 'angular2/src/core/annotations_impl/di';
import {isBlank} from 'angular2/src/facade/lang';


@Component({
    selector: 'myapp',
    injectables:[SettingService],
    
    hostListeners: {
    'window:resize': 'onResize($event)'
    }

})
@View({
    templateUrl:'demo.html',
    directives: [loadAsset,Mdsence,Mdpage,SetStyle,CSSClass]
    
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
      
      console.log('init')
    }

    onResize(event) {

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
    
}


@Directive({
    selector: 'md-sence',
    lifecycle: [onAllChangesDone]
})

export class Mdsence {
   
   pages:List<Mdpage>;
   m:Main;
   aaa:string;

   

  constructor(m:Main){
    this.pages = [];
    this.m=m
    this.aaa="aaa"
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
    'layout':'layout'

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

  constructor(@Parent() pageList:Mdsence,@Attribute ('layout') layout:string){
    this.pageList = pageList;
    //this.layout=layout
    //this.role = 'listitem';
    this.pagerow = 1;
  }

  set pagerow(value) {
    this._pagerow = isString(value) ? NumberWrapper.parseInt(value, 10) : value;

  }

  get pagerow() {
    return this._rowspan;
  }

  /*
  set layout(v){
    this._layout=v
  }


  get layout(){
    return this._layout
  }
  */
  onChange(_) {

    //console.log(`grid-tile on-change ${this.gridList.tiles.indexOf(this)}`);
    if (!this.isRegisteredWithGridList) {
      this.pageList.addPage(this);
      this.isRegisteredWithGridList = true;
    }
  }

}

@Directive({
  selector: '[w]',
  properties: {
    'styleWidth': 'w',
    'styleHeight':'h',
    'styleTop':'top',
    'styleLeft':'left',
    'background':'bg',
    'addClass':"addClass"
  },
  hostProperties: {
    'styleHeight': 'style.height',
    'styleWidth': 'style.width',
    'styleTop': 'style.top',
    'styleLeft':'style.left',
    'styleBackground':'style.backgroundColor',
    'styleBackgroundImage':'style.backgroundImage',
    'addClass_':'classname'
  },
  lifecycle:[onChange]
})

export class SetStyle{

  styleHeight:string;
  page:Mdpage;
  set:SettingService;
  styleBackground:string;

  constructor(@Ancestor page:Mdpage,set:SettingService){
     
      this.page=page
      this.set=set
  }
 

  onAllChangesDone(){
       
       //console.log(this.width)


  }

  init(){

    this.addClass_ = this.addClass

  }

  uninit(){


  }


  onChange(_){

    this.init()
    
    var mode = this.page.layout;
    if(mode =="abs"){
       //this.styleHeight=this.styleHeight/1008*100+'%'
       //this.styleWidth=this.styleWidth/640*100+'%'

    }
    else{

      var h = this.set.pageH,
          w = this.set.pageW,
          fh= 1008/h,
          fw= 640/w
       
       //不变形缩放
       this.styleHeight=this.styleHeight/fh+'px'
       this.styleWidth=this.styleWidth/fh+'px'
       this.styleTop=this.styleTop/fh+'px'
       this.styleLeft=this.styleLeft/fh+'px'
    }
   
   // console.log(this.backGround)
   if(!isBlank(this.background)){
      if (/^(http|file|\/\/)/gi.test( this.background ) || /\.(svg|png|jpg|jpeg|gif|bmp)$/gi.test( this.background )) {
         this.styleBackgroundImage= 'url('+ this.background +')'
      }
      else{
                this.styleBackground = this.background
      }


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


class pageDivStyle {
  height: string;
  width: string;
  top: string;
  left: string;
  marginTop: string;
  paddingTop: string;
}


bootstrap(Main);
