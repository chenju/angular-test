
import {Injectable} from 'angular2/src/di/annotations_impl';
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,ElementRef,onChange, onAllChangesDone,CSSClass,EventEmitter} from 'angular2/angular2';
import {loadAsset} from 'loadAsset';
import {Parent,Ancestor} from 'angular2/src/core/annotations_impl/visibility';
import {ListWrapper} from 'angular2/src/facade/collection';
import {Math} from 'angular2/src/facade/math';
import {StringWrapper, isPresent, isString, NumberWrapper, RegExpWrapper} from 'angular2/src/facade/lang';
import {Directive} from 'angular2/src/core/annotations_impl/annotations';
import {Attribute} from 'angular2/src/core/annotations_impl/di';
import {isBlank} from 'angular2/src/facade/lang';
//import {KeyboardEvent} from 'angular2/src/facade/browser';
//import {EventEmitter ,Emitter} from 'angular2/src/core/annotations/events'


class Emitter {
  listener; // we only support one
  constructor() {
    this.listener = null;
  }
  emit(data) {
    if(this.listener){return this.listener(data)};
  }
}

@Component({
    selector: 'myapp',
    injectables:[SettingService,GetTouch],
    
    hostListeners: {
    'window:resize': 'onResize($event)'
    }

})
@View({
    templateUrl:'demo.html',
    directives: [loadAsset,Mdsence,Mdpage,SetStyle]
    
})
export class Main {

    senceWidth:string;
    senceHeight:string;
    _pageCount:number;
    set:SettingService;
    play:Emitter;

    

    constructor(set:SettingService,tc:GetTouch) {
       //console.log(todoDivs)

       this.set=set;
       this.tc=tc
       this.senceWidth=set.pageW
       this.senceHeight=set.pageH
       this.pageCount=1
       this.setSize();
       this.play=new Emitter()

      
    }
    init(){
      this.loadvisible= false
      console.log('init')
    }

    onResize(event) {

       console.log(event)
       this.setSize()
       
    }


    set pageCount(value){

      this._pageCount=value
      this.setSize()

    }
    get pageCount(){
      return this._pageCount
    }

    pageInit(n){

      var n=0;
      this.pages[n].init()
      
    }

    pageUnInit(){
       var n=0;
       this.pages[n].uninit()
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
    lifecycle: [onAllChangesDone],
    hostListeners: {
      '^touchstart': 'onTouchStart($event)',
      '^touchmove': 'onTouchMove($event)',
      '^touchend':'onTouchEnd($event)'
    }
})

export class Mdsence {
   
  pages:List<Mdpage>;
  m:Main;

  constructor(m:Main,el:ElementRef){
    this.pages = [];
    this.m=m
    console.log(el)
  }
  
  layoutPages() {

    var p=this.pages.length
    
    this.m.pageCount= p
    this.m.pages= this.pages

    var h = 100/p
   
    for (var i = 0; i < this.pages.length; i++) {

      var page = this.pages[i];
      var top = h*i
      page.styleWidth= `100%`
      page.styleHeight= `${h}%`
      page.styleTop=`${top}%`
      

    }
     
  }

  onTouchStart(e){

    e.preventDefault()
    console.log(e)

  }

  onTouchMove(e){

    console.log(e)

  }

  onTouchEnd(e){

    console.log(e)
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
  hostListeners: {
      'mouseover': 'onMouseOver(event)',
      'mousedown': 'onMouseDown(event)'
    },
  lifecycle: [onChange]
})

export class Mdpage {
  pageList: Mdsence;
  divs:List<SetStyle>;
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
    this.divs=[]
  }

  set pagerow(value) {
    this._pagerow = isString(value) ? NumberWrapper.parseInt(value, 10) : value;

  }

  get pagerow() {
    return this._rowspan;
  }

  init(){

    for (var i = 0; i < this.divs.length; i++) {

       this.divs[i].init()
    }
    
    
  }

  uninit(){

    for (var i = 0; i < this.divs.length; i++) {

       this.divs[i].uninit()
    }
  }

  addDiv(div: SetStyle){
    ListWrapper.push(this.divs, div);
  }

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
    'addClass':'addclass',
    'delay':'delay',
    'orgClass':'class',
    'inited':'init'
  },
  hostProperties: {
    'styleHeight': 'style.height',
    'styleWidth': 'style.width',
    'styleTop': 'style.top',
    'styleLeft':'style.left',
    'styleBackground':'style.backgroundColor',
    'styleBackgroundImage':'style.backgroundImage',
    'ClassMap':'attr.class'
  },
  lifecycle:[onChange]
})

export class SetStyle{

  styleHeight:string;
  page:Mdpage;
  set:SettingService;
  styleBackground:string;
  isRegisteredWithGridList;

  constructor(@Ancestor page:Mdpage,set:SettingService){
     
      this.page=page
      this.set=set
  }
 

  onAllChangesDone(){
       
       //console.log(this.width)


  }

  getInit(){
    console.log('aaaaa')
    return this.page.init
  }

  init(){
    
    var that=this
    setTimeout(function() {
    that.ClassMap = that.orgClass+' '+that.addClass
    },this.delay)

    console.log(this.addClass)
    console.log(this.background)  
    console.log(this.delay)  
  }

  uninit(){

    this.ClassMap = this.orgClass

  }


  onChange(_){
   
    this.ClassMap=this.orgClass    
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

    if (!this.isRegisteredWithGridList) {
      this.page.addDiv(this);
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
class GetTouch{
  touchstart:string;
  touchend:string;
  touchmove:string;
  TOUCH:string;
  constructor() {

  if (('ontouchstart' in document.createElement("div")) ){
    this.touchstart = "touchstart",
    this.touchend = "touchend",
    this.touchmove = "touchmove";
    console.log(this.touchstart)
    
  }
  else{
    this.touchstart = "mousedown";
    this.touchend = "mouseup";
    this.touchmove = "mousemove";
  } 

  this.TOUCH='stop'
  var that=this

  document.addEventListener(this.touchstart, function(e) {
    that.TOUCH = "start"; 
    })
  document.body.addEventListener(this.touchmove, function(e) {
    that.TOUCH = "move"; })  
  document.body.addEventListener(this.touchend, function(e) {
    that.TOUCH = "stop"; })  
  document.body.addEventListener('touchcancle', function(e) {
    that.TOUCH = "stop"; }) 

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
