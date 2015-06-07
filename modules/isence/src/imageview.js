import {Injectable} from 'angular2/src/di/annotations_impl';
import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap, If,NgFor,ElementRef,onChange, onAllChangesDone,CSSClass,EventEmitter,QueryList} from 'angular2/angular2';
import {loadAsset} from 'loadAsset';
import {Parent,Ancestor} from 'angular2/src/core/annotations_impl/visibility';
import {ListWrapper} from 'angular2/src/facade/collection';
import {Math} from 'angular2/src/facade/math';
import {StringWrapper, isPresent, isString, NumberWrapper, RegExpWrapper} from 'angular2/src/facade/lang';
import {Directive,Query,Inject} from 'angular2/src/core/annotations_impl/annotations';
import {resolveForwardRef,bind,Attribute,forwardRef} from 'angular2/di';
import {isBlank} from 'angular2/src/facade/lang';

//import {QueryList} from 'angular2/core';


@Directive({selector: 'lock'})
class Lock {
  name: string;
  constructor() { this.name = 'lock'; }
}


@Component({
    selector: 'myapp',
    hostListeners: {
    'window:resize': 'onResize($event)'
    }

})
@View({
    template:`<input #path (keyup)="changePrefix($event)"></input>
              <input #prefix (keyup)="changePath($event)"></input>
                <md-imgView>
               </md-imgView>
               <div text='1'></div>
               <lock></lock>`,
               directives:[Img]
})

export class ImgView{

   pagNum:number;
   path:string;
   prefix:string;


   constructor(){

    this.path="http://www.pagefilp.com/~darkwingcj/monster/"
    this.prefix=""
    this.pagNum=1

   }

   changePath($event){

    if($event.which === 13) {
      this.path= $event.target.value
      this.pagNum=1
    }
  }

   changePrefix($event){

     if($event.which === 13) {
      this.prefix= $event.target.value
      this.pagNum=1
    }
   }

}



@Directive({selector: '[text]', properties: ['text']})
@Injectable()
class TextDirective {
  text: string;
  constructor() {}
}


@Component({
    selector: 'md-imgView',
    
    hostListeners: {
      "^mousedown":"down($event)"
    }

})
@View({
    template:`<div show="true" bg='{{getUrl}}' class='image'>{{getUrl}}</div>`
    ,directives:[setStyle] 
})

export class Img{
   
   m:ImgView;
   imgUrl:string;
   getUrl:string;
   w:string;
   div:setStyle;


   constructor(m:ImgView,@Inject(forwardRef(() => Lock)) lock:Lock){

      //@Inject(forwardRef(() => Lock)) lock:Lock
      console.log(locks)
      this.getUrl='';
      this.m=m
      //console.log(a)
      //this.gotoPage(1)

   }


   down(e){

      if(e.layerX>284){
        this.goNext()
      }
      else{
        this.goPrev()
      }

   }

   goNext(){

     this.gotoPage(parseInt(this.m.pagNum+1))

   }
   goPrev(){
     var n= this.m.pagNum-1;
     if (n>0) this.gotoPage(parseInt(n))
   }

   preLoad(n,t){



   }

   gotoPage(n){
    
      this.m.pagNum=n
      if(n<10) this.imgUrl= this.m.path+this.m.prefix+"0"+n+".jpg"
      else this.imgUrl= this.m.path+this.m.prefix+n+".jpg"
      this.getUrl= `url('${this.imgUrl}')`;
      this.w="1000px";
      //this.div.styleBackgroundImage=this.getUrl
      console.log(this.getUrl)  

   }

}

@Directive({
  selector: '[show]',
  properties: {
    'styleBackgroundImage':'bg'
  },
  hostProperties: {
    'styleBackgroundImage':'style.backgroundImage'
  }
})
class setStyle{
  constructor(@Parent img:Img){
    this.styleBackgroundImage= img.getUrl
    img.div=this
  }
}  

/*
Component({selector: 'Lock'})
@View({
  directives: [NgFor],
  template: `{{frame.name}}(<span *ng-for="var lock of locks">{{lock.name}}</span>)`
})
class Door {
  locks: QueryList<Lock>;
  //frame: Frame;

  constructor(@Query(forwardRef(() => Lock)) locks: QueryList<Lock>) {
    //this.frame = frame;
    this.locks = locks;
  }
}
*/



bootstrap(ImgView);


