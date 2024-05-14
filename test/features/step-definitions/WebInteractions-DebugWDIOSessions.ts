import { Given, Then } from '@wdio/cucumber-framework';
import * as chai from 'chai';

Given(/^Login to inventory web app-DebugWDIOSessions$/, async function () {
  /**1. Open web app */
  await browser.url("https://www.saucedemo.com/v1/"); 
  // await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load

  /**2. Enter Creds */
  await $(`#user-name`).setValue("standard_user")
  await $(`#password`).setValue("secret_sauce")
  await $(`#login-button`).click()

  

});

Then(/^Inventory page should list-DebugWDIOSessions (.*)$/, async function (noOfProducts) {
  if(!noOfProducts) throw Error(`Invalid product count is provided: ${noOfProducts}`) //to check the value from examples table is right value,right length,not null/undefined/empty string/number
  
  //adding debug inorder to verify the eleArr=$$(`inventory_item_name`)
  //IN CONSOLE, at debug stage, search for $$(`.inventory_item_name`).length to check whether the locator proided is correct or wrong
  await browser.debug()

  let eleArr=await $$(`inventory_item_name`) //intentionally giving wrong locator
  chai.expect(eleArr.length).to.equal(parseInt(noOfProducts)) //equal is === //the value getting from examples table is STRING but eleArr.length is INTEGER so, convert the value from table to integer
  });

  

