import { setWorldConstructor } from "@wdio/cucumber-framework";
import * as chai from 'chai';

class CustomWorld {
    appid: string
    testid: string
    constructor(){
        this.appid="", //OR undefined -->if we don't know the data type of appid
        this.testid=""  //OR undefined -->if we don't know the data type of testid
    }
}
setWorldConstructor(CustomWorld)