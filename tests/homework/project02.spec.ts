import { test, expect, Page } from "@playwright/test";
import { ShoppingCartPage } from "../../pages/ShoppingCartPage";




test.describe("Project 02 - Shopping Cart", () => {

    let shoppingCartPage: ShoppingCartPage;

    test.beforeEach(async ({ page }) => {

        shoppingCartPage = new ShoppingCartPage(page);
        await page.goto('https://www.techglobal-training.com/frontend/shopping-cart')
    })

    /*Test Case 01 - Available Courses Section Validation
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Validate the heading is “Available Courses”
    Validate that there are 3 courses displayed
    Validate that each course has an image, name, TechGlobal School tag, 
    and a price of more than zero
    Validate the first 2 courses have discount tags
    Validate that there is an “Add to Cart” button under each course which 
    is displayed, enabled, and has the text “Add to Cart”
     */
    test('Test Case 01 - Available Courses Section Validation', async ({ page }) => {

        // Validate the heading is “Available Courses”

        await expect(shoppingCartPage.mainHeading).toBeVisible();

        //Validate that there are 3 courses displayed
        for (const course of shoppingCartPage.courses) {
            await expect(course).toBeVisible();
        }

        //Validate that each course has an image, name, TechGlobal School tag,  and a price of more than zero

        for (const image of shoppingCartPage.images) {
            await expect(image).toBeVisible();
        }
        for (const name of shoppingCartPage.names) {
            await expect(name).toBeVisible();
            const nameText = await name.textContent();
            console.log(nameText);
        }

        for (const tag of shoppingCartPage.tags) {
            await expect(tag).toContainText('TechGlobal School');
        }


        const priceText1 = await shoppingCartPage.course1Price.innerText();
        const price1 = parseFloat(priceText1.replace('$', '').trim());
        expect(price1).toBeGreaterThan(0);
        const priceText2 = await shoppingCartPage.course1Price.innerText();
        const price2 = parseFloat(priceText2.replace('$', '').trim());
        expect(price2).toBeGreaterThan(0);
        const priceText3 = await shoppingCartPage.course1Price.innerText();
        const price3 = parseFloat(priceText3.replace('$', '').trim());
        expect(price3).toBeGreaterThan(0);


        //Validate the first 2 courses have discount tags

        for (const discount of shoppingCartPage.discounts) {
            await expect(discount).toBeVisible();
            const discountText = await discount.textContent();
            console.log(discountText);
        }


        //Validate that there is an “Add to Cart” button under each course

        for (const button of await shoppingCartPage.addButton.all()) {
            await expect(button).toBeVisible();
            await expect(button).toBeEnabled();
            await expect(button).toHaveText('Add to Cart');
        }
    })

    /*Test Case 02 - Cart Section Validation
Navigate to https://techglobal-training.com/frontend/shopping-cart
Validate the heading is “Items Added to Cart”
Validate that the cart is empty by default
Validate that the total price is zero “$0” by default
Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
     */
    test('Test Case 02 - Cart Section Validation', async ({ page }) => {

        //Validate the heading is “Items Added to Cart”
        await expect(shoppingCartPage.cartName).toBeVisible();
        await expect(shoppingCartPage.cartName).toHaveText('Items Added to Cart');

        //Validate that the cart is empty by default
        //Validate that the total price is zero “$0” by default
        await expect(shoppingCartPage.totalPrice).toHaveText('Total: $0');

        //Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
        await expect(shoppingCartPage.placeOrderButton).toBeVisible();
        await expect(shoppingCartPage.placeOrderButton).toBeDisabled();
        await expect(shoppingCartPage.placeOrderButton).toHaveText('Place Order');
    })


    /*Test Case 03 - Add a Course to the Cart and Validate
   Navigate to https://techglobal-training.com/frontend/shopping-cart
   Click on the “Add to Cart” button for one of the courses
   Validate that the course is displayed in the cart with its image, name, and discount amount if available
   Validate that the course price is added to the total price excluding the discount amount
   Click on the “Place Order” button
   Validate a success message is displayed with the text “Your order has been placed.”
   Validate that the cart is empty
     */

    test('Test Case 03 - Add a Course to the Cart and Validate', async ({ page }) => {

        //Click on the “Add to Cart” button for one of the courses
        await shoppingCartPage.clickFirstAddButton();




        // Validate that the course is displayed in the cart with its image, name, and discount amount if available
        await expect(shoppingCartPage.course1inCart).toBeVisible();
        await expect(shoppingCartPage.course1inCart).toHaveText('SDET Course | Cypress Playwright$80(20 % off)');
        // expect (shoppingCartPage.course1inCart).toHaveAttribute('alt','Course 1');

        //Click on the “Place Order” button
        await expect(shoppingCartPage.placeOrderButton).toBeEnabled();
        await shoppingCartPage.clickPlaceOrderButton();

        //Validate a success message is displayed with the text “Your order has been placed.”

        await expect(shoppingCartPage.placedOrderMessage).toBeVisible();
        await expect(shoppingCartPage.placedOrderMessage).toHaveText('Your order has been placed.');

        //Validate that the cart is empty


    })

    /*Test Case 04 - Add Two Courses to the Cart and Validate
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Click on the “Add to Cart” button for one of the courses
    Click on the “Add to Cart” button for another course
    Validate that the courses are displayed in the cart with their image, name, and discount amount if available
    Validate that the course prices are added to the total price excluding the discount amounts
    Click on the “Place Order” button
    Validate a success message is displayed with the text “Your order has been placed.”
    Validate that the cart is empty
     */
    test('Test Case 04 - Add Two Courses to the Cart and Validate', async ({ page }) => {

        //Click on the “Add to Cart” button for one of the courses
        //Click on the “Add to Cart” button for another course

        await shoppingCartPage.clickFirstAddButton();
        await shoppingCartPage.clickSecondAddButton();

        await expect(shoppingCartPage.course1inCart).toBeVisible();
        await expect(shoppingCartPage.course1inCart).toHaveText('SDET Course | Cypress Playwright$80(20 % off)');

        await expect(shoppingCartPage.course2inCart).toBeVisible();
        await expect(shoppingCartPage.course2inCart).toHaveText('Playwright Automation Testing$72(10 % off)');

        await expect(shoppingCartPage.placeOrderButton).toBeEnabled();
        await shoppingCartPage.clickPlaceOrderButton();

        await expect(shoppingCartPage.placedOrderMessage).toBeVisible();
        await expect(shoppingCartPage.placedOrderMessage).toHaveText('Your order has been placed.');


    })

    /*Test Case 05 - Add All Three Courses to the Cart and Validate
Navigate to https://techglobal-training.com/frontend/shopping-cart
Click on the “Add to Cart” button for all three courses
Validate that the courses are displayed in the cart with their image, name, and discount amount if available
Validate that the course prices are added to the total price excluding the discount amounts
Click on the “Place Order” button
Validate a success message is displayed with the text “Your order has been placed.”
Validate that the cart is empty
     */

    test('Test Case 05 - Add All Three Courses to the Cart and Validate', async ({ page }) => {

        await shoppingCartPage.clickFirstAddButton();
        await shoppingCartPage.clickSecondAddButton();
        await shoppingCartPage.clickThirdAddButton();

        await expect(shoppingCartPage.course1inCart).toBeVisible();
        await expect(shoppingCartPage.course1inCart).toHaveText('SDET Course | Cypress Playwright$80(20 % off)');

        await expect(shoppingCartPage.course2inCart).toBeVisible();
        await expect(shoppingCartPage.course2inCart).toHaveText('Playwright Automation Testing$72(10 % off)');

        await expect(shoppingCartPage.course3inCart).toBeVisible();
        await expect(shoppingCartPage.course3inCart).toHaveText('Cypress Automation Course$10');

         await expect(shoppingCartPage.placeOrderButton).toBeEnabled();
        await shoppingCartPage.clickPlaceOrderButton();

          await expect(shoppingCartPage.placedOrderMessage).toBeVisible();
        await expect(shoppingCartPage.placedOrderMessage).toHaveText('Your order has been placed.');

    })

})