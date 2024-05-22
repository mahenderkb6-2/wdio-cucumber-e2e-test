import request from "supertest";
import reporter from "./reporter.ts";

/**what is request */
// console.log(`>> The typeof request: ${typeof request}`)     /**type of request is function */
// console.log(`>> The number of args: ${request.length}`)     /**The number of args is 1  */
// console.log(`>> What is the definition of function: ${request.toString()}`)

/**
 * URL = https://reqres.in/api/users?page=2
 * baseURL = "https://reqres.in"
 * endpoint = "/api/users?page=2"
 * queryParam = {page: 2}
 */

// (async function GET() {
//     let getRes = await request("https://reqres.in") /**baseURL */
//         .get("/api/users") /**endpoint */
//         .query({page: 2}) /**Params tab*/
//     console.log(`>> getRes: ${JSON.stringify(res)}`)
//     console.log(`>> getRes body: ${JSON.stringify(res.body)}`)
// })()

let payload={   /**for POST function */
    email: "eve.holt@reqres.in",
    password: "pistol"
}

async function GET(testid: string, baseURL: string, endpoint: string, authToken: string, queryParam: object) {
  if (!baseURL || !endpoint) {
    throw Error(
      `One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a GET to ${endpoint}`);
  try {
    return await request(baseURL) /**GET line*/
      .get(endpoint) /**GET line*/
      .query(queryParam) /**Params tab*/
      .auth(authToken, { type: "bearer" }) /**Authorization tab*/
      .set("Content-Type", "application/json") /**Headers tab*/
      .set("Accept", "application/json"); /**Headers tab*/
  } catch (err) {
    err.message = `Error making a GET call to ${endpoint}, ${err}`;
    throw err;
  }
}


// (async function POST(testid: string, baseURL: string, endpoint: string, authToken: string, payload: object,) {
//     if (!baseURL || !endpoint) {
//         throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
//     }
//     baseURL = baseURL.trim()
//     endpoint = endpoint.trim()
//     reporter.addStep(testid, "info", `Making a POST to ${endpoint}`)
//     try {
//         let postRes = await request(baseURL) 
//             .post(endpoint) 
//             .auth(authToken, { type: 'bearer' }) 
//             .set("Content-Type", "application/json") 
//             .set("Accept", "application/json") 
//             .send(payload) 
//         console.log(`>> postRes : ${JSON.stringify(postRes)}`)
//         console.log(`>> postRes body: ${JSON.stringify(postRes.body)}`)
//     } catch (err) {
//         err.message = `Error making a POST call to ${endpoint}, ${err}`
//         throw err
//     }
// })("TC001","https://reqres.in", "/api/register","", payload)

async function POST(testid: string, baseURL: string, endpoint: string, authToken: string, payload: object,) {
    if (!baseURL || !endpoint) {
        throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
    }
    baseURL = baseURL.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testid, "info", `Making a POST to ${endpoint}`)
    try {
        return await request(baseURL) /**GET line*/
            .post(endpoint) /**GET line*/
            .auth(authToken, { type: 'bearer' }) /**Authorization tab*/
            .set("Content-Type", "application/json") /**Headers tab*/
            .set("Accept", "application/json") /**Headers tab*/
            .send(payload) /**Body tab*/
    } catch (err) {
        err.message = `Error making a POST call to ${endpoint}, ${err}`
        throw err
    }
}

export default { GET, POST };
