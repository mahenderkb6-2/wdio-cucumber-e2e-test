import { Given, When, Then } from "@wdio/cucumber-framework";
// import { expect } from "chai";   //not working
// import chai from 'chai';     //not working
import * as chai from 'chai';

Given(/^Google page is opened$/, async function () {
  console.log(`Before opening the browser....`);
  await browser.url("https://www.google.co.in/");
  // browser.debug()
  await browser.pause(3000); //pauses for 3secs
  console.log(`After opening the browser....`);
  // console.log(`>> BrowserObj: ${JSON.stringify(browser)}`) // to know the details of browser
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> SearchItem: ${searchItem}`);
  let ele = await $("//textarea[@id='APjFqb']");
  // await ele.click()
  await ele.setValue(searchItem);
  await browser.keys("Enter");
  // console.log(`>> EleObj: ${JSON.stringify(ele)}`) // to know the details of element
});

Then(/^Click on first search result$/, async function () {
  // let ele = await $("//h3");
  let ele = await $("<h3>"); //tagname locator //
  ele.click();
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  // console.log(`>> ExpectedURL: ${expectedURL}`);
  // // await expect(browser).toHaveUrl(`${ExpectedURL}`) //this line is without chai
  // let url = await browser.getUrl()
  // // chai.expect(url).to.equal(ExpectedURL)
  // console.log(`>> ActualURL: ${url}`);
  // chai.expect(url).to.equal(expectedURL);


  //OR
  //OR by using of waitUntil func to wait until expected browser title is loaded
    await browser.waitUntil(async function() {
      return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    }, {timeout: 5000, timeoutMsg: "expected text to be different after 5s", interval: 500}) //interval: 500 means it check for every 500 millisecs
  
    // //below are the exaples of other waitUntil use cases // below code will not work
    // await browser.waitUntil(async function() {
    //   return (await $("")).isDisplayed()
    //   return (await $("")).isEnabled()
    //   return (await $("")).isClickable()
    // }, {timeout: 5000, timeoutMsg: "expected text to be different after 5s", interval: 500})  
});
