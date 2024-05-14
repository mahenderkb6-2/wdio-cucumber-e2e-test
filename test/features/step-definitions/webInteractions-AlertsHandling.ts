import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-AlertsHandling$/, async function () {
  // await browser.url("/javascript_alerts"); // for 1to5 methods //no url bcoz we've set the baseUrl in wdio.conf.ts //appending the baseURL
  await browser.url("/basic_auth"); // for 6th method i.e Browser Auth
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-AlertsHandling$/, async function () {
  /**
   * 5. Alerts Handling
   * Methods used:
   * 1. isAlertOpen() --> boolean
   * 2. acceptAlert()
   * 3. dismissAlert()
   * 4. getAlertText()
   * 5. sendAlertText()
   * 6. Browser Auth
   */

  // /**1. isAlertOpen() */
  // await (await $(`button=Click for JS Alert`)).click()
  // console.log(`>> isAlertOpen: ${await browser.isAlertOpen()}`)
  // await browser.acceptAlert()
  // let resultTxt = await (await $(`#result`)).getText()
  // console.log(`>> resultTxt: ${resultTxt}`)

  // /**2. acceptAlert() */
  // await (await $(`button=Click for JS Confirm`)).click()
  // await browser.acceptAlert()
  // let resultTxt = await(await $(`#result`)).getText()
  // console.log(`>> resultTxt: ${resultTxt}`)

  // /**3. dismissAlert() */
  // await (await $(`button=Click for JS Confirm`)).click();
  // await browser.dismissAlert();
  // let resultTxt = await (await $(`#result`)).getText();
  // console.log(`>> resultTxt: ${resultTxt}`);
  // //   //OR
  // // await (await $(`button=Click for JS Confirm`)).click();
  // // if(browser.isAlertOpen()){
  // //   await browser.dismissAlert();
  // // }
  // // let resultTxt = await(await $(`#result`)).getText()
  // // console.log(`>> resultTxt: ${resultTxt}`)


  // /**4. getAlertText() */
  // await (await $(`button=Click for JS Prompt`)).click();
  // let alertTxt=await browser.getAlertText()
  // console.log(`>> alertTxt: ${alertTxt}`);
  // // let resultTxt = await (await $(`#result`)).getText();
  // console.log(`>> resultTxt: ${await (await $(`#result`)).getText()}`);

  // /**5. sendAlertText() */
  // await (await $(`button=Click for JS Prompt`)).click();
  // await browser.sendAlertText(`Mahender`)
  // await browser.acceptAlert()
  // console.log(`>> resultTxt: ${await (await $(`#result`)).getText()}`);

  /**6. Browser Auth */
  // NO NEED OF CREDS BCOZ WE'RE GIVING IN BaseURL itself i.e. in wdio.conf.ts
  let successTxt= await(await $(`div[class='example'] p`)).getText()
  console.log(`>> successTxt: ${successTxt}`)


  await browser.debug();
});
