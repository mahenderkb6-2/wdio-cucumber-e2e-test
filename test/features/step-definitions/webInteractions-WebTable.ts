import { Given, When, Then } from "@wdio/cucumber-framework";
import * as chai from "chai";

Given(/^A Web page is opened-WebTable$/, async function () {
  await browser.url("https://the-internet.herokuapp.com/tables");
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load
});

When(/^Perform Web Interactoins-WebTable$/, async function () {
  /**
   * 8. WebTable
   * what we're going to cover:
   * 1. check num of rows and columns
   * 2. get whole table data (i.e. in json format)
   * 3. get single row [based on condition]
   * 4. get single column
   * 5.get single cell value [based on another cell]
   */

  /**1. check num of rows and columns */
  let rowCount = await $$(`//table[@id='table1']/tbody/tr`).length;
  console.log(`>> rowCount: ${rowCount}`);
  chai.expect(rowCount).to.equal(4);
  let columnCount = await $$(`//table[@id='table1']/thead/tr/th`).length;
  console.log(`>> columnCount: ${columnCount}`);
  chai.expect(columnCount).to.equal(6);

  /**2. get whole table data (i.e. in json format) */
  // // for(let i=0;i<rowCount;i++){
  // //   for(let j=0;j<columnCount;j++){
  // //     let cellVal = await (await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`)).getText()
  // //     console.log(`>> cellVal: ${cellVal}`)
  // //   }
  // // }
  // let arr=[]
  // for (let i = 0; i < rowCount; i++) {
  //   let personObj = {
  //     LastName: "",
  //     FirstName: "",
  //     Email: "",
  //     Due: "",
  //     Website: "",
  //   };
  //   for (let j = 0; j < columnCount; j++) {
  //     let cellVal = await (await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`)).getText();
  //     // console.log(`>> cellVal: ${cellVal}`);
  //     if (j===0) personObj.LastName=cellVal
  //     if (j===1) personObj.FirstName=cellVal
  //     if (j===2) personObj.Email=cellVal
  //     if (j===3) personObj.Due=cellVal
  //     if (j===4) personObj.Website=cellVal
  //   }
  //   arr.push(personObj)
  // }

  // console.log(`>> Whole table: ${JSON.stringify(arr)}`) //if Arr has an object, we should JSON.stringify()

  /**3. get single row [based on condition] */
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //   let personObj = {
  //     LastName: "",
  //     FirstName: "",
  //     Email: "",
  //     Due: "",
  //     Website: "",
  //   };
  //   for (let j = 0; j < columnCount; j++) {
  //     let cellVal = await (await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[${j + 1}]`)).getText();
  //     let FirstName = await (await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`)).getText(); //Conditoin: get the details when FirstName is Jason
  //     if (FirstName === "Jason") {
  //       if (j === 0) personObj.LastName = cellVal;
  //       if (j === 1) personObj.FirstName = cellVal;
  //       if (j === 2) personObj.Email = cellVal;
  //       if (j === 3) personObj.Due = cellVal;
  //       if (j === 4) personObj.Website = cellVal;
  //     }
  //     // console.log(`>> cellVal: ${cellVal}`);
  //   }
  //   if (personObj.FirstName)
  //     //personObj.FirstName means FirstName should be truth i.e it'll push to arr only if FirstName have value //Truth means should not be null/empty/undefine/zero/not a num/empty string
  //     arr.push(personObj);
  // }
  // console.log(`>> Single Row: ${JSON.stringify(arr)}`); //if Arr has an object, we should JSON.stringify()

  /**4. get single column */
  // let DueArr = [];
  // for (let i = 0; i < rowCount; i++){
  //   let DueVal = await (await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`)).getText();
  //   DueArr.push(DueVal)
  // }
  // console.log(`>> DueArr: ${DueArr}`)

  /**5.get single cell value [based on another cell] */
  let arr = [];
  for (let i = 0; i < rowCount; i++){
      let price = await (await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[4]`)).getText();
      let FirstName = await (await $(`//table[@id='table1']/tbody/tr[${i + 1}]/td[2]`)).getText(); //Conditoin: get the FirstName whose due is > 50
      if(+(price.replace("$", ""))>50){ //Unary plus i.e + will convert a string to number
        arr.push(FirstName)
    }
  }
  console.log(`>> FirstNames of Due>50: ${arr}`)  

  await browser.debug();
});
