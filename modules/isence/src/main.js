
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
    pagNum:number;
    pageAnmi:array;
    set:SettingService;
    sence:Mdsence;

    

    constructor(set:SettingService,tc:GetTouch) {

       this.set=set;
       this.tc=tc
       this.senceWidth=set.pageW
       this.senceHeight=set.pageH
       this.pageCount=1
       this.pagNum=0
       this.loadvisible= true
       //this.pageAnmi[0]=this.anmi(0);
       this.setSize();

      
    }
    init(){
      this.loadvisible= false
      this.sence.pages[0].init()
    }

    onResize(event) {

       console.log(event)
       this.setSize()
       
    }
    
    /*
    anmi(n){

      var p=function(){
          this.pages[n].init()
      }

      var v=function(){
         this.pages[n].uninit()
      }

      return{

         init: p,
         uninit: v

      }

    }

    gotoPage(t,n){
      console.log("fuck")
    }*/

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

    gotoPage(t,n,r){

      this.sence.movePage(t,n,r)
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
    },
    hostProperties: {
      'mainTransform':'style.transform',
      'transition':'style.transition',
      'ClassMap':'attr.class'
    },
    injectables:[SettingService,GetTouch]

})

export class Mdsence {
   
  position:string; 
  pages:List<Mdpage>;
  pageH:string;
  m:Main;
  tc:GetTouch;
  o_y:number;
  c_y:number;
  n:number;
  r:number;
  mainTransform:string;
  cssPrefix:string;

  constructor(m:Main,tc:GetTouch){
    this.pages = [];
    this.m=m;
    this.position=0;
    this.o_y=0;
    this.c_y=0;
    this.tc=tc;
    this.n=0;
    this.r=0;
    this.mainTransform='translate3d(0,0,0)';

  }
  
  layoutPages() {

    var p=this.pages.length
    
    this.m.pageCount= p
    this.m.pages= this.pages
    this.m.sence= this
    //this.m.gotoPage =this.movePage
    //console.log(this.m.gotoPage)

    var h = 100/p
    this.pageH = document.documentElement.clientHeight
   
    for (var i = 0; i < this.pages.length; i++) {

      var page = this.pages[i];
      var top = h*i
      page.styleWidth= `100%`
      page.styleHeight= `${h}%`
      page.styleTop=`${top}%`
      

    }
     
  }

  onTouchStart(e){

    this.r =parseInt(this.get_transform_value(this.mainTransform,'translate3d',1))
    this.tc.TOUCH="start"
    var i = e.changedTouches;

        if (!!i) {
           var s = i[0];
               this.c_y = s.pageY
        }
    e.preventDefault()    
  }

  onTouchMove(e){

    if ("start" != this.tc.TOUCH && "move" != this.tc.TOUCH) return;
    e.preventDefault();

    var s =  e.changedTouches;
                    if (!!s) {
                        var o = s[0];
                        this.n = o.pageY - this.c_y;
    this.mainTransform = this.transformForValue((this.r+this.n))  
    }
    this.tc.TOUCH='move'                  

  }

  onTouchEnd(e){
    var s= parseInt(this.get_transform_value(this.mainTransform,'translate3d',1)) || this.r,
        o = s - this.r,
        f = this.m.pagNum;  
    if ("start" == this.tc.TOUCH && o != 0) return;
    if (Math.abs(o) > 80) {
                    o > 0 && this.r < 0 ? f = this.m.pagNum - 1 : o < 0 && Math.abs(this.r - this.pageH) < parseInt(this.m.senceHeight) && (f = this.m.pagNum + 1), console.log( this.m.senceHeight+"fuck1"), console.log(f+"fuck"), this.movePage(this.m.pagNum, f);
                    return
    }    
    if (0 == o) return;
    this.transition= "top .2s linear"
    this.mainTransform = this.transformForValue(parseInt(-this.m.pagNum*this.pageH)) 
    setTimeout(() => {this.transition= ""},500)
    
  }

  movePage(t,n,r){

    var s = r ? "" : "keep",
    o = r ? 0 : 600;
    this.transition= "transform .4s linear"
    this.mainTransform = this.transformForValue(parseInt(-n*this.pageH)) 
    setTimeout(() => {
      t != n && (this.pages[n]  && this.pages[n].init(), this.pages[t] && this.pages[t].uninit()),
      this.transition= "",
      this.m.pagNum=n},500)

  }

  onAllChangesDone() {
    this.layoutPages();
  }

  addPage(page: Mdpage){
    ListWrapper.push(this.pages, page);
  }

  get_transform_value(e, t) {
        t = t.replace(/\-/g, "\\-");
        var n = [0];
        if (arguments.length > 2)
            for (var r = 2; r < arguments.length; ++r) n[r - 2] = arguments[r];
        if ("none" == e || "" == e) return null;
        var i = new RegExp(t + "\\(([^\\)]+)\\)", "ig"),
            s = e.match(i),
            o = [],
            u = [];
        if (s && s.length > 0) {
            s = s[0],
                o = s.replace(i, "$1").split(",");
            for (var r = 0; r < n.length; ++r) u.push(o[n[r]])
        }
        return u.length == 1 && (u = u[0]),
            u
  }

  transformForValue(value) {
    var translate3d = value;
    return `translate3d(0,${translate3d}px,0)`;
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
  lifecycle: [onChange,onAllChangesDone]
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

  onAllChangesDone(){
    //console.log('fuck')
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
    'styleHeight_': 'style.height',
    'styleWidth_': 'style.width',
    'styleTop_': 'style.top',
    'styleLeft_':'style.left',
    'styleMarginTop':'style.marginTop',
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
 

  

  getInit(){
    console.log('aaaaa')
    return this.page.init
  }

  init(){
    var that=this
    if(!isBlank(that.addClass)){
      setTimeout(function() {
      that.ClassMap = that.orgClass+' '+that.addClass
      },this.delay) 
    }
  }

  uninit(){

    this.ClassMap = this.orgClass

  }

  onChange(_){

    console.log(this)

    this.layout()

  }

  layout(){
   
    this.ClassMap=this.orgClass    
    var mode = this.page.layout;
    console.log(this.styleTop)
    var h = this.set.pageH,
        w = this.set.pageW,
        fh= 1008/h,
        fw= 640/w,
        oh=1008,
        ow=640;

    switch (mode){
       
       case("autoW"):
       //this.styleMarginTop= ((-this.styleHeight)/2-(oh/2-this.styleTop))/fw+'px'

       this.styleHeight_=this.styleHeight/fw+'px'
       this.styleWidth_=this.styleWidth/fw+'px'
       this.styleLeft_=this.styleLeft/fw+'px'

       this.styleTop_=((h-oh)/2+this.styleTop)/fw+'px'
       console.log(h)
       break;

    }
   /*


    
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
       this.styleHeight=this.styleHeight/fw+'px'
       this.styleWidth=this.styleWidth/fw+'px'
       this.styleTop=this.styleTop/fw+'px'
       this.styleLeft=this.styleLeft/fw+'px'
    }*/
   
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
  /*
  document.addEventListener(this.touchstart, function(e) {
    that.TOUCH = "start"; 
    })
  document.body.addEventListener(this.touchmove, function(e) {
    that.TOUCH = "move"; })  
  document.body.addEventListener(this.touchend, function(e) {
    that.TOUCH = "stop"; })  
  document.body.addEventListener('touchcancle', function(e) {
    that.TOUCH = "stop"; }) */

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
