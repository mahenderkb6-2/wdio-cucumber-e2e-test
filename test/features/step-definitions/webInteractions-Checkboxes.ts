import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-Checkboxes$/, async function () {
  await browser.url("/checkboxes");  //appending the baseURL
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-Checkboxes$/, async function () {
  /**
   * 3. Checkbox
   * Actions:
   * 1. Select the checkbox
   * 2. Unselect the checkbox (if selected)
   * 3. Assert if checkbox is selected
   * 4. Select all checkboxes
   */

  // /**1. Select the checkbox */
  // let ele =await $("//form[@id='checkboxes']/input[1]")
  // ele.click()

  // /**2. Unselect the checkbox (if selected) */
  // let ele = await $("//form[@id='checkboxes']/input[2]");
  // ele.click();

  // /**3. Assert if checkbox is selected */
  // let ckbox2 = await(await ($("//form[@id='checkboxes']/input[2]"))).isSelected();
  // chai.expect(ckbox2).to.be.true // this will pass only if 2nd checkbox is selected

  /**4. Select all checkboxes */
  let eleArr = await $$(`//form[@id='checkboxes']/input`);
  for (let i = 0; i < eleArr.length; i++) {
    let ele2 = eleArr[i];
    if (!(await ele2.isSelected())) { //if not selected, it selects the checkbox
      await ele2.click();
    }
  }
  await browser.debug();

});
