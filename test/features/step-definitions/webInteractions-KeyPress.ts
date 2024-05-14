import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-KeyPress$/, async function () {
  // await browser.url("/javascript_alerts");  //no url bcoz we've set the baseUrl in wdio.conf.ts //appending the baseURL
  await browser.url("/frames"); 
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-KeyPress$/, async function () {
  /**
   * 7. KeyPress
   * Methods used:
   * 1. keys()
   */
  await $(`=iFrame`).click() //selecting iframe hyperlink
  let eleFrame = await $(`#mce_0_ifr`)
  await browser.switchToFrame(eleFrame)
  await $(`#tinymce`).click()
  // console.log(`>> textBeforeClear: ${await (await $(`#tinymce`)).getText()}`)
  await browser.keys(['Control', 'a']) //ctrl+a i.e. selects all
  // await browser.keys(['Delete'])
  await $(`#tinymce`).addValue(`Mahender`)
  // console.log(`>> textAfterClear: ${await (await $(`#tinymce`)).getText()}`)

  await browser.debug()

});
