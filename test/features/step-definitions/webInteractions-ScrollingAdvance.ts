import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-ScrollingAdvance$/, async function () {
  await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/");
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-ScrollingAdvance$/, async function () {
  /**srolling
   * visible portion
   * window object:
   * 1. scrollBy
   * y --> [-]window.innerHeight
   */
  //scroll down a little bit
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight); //window.scrollBy(<x coordinates>, <y coordinates>)
  });
  await browser.pause(2000);
  //scroll up
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });
  /**invisible portion
   * window object:
   * 2. scrollTo
   * y --> document.body.srollTop or srollHeight
   */
  await browser.pause(2000);
  //scroll down i.e. bottom end
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight); //window.scrollBy(<x coordinates>, <y coordinates>)
  });
  await browser.pause(2000);
  //scroll up i.e. top end
  await browser.execute(() => {
    window.scrollTo(0, -document.body.scrollHeight);
    // window.scrollTo(0, document.body.scrollTop); //not working
  });
  await browser.pause(2000);
});
