/// <reference path="typings/angular2/angular2.d.ts" />

import {Component, bootstrap, View} from "angular2/angular2";
import {Settings} from "./setting";
import {MdProgressLinear} from "./src/component/progress-linear/progress_linear"


class Constants 
{
    static get Default():any {
        return {
            appName: "My App",
            appVersion: 2.0,
            baseUrl: "http://localhost:3048",
            Action: {
                None:0,
                Registering: 1,
                Authenticating: 2
            }
        };
    }
}


@Component({
    selector: 'wrapper'
})
@View({
    template: `<section>
                <div class="h_wrp">
                   <h1>Hello {{name }}</h1>
                </div>
              </section>`
})
class ChildComponent {
    message: string;

    constructor() {
        this.name = Settings.Default.appName;
    }
}

@Component({
    selector: 'my-app'
})
@View({
    template: `<h1>Hello {{ name }}</h1>
    <loading-progress class="loading_bg"></loading-progress>
    <wrapper></wrapper>`,
    directives: [ChildComponent,MdProgressLinear]           
})
class MyAppComponent {
    name: string;

    constructor() {
        this.name = 'Alice';
        
    }
    
}




bootstrap(MyAppComponent);