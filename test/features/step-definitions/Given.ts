//***************** AFTER IMPLEMENTION POM ********************* */
import { Given } from '@wdio/cucumber-framework';
import * as chai from 'chai';
import { config } from 'dotenv';
import logger from '../../helper/logger.ts';
import allure from "@wdio/allure-reporter"
import reporter from '../../helper/reporter.ts';
import sauseHomePage from '../../page-objects/sause.home.page.ts';

//***************** BEFORE IMPLEMENTION POM ********************* */
// import { Given } from '@wdio/cucumber-framework';
// import * as chai from 'chai';
// import { config } from 'dotenv';
// import logger from '../../helper/logger.ts';
// import allure from "@wdio/allure-reporter"
// import reporter from '../../helper/reporter.ts';



Given(/^As (a|an) (.*) user I Login to inventory web app$/, async function (prefixTxt, userType, dataTable) { //Matches steps like 1. As a standard user I Login to inventory web app 2.As an admin user I Login to inventory web app 
  //***************** AFTER IMPLEMENTION POM ********************* */
  
  try {
    reporter.addStep(this.testid, "info", "Started to login sause demo app...")
    let dt = dataTable.hashes() //returns array of objects
    //@ts-ignore  //@ts-ignore is to avoid error on sauseDemoURL i.e. doesn't exists on type 'ExpectWebdriverIO | Testrunner'
    await sauseHomePage.navigateTo(browser.options.sauseDemoURL)  //we're getting URL from wdio.test.conf.ts
    await sauseHomePage.loginToSauseApp(this.testid, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD) //we're getting values of TEST_STD_USERNAME and TEST_STD_PASSWORD from .env file
  } catch (err) {
    err.message=`${this.testid}: Failed at login step, ${err.message}`
    throw err
  }
  
  
  
  
  
  
  
  
  
  
  //***************** BEFORE IMPLEMENTION POM ********************* */
  // reporter.addStep(this.testid, "info", "Started to login sause demo app...")

  // // //@ts-ignore
  // // logger.info(`>>>>${browser.options.testid}: Started to login sause demo app...`)
  // // //@ts-ignore
  // // allure.addStep(`>>>>${browser.options.testid}: Started to login sause demo app...`)
  
  // // //@ts-ignore
  // // console.log(`>> The value of browser.options.testid: ${browser.options.testid}`)

  // //getting values from data table
  // let dt = dataTable.hashes() //returns array of objects
  // // console.log(`>> The type of dt: ${typeof dt}`) //type of dt is object
  // console.log(`>> The constructor of dt: ${dt.constructor}`) // showes function Array() //dt.constructor tells whether it is obj or arr
  // console.log(`>> The value of dt: ${JSON.stringify(dt)}`)

  // // console.log(`>> prefixTxt: ${prefixTxt} and userType: ${userType}`)
  // // console.log(`>> TestUser: ${process.env.TEST_USERNAME}`)

  // /**1. Open web app */
  // //@ts-ignore   //@ts-ignore is to avoid error on sauseDemoURL i.e. doesn't exists on type 'ExpectWebdriverIO | Testrunner'
  // await browser.url(browser.options.sauseDemoURL); //we're getting URL from wdio.test.conf.ts
  // // console.log(`>> Test config values: ${JSON.stringify(browser.options)}`)
  // await browser.maximizeWindow();
  // await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load

  // /**2. Enter Creds */
  // await $(`#user-name`).setValue(dt[0].Username) //we're getting Username value from dataTable 1st obj (i.e. zero index) in an array //we're getting value from dt i.e. from dataTable
  // // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME) //we're getting value from .env file
  // await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)  //we're getting value from .env file
  // await $(`#login-button`).click()


  
  // this.appid="ABC123"
  // // //@ts-ignore
  // // logger.info(`>>>>${browser.options.testid}: Login is successsful...`)
  // // //@ts-ignore
  // // allure.addStep(`>>>>${browser.options.testid}: Login is successsful...`)

  // reporter.addStep(this.testid, "debug", "Login is successsful...")
});

