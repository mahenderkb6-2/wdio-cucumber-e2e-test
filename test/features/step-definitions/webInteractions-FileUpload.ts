import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-FileUpload$/, async function () {
  // await browser.url("/javascript_alerts");  //no url bcoz we've set the baseUrl in wdio.conf.ts //appending the baseURL
  await browser.url("/upload"); 
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-FileUpload$/, async function () {
  console.log(process.cwd()); //to know the starting  part of the path
  await $(`#file-upload`).addValue(`${process.cwd()}/data/fileupload/dummy.txt`); //our file is kept in choose file button //IT'LL ONLY WORK FOR FORWARD SLASH
  await $(`#file-submit`).click(); //click upload button
  let fileUploadedTxt = await (await $(`#uploaded-files`)).getText();
  console.log(`>> fileUploadedTxt: ${fileUploadedTxt}`);
  await browser.debug();
});
