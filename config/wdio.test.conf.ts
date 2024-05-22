import { config as baseconfig } from "../wdio.conf.ts";
export const config = Object.assign(baseconfig,{ //we're merging test configuration with base configuration
    //All test env specific key val pairs
    environment: "TEST",
    sauseDemoURL: "https://www.saucedemo.com/v1/",
    reqresBaseURL: "https://reqres.in",
    nopCommerceBaseURL: "https://admin-demo.nopcommerce.com"
})