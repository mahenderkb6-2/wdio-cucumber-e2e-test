import { Given } from '@wdio/cucumber-framework';
import * as chai from 'chai';

Given(/^Login to inventory web app-ReloadRefreshBackForward$/, async function () {
  /**
   * 8. Reload,Refresh,Back and Forward
   * 1.Reload
   * 2.Refresh
   * 3.Back
   * 4.Forward
   * 
   * Methods used:
   * 1. reloadSession()
   * 2. 
   */

  //Open web app
  await browser.url("https://www.saucedemo.com/v1/"); 
  await browser.setTimeout({ implicit: 5000, pageLoad: 10000 }); //waits max. of 5 secs for web element and max. of 10sec for page load

  // /**1. Reload */
  // //Enter Creds
  // await $(`#user-name`).setValue("standard_user")
  // await $(`#password`).setValue("secret_sauce")
  // await $(`#login-button`).click()


  // await browser.pause(2000)
  // await browser.reloadSession() //reloading the session to login with diff creds i.e. it cleans the browser session
  // await browser.url("https://www.saucedemo.com/v1/"); 
  // await $(`#user-name`).setValue("problem_user")
  // await $(`#password`).setValue("secret_sauce")
  // await $(`#login-button`).click()


  /**2.Refresh, 3.Back and 4.Forward */
  try {
    await $(`#user-name`).setValue("standard_user") 
    await $(`#passwor`).setValue("secret_sauce")  //intentionally giving wrong locator for password field inorder to go catch block
    await $(`#login-button`).click()
  } catch (err) {
    console.log(`>> Error in try block going catch block..`)
    await browser.refresh()
    await browser.pause(2000)
    await $(`#user-name`).setValue("standard_user") 
    await $(`#password`).setValue("secret_sauce")
    await $(`#login-button`).click()
  }
  await browser.back()
  console.log(`>> backPageText: ${await $(`h4=Accepted usernames are:`).getText()}`)
  await browser.pause(2000)
  await browser.forward()
  console.log(`>> forwardPageText: ${await $(`div=Sauce Labs Backpack`).getText()}`)
});

