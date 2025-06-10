import { Locator, Page } from "@playwright/test";


export class ShoppingCartPage {

    readonly page: Page;
    readonly mainHeading: Locator;
    readonly addButton: Locator;
    readonly course2: Locator;
    readonly course1: Locator;
    readonly course3: Locator;
    readonly courses: Locator[];
    readonly course1Image: Locator;
    readonly course3Image: Locator;
    readonly course2Image: Locator;
    readonly course1Name: Locator;
    readonly course2Name: Locator;
    readonly course3Name: Locator;
    readonly course1Tag: Locator;
    readonly course2Tag: Locator;
    readonly course3Tag: Locator;
    readonly course2Price: Locator;
    readonly course1Price: Locator;
    readonly course3Price: Locator;
    readonly images: Locator[];
    readonly names: Locator[];
    readonly tags: Locator[];
    readonly prices: Locator[];
    readonly course2Discount: Locator;
    readonly course1Discount: Locator;
    readonly discounts: Locator[];
    readonly cartName: Locator;
    readonly totalPrice: Locator;
    readonly placeOrderButton: Locator;
    readonly course1inCart: Locator;
    readonly course1InCartImage: Locator;
    readonly placedOrderMessage: Locator;
    readonly course2inCart: Locator;
    readonly course3inCart: Locator;


    constructor(page: Page) {
        this.page = page;
        this.mainHeading = this.page.getByRole('heading', { name: 'Available Courses' });
        this.addButton = this.page.getByRole('button', { name: 'Add to Cart' });
        this.course1 = this.page.locator('#course-1');
        this.course2 = this.page.locator('#course-2');
        this.course3 = this.page.locator('#course-3');
        this.course1Image = this.page.getByRole('img', { name: 'Course 1' })
        this.course2Image = this.course2.locator('img');
        this.course3Image = this.course3.locator('img');
        this.course1Name = this.course1.locator('h3');
        this.course2Name = this.course2.locator('h3');
        this.course3Name = this.course3.locator('h3');
        this.course1Tag = this.course1.locator('.my-3');
        this.course2Tag = this.course2.locator('.my-3');
        this.course3Tag = this.course3.locator('.my-3');
        this.course1Price = this.course1.locator('[data-testid="full-price"]');
        this.course2Price = this.course2.locator('[data-testid="full-price"]');
        this.course3Price = this.course3.locator('[data-testid="full-price"]');
        this.course1Discount = this.course1.locator('[data-testid="discount"]');
        this.course2Discount = this.course2.locator('[data-testid="discount"]');




        this.courses = [this.course1, this.course2, this.course3];
        this.images = [this.course1Image, this.course2Image, this.course3Image];
        this.names = [this.course1Name, this.course2Name, this.course3Name];
        this.tags = [this.course1Tag, this.course2Tag, this.course3Tag];
        this.prices = [this.course1Name, this.course2Price, this.course3Price];
        this.discounts = [this.course1Discount, this.course2Discount];

         this.cartName = this.page.locator('.mb-2');
         this.totalPrice = this.page.locator('#total-price');
         this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order'});
         this.course1inCart = this.page.locator('div').filter({ hasText: /^SDET Course \| Cypress Playwright\$80\(20 % off\)$/ }).first();
         this.course2inCart = this.page.locator('div').filter({ hasText: /^Playwright Automation Testing\$72\(10 % off\)$/ }).first()
         this.course3inCart = this.page.locator('div').filter({ hasText: /^Cypress Automation Course\$10$/ }).first()
         this.course1InCartImage = this.page.locator('.mb-2 img[alt="Course 1"]');
         this.placedOrderMessage = this.page.getByText('Your order has been placed.')
    }

async clickFirstAddButton() {
    await this.addButton.first().click();
}
async clickSecondAddButton() {
    await this.addButton.nth(1).click();
}
async clickThirdAddButton() {
    await this.addButton.nth(2).click();
}
async clickPlaceOrderButton() {
    await this.placeOrderButton.click()
}



}