import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-Dropdown$/, async function () {
  await browser.url("/dropdown");  //appending the baseURL
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-Dropdown$/, async function () {
  /**
   * 2. Inputbox
   * Actions:
   * 1. Assert default option is selected
   * 2. Select by attribute,text, and index
   * 3. Get a list of options
   */

  // //1. Assert default option is selected
  // let ele = await $("//select/option[@selected='selected']")
  // let val = await ele.getText()
  // chai.expect(val).to.equal("Please select an option")
  // await browser.debug()

  // //2. Select by text
  // let ele = await $("//select[@id='dropdown']");
  // // let optSelected = "Option 1";
  // await ele.selectByVisibleText("Option 1");
  // let ele2 = await $("//select/option[@selected='selected']");
  // let val = await ele2.getText();
  // console.log(`>> val: ${val}`);
  // chai.expect(val).to.equal("Option 1");
  // await browser.debug();

  // //2. Select by attribute
  // let ele = await $("//select[@id='dropdown']");
  // await ele.selectByAttribute("value", "2")    //selects "Option 2"
  // await browser.debug();

  // //2. Select by index
  // let ele = await $("//select[@id='dropdown']");
  // await ele.selectByIndex(0)    //selects 1st option i.e. "Please select an option"
  // await browser.debug();

  //3. Get a list of options
  let eleArr = await $$("select>option"); //multipleElements //1.Xpath --> "//select/option" 2.CSS --> "select>option" OR "select option"
  let arr = []; //empty list array
  for (let i = 0; i < eleArr.length; i++) {
    let ele = eleArr[i];
    let val = await ele.getText();
    arr.push(val); //adding each option to arr
    console.log(val); //prints each option
  }
  console.log(`>> Options Array: ${arr}`); //prints what all options are stored in arr
  await browser.debug();
});
