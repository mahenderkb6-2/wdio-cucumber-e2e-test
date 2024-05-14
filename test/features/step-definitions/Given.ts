import { Given } from '@wdio/cucumber-framework';
import * as chai from 'chai';

Given(/^Login to inventory web app$/, async function () {
  /**1. Open web app */
  await browser.url("https://www.saucedemo.com/v1/"); 
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load

  /**2. Enter Creds */
  await $(`#user-name`).setValue("standard_user")
  await $(`#password`).setValue("secret_sauce")
  await $(`#login-button`).click()
});

