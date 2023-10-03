import { expect, request } from "@playwright/test";
import test from './ackc.config';

test('Get Partners', async ({ request }) => {
    const response = await request.get(`partner/fetch/all`)
    expect(response.ok()).toBeTruthy();
    const partnersData = await response.json()
    let partnerList = partnersData.data
    console.log("partner list : ", partnerList)
    let map = {}
    partnerList.forEach(partner => {
        if (partner in map) {
            map[partner]++
        } else {
            map[partner] = 1
        }
    })
    let uniquePartners = Object.keys(partnerList)
    if (uniquePartners.length < partnerList.length) {
        console.error("dublicate partners are : ")
        uniquePartners.forEach(partner => {
            if (map[partner] > 1)
                console.error(partner, "count : ", map[partner])
        })
    }
    expect(uniquePartners.length).toEqual(partnerList.length)
});

test('Health api', async ({ request }) => {
    const response = await request.get(`partner/health`)
    expect(response.ok()).toBeTruthy();
})

test('Get Logo URL', async ({ request }) => {
    const response = await request.get(`partner/fetch/logo/url`)
    console.log(response)
    //expect(response.ok()).toBeTruthy();
    const responseBody = await response.json()
    console.log("rb: ", responseBody)
    expect(responseBody.message).toEqual('Pre-signed Url fetched successfully')
})


// test.describe('add partners', () => {
//     test.beforeEach(async ({ request }) => {

//     });

//     test('', async ({ request }) => {

//     });
// });
