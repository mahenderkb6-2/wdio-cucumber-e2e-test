import Page from "./page.ts"
import * as chai from "chai";
import reporter from "../helper/reporter.ts";

class HomePage extends Page{
    constructor(){
        super() // this will load all of the defined properties and methods of the Page class
    }
    /**Page objects */
    get usernameInputBox() {return $(`#Email`)}
    get passwordInputBox() {return $(`#Password`)}
    get loginBtn() {return $('button=Log in')}

    /**Page actions */
    async loginTonopcommerceWeb(testid: string, url: string, username: string, password: string) {
        if (!url || !username || !password) throw Error(`Given data, url: ${url}, username: ${username} or password is not valid`)
        url = url.trim()
        username = username.trim()
        try {
            reporter.addStep(testid, "info", `Login to: ${url} with ${username}`)
            await this.navigateTo(url)
            await this.typeInto(await this.usernameInputBox, username)
            await this.typeInto(await this.passwordInputBox, password)
            await this.click(await this.loginBtn)
            reporter.addStep(testid, "info", `Login to: ${url} with ${username} is successfully`)
        } catch (err) {
            err.message = `Failed login to nopcommerce web: ${url}, with ${username}, ${err.message}`
            // err.message = `Failed login to nopcommerce web: ${url}, with ${username}`
            throw err
        }
    }
}
export default new HomePage() //when we import Homepage, we can use Page actions by HomePage.<Page action>