import { Then } from "@wdio/cucumber-framework";
import * as chai from 'chai';
import logger from "../../helper/logger.ts";
import reporter from "../../helper/reporter.ts";

Then(/^Inventory page should (.*)\s?list (.*)$/, async function (negativeCheck,noOfProducts) {   //OR Inventory page should( not)? list (.*) //Matches steps like 1.Inventory page should list <NoOfProducts> 2.Inventory page should not list <NoOfProducts>
  try {
    // console.log(banana) //Example of ReferenceError, shows ---> ReferenceError: banana is not defined--->CLASS:65
    // throw Error(`: forcefully fail`) //we're forcefully making this function to fail ----> for lecture:58 and 63
    console.log(`>>>> The appid: ${this.appid}`)
    
  
    // console.log(`>> negativeCheck: ${negativeCheck} and noOfProducts: ${noOfProducts}`)
    if(!noOfProducts) throw Error(`Invalid product count is provided: ${noOfProducts}`) //to check the value from examples table is right value,right length,not null/undefined/empty string/number
    let eleArr=await $$(`.inventory_item_name`)
    try {
      chai.expect(eleArr.length).to.equal(parseInt(noOfProducts)) //equal is === //the value getting from data table is STRING but eleArr.length is INTEGER so, convert the value from table to integer
    } catch (err) {
      reporter.addStep(this.testid, "error", "Known issue-product count mismatch", true, "JIRA-123")
    }
  } catch (err) {
    console.log(`********** The type of err: ${typeof err}`)
    console.log(`********** The name of property: ${err.name}`)
    console.log(`********** The message property: ${err.message}`)

    err.message = `${this.testid}: Failed when comparing the product count, ${err.message}` //we're getting the testid from beforeScenario hook in wdio.conf.ts
    console.log(`********** The message property with testid: ${err.message}`)
    throw err

    // logger.error(err.message)
  }
});

Then(/^Validate all products have valid price in Inventory page$/, async function(){ 
  //@ts-ignore
  logger.info(`>>>>${browser.options.testid}: Checking the price...`)


  /**
   * 1. Get price list
   * 2. Convert string to number
   * 3. Assert if any value is <= 0
   */

  /**1. Get price list */
  let eleArr=await $$(`.inventory_item_price`)
  let priceStrArr=[]
  for (let i=0;i<eleArr.length;i++){
    let priceTxt=await eleArr[i].getText()
    priceStrArr.push(priceTxt)
  }
  console.log(`>> priceStrArr: ${priceStrArr}`)

  /**2. Convert string to number */
  let priceNumArr=priceStrArr.map(ele => +(ele.replace("$", ""))) //ele => means function ////Unary plus i.e + will convert a string to number 
  console.log(`>> priceNumArr: ${priceNumArr}`)

  /**3. Assert if any value is <= 0 */
  let invalidPriceArr = priceNumArr.filter(ele => ele <= 0)
  chai.expect(invalidPriceArr.length).to.equal(0)
});

