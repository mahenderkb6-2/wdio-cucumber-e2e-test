import Page from "./page.ts"
import * as chai from "chai";
import reporter from "../helper/reporter.ts";

class AdminHomePage extends Page{
    constructor(){
        super() // this will load all of the defined properties and methods of the Page class
    }
    
    // let customerDropdown = await $("//a[@href='#']/p[contains(text(),'Customers')]")
    // customerDropdown.click()
    // let customersOption = await $("//a[contains(@href,'/Customer/List')]//p[contains(text(),'Customers')]")
    // customersOption.click()

    /**Page objects */
    get customerDropdown() {return $("//a[@href='#']/p[contains(text(),'Customers')]")}
    get customersOption() {return $("//a[contains(@href,'/Customer/List')]//p[contains(text(),'Customers')]")}

    /**Page actions */
    async searchCustomer() {
        try {
            // reporter.addStep(testid, "info", `Login to: ${url} with ${username}`)
            await this.click(await this.customerDropdown)
            await this.click(await this.customersOption)
            await browser.pause(5000)
            // reporter.addStep(testid, "info", `Login to: ${url} with ${username} is successfully`)
        } catch (err) {
            err.message = `Failed searchCustomer (in nopcommerce.home.page copy.ts), ${err.message}`
            // err.message = `Failed login to nopcommerce web: ${url}, with ${username}`
            throw err
        }
    }
}
export default new AdminHomePage() //when we import Homepage, we can use Page actions by HomePage.<Page action>