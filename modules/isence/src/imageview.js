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
               </md-imgView>`,
    directives:[Img] 
})

export class ImgView{

   pagNum:number;
   path:string;
   prefix:string;


   constructor(){

    this.path=""
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


@Component({
    selector: 'md-imgView',
    
    hostListeners: {
      "^mousedown":"down($event)"
    }

})
@View({
    template:`<div show="true" bg='{{getUrl}}' class='image'>{{getUrl}}</div>`, 
    directives:[setStyle] 
})

export class Img{
   
   m:ImgView;
   imgUrl:string;
   getUrl:string;
   w:string;
   div:setStyle;


   constructor(m:ImgView){

      this.getUrl='';
      this.m=m
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

export class setStyle{
  constructor(@Parent img:Img){
    this.styleBackgroundImage= img.getUrl
    img.div=this
  }
}  

bootstrap(ImgView);


