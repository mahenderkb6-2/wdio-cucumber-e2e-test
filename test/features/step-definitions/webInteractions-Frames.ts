import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-Frames$/, async function () {
  // await browser.url("/javascript_alerts");  //no url bcoz we've set the baseUrl in wdio.conf.ts //appending the baseURL
  await browser.url("/frames"); 
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-Frames$/, async function () {
  /**
   * 6. Frames
   * Methods used:
   * 1. switchToFrame()
   * 2. switchToParentFrame()
   */

  /**1. switchToFrame() and 2. switchToParentFrame() */
  await(await $(`=iFrame`)).click() //selecting iframe hyperlink
  let eleFrame = await $(`#mce_0_ifr`)
  await browser.switchToFrame(eleFrame)
  await(await $(`#tinymce`)).addValue(`Mahender`)
  console.log(`>> currentText: ${await (await $(`#tinymce`)).getText()}`)

  await browser.switchToParentFrame()
  let ele2 = await(await $(`span=Format`)).getText()
  console.log(`>> parentHeaderTxt: ${ele2}`)

  await browser.debug()
});
