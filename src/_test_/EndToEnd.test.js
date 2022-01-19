import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    // jest.setTimeout(300000);

    beforeAll(async () => {

        browser = await puppeteer.launch({
            // headless: false,
            //slowMo: 250, // slow down by 250ms
            // ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });


    //Feature 2 :Scenario 1 An event element is collapsed by default
    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeNull();
    });


    //Feature 2 :scenario 2 User can expand an event to see its details
    test('User can expand an event to see its details', async () => {
        await page.click('.event .show-details');
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeDefined();
    });

    //Feature 2:Scenario 3 User can collapse an event to hide its details
    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .hide-details');
        const eventDetails = await page.$('.event .extra-details');
        expect(eventDetails).toBeNull();
    });
});