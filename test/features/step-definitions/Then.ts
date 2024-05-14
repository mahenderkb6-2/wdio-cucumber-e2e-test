import { Then } from "@wdio/cucumber-framework";
import * as chai from 'chai';

Then(/^Inventory page should list (.*)$/, async function (noOfProducts) {
if(!noOfProducts) throw Error(`Invalid product count is provided: ${noOfProducts}`) //to check the value from examples table is right value,right length,not null/undefined/empty string/number
let eleArr=await $$(`.inventory_item_name`)
chai.expect(eleArr.length).to.equal(parseInt(noOfProducts)) //equal is === //the value getting from examples table is STRING but eleArr.length is INTEGER so, convert the value from table to integer
});

Then(/^Validate all products have valid price in Inventory page$/, async function(){ 
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

