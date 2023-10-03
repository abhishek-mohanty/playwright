import test, { expect, request } from "@playwright/test";

test.use({
    baseURL: 'http://internet-ackcelerator-service-embedded-dev.internal.ackodev.com/ackcelerator-service/api/',
    extraHTTPHeaders: {
        'Cookie': 'corp_session=8c619afd-b7ec-4d2b-ada9-6d6caa46d00f'
    },
})

export default test