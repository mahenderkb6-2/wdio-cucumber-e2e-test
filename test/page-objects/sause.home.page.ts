import Page from "./page.ts"
import * as chai from "chai";
import reporter from "../helper/reporter.ts";

class HomePage extends Page{
    constructor(){
        super() // this will load all of the defined properties and methods of the Page class
    }
    /**
    await $(`#user-name`).setValue(dt[0].Username) //we're getting Username value from 1st obj (i.e. zero index) in an array //we're getting value from dt i.e. from dataTable
    // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME) //we're getting value from .env file
    await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)  //we're getting value from .env file
    await $(`#login-button`).click()
     */

    /**Page objects */
    get usernameInputBox() {return $(`#user-name`)}
    get passwordInputBox() {return $(`#password`)}
    get loginBtn() {return $(`#login-button`)}

    /**Page actions */
    async enterUsername(testid: string, username: string) {
        if (!username) throw Error(`Given username: ${username} is not valid`)
        try {
            username = username.trim()
            await this.typeInto(await this.usernameInputBox, username)
            reporter.addStep(testid, "info", `Username: ${username} entered successfully`)
        } catch (err) {
            err.message = `Error entering username: ${username}, ${err.message}`
            throw err
        }
    }

    async enterPassword(testid: string, password: string) {
        if (!password) throw Error(`Given password is not valid`)
        try {
            password = password.trim()
            await this.typeInto(await this.passwordInputBox, password)
            reporter.addStep(testid, "info", `password entered successfully`)
        } catch (err) {
            err.message = `Error entering password, ${err.message}`
            throw err
        }
    }

    async clickLoginBtn(testid: string) {
        try {
            await this.click(await this.loginBtn)
            reporter.addStep(testid, "info", `Login button clicked`)
        } catch (err) {
            err.message = `Error clicking login button, ${err.message}`
            throw err
        }
    }

    async loginToSauseApp(testid: string, username: string, password: string) { //Here, we're combining enterUsername(), enterPassword(), and clickLoginBtn() fucntions into single fucntion
        try {
            await this.enterUsername(testid, username)
            await this.enterPassword(testid, password)
            await this.clickLoginBtn(testid)
        } catch (err) {
            throw err
        }
    }
}

export default new HomePage() //when we import Homepage, we can use Page actions by HomePage.<Page action>