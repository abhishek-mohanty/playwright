import { expect } from '@playwright/test';
import test from './ackc.config';

const createDraft = async ({ request }) => {
    const response = await request.post(`onboarding/create`, {
        data: {
            "user_id": "string",
            "name": "string1",
            "partner_id": "cred",
            "product_id": "string",
            "draft_type": "product_addition"
        }
    })
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json()
    console.log("response body for create draft: ", responseBody)
    expect(responseBody.message).toEqual('Draft created successfully')
    return responseBody.data.draft_id
}

test('Create Draft', createDraft)


test('Fetch Draft', async ({ request }) => {
    const draftId = await createDraft({ request })
    const action = "configure_product"
    const response = await request.get(`onboarding/${draftId}?action=${action}`)
    expect(response.ok()).toBeTruthy();
})
