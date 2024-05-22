import { Given, When, Then } from '@wdio/cucumber-framework'
import reporter from '../../helper/reporter.ts';
import constants from '../../../data/constants.json' assert { type: "json" }; /**if no assert, it shows error -->  Error:  Module "file:///C:...constants.json" needs an import assertion of type "json"*/
import apiHelper from '../../helper/apiHelper.ts';
import * as chai from "chai";
import fs from "fs"
import nopcommerceHomePage from '../../page-objects/nopcommerce.home.page.ts';
import nopcommerceCustlistPage from '../../page-objects/nopcommerce.custlist.page.ts';


Given (/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
    /**
     * Get list of users from reqres.in
     * Sub-steps:
     * 1. Get payload data
     * 2. Make Get call by using API helper (IMPORTANT)
     * 3. Store results
     */

    if (!endpointRef) throw Error(`Given endpoint ref: ${endpointRef} is not valid`);
    try {
        /**1. Get payload data */
        reporter.addStep(this.testid, "info", `Getting the payload for endpoint: ${endpointRef}`)
        let endpoint=""
        if(endpointRef.trim().toUpperCase() === "USERS"){
            endpoint=constants.REQRES.GET_USERS /**constants.REQRES.GET_USERS is from constants.json*/
        } 
        if (!endpoint) throw Error(`Error getting endpoint:${endpoint} from the constants.json`)
    
        /**2. Make Get call by using API helper (IMPORTANT)*/
        let testid=this.testid /**we added this bcoz we got error -->E2E_TC01: Failed at Getting API users from reqres.in, Cannot read properties of undefined (reading 'testid') */
        let res
        await browser.call(async function() {
            //@ts-ignore
            res=await apiHelper.GET(testid, browser.options.reqresBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM) /**browser.options.reqresBaseURL is from wdio.test.conf.ts,  constants.REQRES.QUERY_PARAM is from constants.json*/
        })
        //@ts-ignore
        if(res.status != 200) chai.assert.fail(`Failed getting users from: ${browser.options.reqresBaseURL}/${endpoint}`)
        reporter.addStep(this.testid, "debug", `API response received, data: ${JSON.stringify(res.body)}`)
    
        /**3. Store results */
        let data = JSON.stringify(res.body, undefined, 4) /**values, replacer, space --> i.e. res.body is values, undefined is replacer (i.e. nothing to replace), 4 is space (i.e. it gives 4 spaces=tab space)   */
        let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
        fs.writeFileSync(filename, data) /**this'll write data in filename path */
        reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`)
    } catch (err) {
        err.message=`${this.testid}: Failed at Getting API users from reqres.in, ${err.message}`
        throw err
    }
})

When(/^An as (.*) user login to nopcommerce site$/, async function (user) {
    if(!user) throw Error(`Given user :${user} is not valid`)
    user = user.trim().toUpperCase() /**converting user value to uppercase */
    try {
        reporter.addStep(this.testid, "info", `Login into nopcommerce demo site...`)
        //@ts-ignore
        await nopcommerceHomePage.loginTonopcommerceWeb(
          this.testid,
          //@ts-ignore
          browser.options.nopCommerceBaseURL,
          /**we're getting nopCommerceBaseURL from wdio.test.conf.ts */
          /**we can get the value of an object by:
           * 1. using dot(.) operator eg: process.env.TEST_NOP_ADMIN_USERNAME
           * 2. using string like notation  eg: process.env[`TEST_NOP_${user}_USERNAME`]
           */
          //   process.env.TEST_NOP_ADMIN_USERNAME,
          //   process.env.TEST_NOP_ADMIN_PASSWORD/**we're getting TEST__NOP_ADMIN_USERNAME and TEST__NOP_ADMIN_PASSWORD from .env file */
          process.env[`TEST_NOP_${user}_USERNAME`],
          process.env[`TEST_NOP_${user}_PASSWORD`]
        );
    } catch (err) {
        err.message=`${this.testid}: Failed at nopcommerce login step, ${err.message}`
        throw err
    }
});


Then (/^Verify if all users exist in customers list$/, async function (){
    /**
     * Verify if all users exist in customers list
     * sub-steps:
     * 1. Navigate/select Customers option from left-menu   (Here, we're using Navigate. In the below Then function I've used select)    
     * 2. Read API response from data folder(i.e. /api-res)
     * 3. For each user object in API response
     *  - Enter firstname and lastname
     *  - Search and confirm if user exists
     * 4. In case user doesn't exists write it to error file
     */

    try {
        /**1. Navigate Customers option from left-menu */
        //@ts-ignore
        await browser.url(`${browser.options.nopCommerceBaseURL}/Admin/Customer/List`) 
        // await browser.url("https://admin-demo.nopcommerce.com/Admin/Customer/List")

        reporter.addStep(this.testid, "info", `Navigate to customer list screen...`)
    
        /**2. Read API response from data folder(i.e. /api-res) */
        let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`
        let data = fs.readFileSync(filename, "utf8") 
        /**whenever it reads, it'll be in buffer state so inorder to see through the human eyes, it has to be in formatted*/
        /**In real project, we'll have file handler saperatly (like we have apiHelper.ts functions)*/
        let dataObj = JSON.parse(data) 
        /**parse = to divide (a sentence) into grammatical parts and identify the parts and their relations to each other */
        /**Here, we're dividing the code from string to become an object */
        // console.log(`>> API data: ${JSON.stringify(dataObj)}`)
    
        /**3. For each user object in API response */
        let numOfdata = dataObj.data.length /**In dataObj, we've data key which is an array   */
        let arr=[]
        for(let i=0; i< numOfdata; i++){
            let obj={}
            let firstname = dataObj.data[i].first_name
            let lastname = dataObj.data[i].last_name
            let custNotFound=await nopcommerceCustlistPage.searchNameAndConfirm(this.testid, firstname, lastname) /**custNotFound gives boolean, if true it writes in obj array */
            if(custNotFound){ 
                /**we can set the key in two ways:
                 * 1)using dot(.) operator
                 * 2)using array like notation eg: obj["firstname"] = firstname
                 */
                obj["firstname"] = firstname
                obj["lastname"] = lastname
                arr.push(obj)
            }
        }
    
        /**4. In case user doesn't exists write it to error file */
        if(arr.length > 0){
            let data = JSON.stringify(arr, undefined, 4) /**value, replacer, space --> i.e. arr is value, undefined is replacer (i.e. nothing to replace), 4 is space (i.e. it gives 4 spaces=tab space)   */
            let filename = `${process.cwd()}/results/custNotFoundList.json`
            fs.writeFileSync(filename, data) /**this'll write data in filename path */
        }
    } catch (err) {
        err.message = `${this.testid}: Failed at checking users in nopcommerce site, ${err.message}`
        throw err
    }
})





// /****************OwnPractice - using select Customers option from left-menu**************** */
// Then (/^Verify if all users exist in customers list$/, async function (){
//     /****************OwnPractice - using select Customers option from left-menu**************** */
//     /**
//      * let customerDropdown = await $("//a[@href='#']/p[contains(text(),'Customers')]")
//      * customerDropdown.click()
//      * let customersOption = await $("//a[contains(@href,'/Customer/List')]//p[contains(text(),'Customers')]")
//      * customersOption.click()
//      */

//     try {
//         await nopcommerceCustlistPageOwnPractice.searchCustomer() /**for this, import nopcommerceCustlistPageOwnPractice from '../../page-objects/nopcommerce.custlist.pageOwnPractice.ts'; */
//     } catch (err) {
//         err.message=`${this.testid}: Failed searchCustomer (in e2eTest.ts), ${err.message}`
//     }

// })

