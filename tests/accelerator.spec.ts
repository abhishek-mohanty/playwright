import test, { expect, request } from "@playwright/test";

test.use({
    baseURL: 'http://internet-ackcelerator-service-embedded-dev.internal.ackodev.com/ackcelerator-service/api/',
    //storageState: 'playwright/.auth/jarvisAuth.json',
    extraHTTPHeaders: {
        'Cookie': 'corp_session=0c7de472-7023-4cba-98f2-472ca137a342'
    },
})

test('Get Partners', async ({ request }) => {
    const response = await request.get(`partner/fetch/all`)
    expect(response.ok()).toBeTruthy();
    const partnersData = await response.json()
    let partnerList = partnersData.data.map(partner => partner.value)
    console.log("partner list : ", partnerList)
    let uniquePartners = new Set()
    console.error("dublicate partner are : ")
    partnerList.forEach(element => {
        if (uniquePartners.has(element))
            console.error("Partner Name :", element, ",count : ", partnerList.filter(p => p == element).length)
        else
            uniquePartners.add(element)
    });

    expect([...uniquePartners], "There are dublicate elements in the partners list").toContainEqual(partnerList)
    expect(uniquePartners.size).toEqual(partnersData.data.length)
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
