import { Given, When, Then } from "@wdio/cucumber-framework";
// import * as chai from 'chai';

Given(/^A Web page is opened-inputbox$/, async function () {
  await browser.url("/inputs");  //appending the baseURL
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-inputbox$/, async function () {
  /**
   * 1. Inputbox
   * Actoins:
   * 1. type into inputbox
   * 2. clear the field and type or add value
   * 3. click and type
   * 4. slow typing
   */

  /**
   * my practice:
  let ele = await $(`a=Inputs`) //text locator
  ele.click()
  let ele2 = await $(`input[type='number']`) //xpath locator
  ele2.click()
   */

  let num = 12345;
  let strNum = num.toString(); //conerts number to string
  let ele = await $(`input[type='number']`); //xpath locator for inputbox

  ele.click(); //click the inputbox before typing
  // ele.moveTo()  //move to the inputbox before typing
  // ele.scrollIntoView  //scrolls to the inputbox before typing

  // ele.setValue(strNum) //setValue clears and type the value, WHERE AS addValue will type without clearing the field first
  // ele.addValue("1234") //addValue types without clearing the field first

  //4. slow typing //for this we dont need "ele.setValue(strNum)" line instead we need line "ele.click()"
  for (let i = 0; i < strNum.length; i++) {
    let charStr = strNum.charAt(i);
    await browser.pause(1000); //pauses for 1sec after every char is typed
    await browser.keys(charStr);
  }

  await browser.debug(); //waits after typing. to resume, ctrl+c 2times
});
