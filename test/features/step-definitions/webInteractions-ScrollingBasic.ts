import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-ScrollingBasic$/, async function () {
  // await browser.url("/javascript_alerts");  //no url bcoz we've set the baseUrl in wdio.conf.ts //appending the baseURL
  await browser.url(""); 
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-ScrollingBasic$/, async function () {
  /**
   * 8. ScrollingBasic
   * Methods used:
   * 1. scrollIntoView() -->bydefault, its true  -----> element at top
   * 2. scrollIntoView(false) -----> element at bottom
   */
  
  await $(`h4=Grapes - 1 Kg`).scrollIntoView() //bydefault its true, means element on top
  // await $(`h4=Grapes - 1 Kg`).scrollIntoView(false)
  await browser.debug()

});
