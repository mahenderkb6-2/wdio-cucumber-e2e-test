import Page from "./page.ts"
import * as chai from "chai";
import reporter from "../helper/reporter.ts";

class CustList extends Page{
    constructor(){
        super() // this will load all of the defined properties and methods of the Page class
    }
    /**Page objects */
    get firstNameInputBox() {return $(`#SearchFirstName`)}
    get lastNameInputBox() {return $(`#SearchLastName`)}
    get searchBtn() {return $('#search-customers')}
    get noResultMessage() {return $(`td=No data available in table`)}

    /**Page actions */
    async searchNameAndConfirm(testid: string, firstname: string, lastname: string):  Promise<boolean> { /**This method returns boolean */
        if (!firstname || !lastname) throw Error(`Invalid firstname: ${firstname} or lastname: ${lastname} to search`)
        let nameNotExist = false
        firstname = firstname.trim()
        lastname = lastname.trim()
        try {
            reporter.addStep(testid, "info", `Search user: ${firstname} ${lastname}`)
            await this.typeInto(await this.firstNameInputBox, firstname)
            await this.typeInto(await this.lastNameInputBox, lastname)
            await this.click(await this.searchBtn)
            await browser.pause(1000)
            let isNotDisplayed = (await this.noResultMessage).isDisplayed() /**isNotDisplayed gives boolean */
            if(isNotDisplayed) nameNotExist=true
            // reporter.addStep(testid, "info", `searching given firstname: ${firstname} and lastname: ${lastname} on customers page is successfully`)
        } catch (err) {
            throw `Failed searching given firstname: ${firstname} and lastname: ${lastname} on customers page, ${err}`
        }
        return nameNotExist /**if true, customer exists and if false, customer doesn't exists*/
    }
}
export default new CustList() //when we import Homepage, we can use Page actions by HomePage.<Page action>