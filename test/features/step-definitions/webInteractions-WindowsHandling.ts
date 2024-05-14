import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-WindowsHandling$/, async function () {
  await browser.url("/windows"); //no url bcoz we've set the baseUrl in wdio.conf.ts //appending the baseURL
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-WindowsHandling$/, async function () {
  /**
   * 4. Windows Handling
   * Steps:
   * 1. launch the browser
   * 2. open another windows
   * 3. switch to window based on title
   * 4. switch back to the main window
   *
   * Methods used:
   * 1. getTitle()
   * 2. getWindowHandle()
   * 3. getWindowHandles()
   * 4. switchToWindow()
   */

  /**1. launch the browser AND 2. open another windows */
  await $(`=Click Here`).click();
  await $(`=Elemental Selenium`).click();
  let currentWinTitle = await browser.getTitle();
  let parentWinHandle = await browser.getWindowHandle();
  console.log(`>> currentWinTitle: ${currentWinTitle}`);

  /**3. switch to window based on title */
  let WinHandles = await browser.getWindowHandles();
  for (let i = 0; i < WinHandles.length; i++) {
    console.log(`>> currentWinHandle: ${WinHandles[i]}`);
    await browser.switchToWindow(WinHandles[i]);
    currentWinTitle = await browser.getTitle();
    if (currentWinTitle === "Home | Elemental Selenium") {
      let headerTxtSel = await (await $(`<h1>`)).getText(); //getting the text with tagname h1
      console.log(`>> headerTxtSel: ${headerTxtSel}`);
      //Rest of actions
      break;
    }
  }

  /**4. switch back to the main window */
  await browser.switchToWindow(parentWinHandle); //OR  await browser.switchToParentFrame()
  console.log(`>> parentTitle: ${await browser.getTitle()}`);
  let parentHeaderTxt = await (await $(`<h3>`)).getText(); //getting the text with tagname h3
  console.log(`>> parentHeaderTxt: ${parentHeaderTxt}`);

  await browser.debug();
});
