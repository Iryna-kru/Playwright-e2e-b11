import { test, expect } from "@playwright/test"

test.describe('Project 01', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/todo-list')
    })

    /*Test Case 01 - Todo-App Modal Verification
    Navigate to https://techglobal-training.com/frontend/todo-list.
    Confirm that the todo-app modal is visible with the title “My Tasks.”
    Validate that the New todo input field is enabled for text entry.
    Validate ADD button is enabled.
    Validate Search field is enabled.
    Validate that the task list is empty, displaying the message “No tasks found!”
     */

    test('Test Case 01 - Todo-App Modal Verification', async ({ page }) => {
        await expect(page.locator('.panel-heading ')).toBeVisible();

        await expect(page.locator('.panel-heading ')).toHaveText('My Tasks');

        const inputField = page.locator('#input-add');
        await expect(inputField).toBeEnabled();

        const addButton = page.locator('#add-btn');
        await expect(addButton).toBeEnabled();

        const searchField = page.locator('#search');
        await expect(searchField).toBeEnabled();

    })

    /*Test Case 02 - Single Task Addition and Removal
    Navigate to https://techglobal-training.com/frontend/todo-list
    Enter a new task in the todo input field and add it to the list.
    Validate that the new task appears in the task list.
    Validate that the number of tasks in the list is exactly one.
    Mark the task as completed by clicking on it.
    Validate item is marked as completed.
    Click on the button to remove the item you have added.
    Remove the completed task by clicking the designated removal button.
    Validate that the task list is empty, displaying the message “No tasks found!”.
     */

    test('Test Case 02 - Single Task Addition and Removal', async ({ page }) => {

        const inputField = page.locator('#input-add');
        await inputField.fill('Homework-14');

        await page.locator('#add-btn').click();

        const task = page.locator('.todo-item span').nth(1);
        await expect(task).toHaveText('Homework-14');

        const allTasks = page.locator('.todo-item ');
        await expect(allTasks).toHaveCount(1);

        await page.locator('.todo-item span').nth(1).click();

        await page.locator('#clear').click();

        await expect(page.locator('.todo-item')).toHaveText('No tasks found!');

        await page.waitForTimeout(3000);
    })

    /*Test Case 03 - Multiple Task Operations
    Navigate to https://techglobal-training.com/frontend/todo-list
    Enter and add 5 to-do items individually.
    Validate that all added items match the items displayed on the list.
    Mark all the tasks as completed by clicking on them.
    Click on the “Remove completed tasks!” button to clear them.
    Validate that the task list is empty, displaying the message “No tasks found!”.
     */

    test('Test Case 03 - Multiple Task Operations', async ({ page }) => {

        const allTasks = ["Homework01", "Homework02", "Homework03", "Homework04", "Homework05"];

        for (let i = 0; i < allTasks.length; i++) {

            const inputField = page.locator('#input-add');
            await inputField.fill(allTasks[i]);
            await page.locator('#add-btn').click();

        }

        let j = 1
        for (const task of allTasks) {

            await page.locator('.todo-item span').nth(j).click();
            j += 3;
        }

        await page.locator('#clear').click();

    })

    /*Test Case 04 - Search and Filter Functionality in todo App
    Navigate to https://techglobal-training.com/frontend/todo-list
    Enter and add 5 to-do items individually.
    Validate that all added items match the items displayed on the list.
    Enter the complete name of the previously added to-do item into the search bar.
    Validate that the list is now filtered to show only the item you searched for.
    Validate that the number of tasks visible in the list is exactly one
     */

    test('Test Case 04 - Search and Filter Functionality', async ({ page }) => {

        const allTasks = ["Homework01", "Homework02", "Homework03", "Homework04", "Homework05"];

        for (let i = 0; i < allTasks.length; i++) {

            const inputField = page.locator('#input-add');
            await inputField.fill(allTasks[i]);
            await page.locator('#add-btn').click();
        }
        const searchText = allTasks[allTasks.length - 1]
        await page.locator('#search').fill(searchText);

        const task = page.locator('.todo-item span').nth(1);
        await expect(task).toHaveText(searchText);

        const tasks = page.locator('.todo-item ');
        await expect(tasks).toHaveCount(1);

    })

    /*Test Case 05 - Task Validation and Error Handling
    Navigate to https://techglobal-training.com/frontend/todo-list
    Attempt to add an empty task to the to-do list.
    Validate that the task list is empty, displaying the message “No task found!”.
    Enter an item name exceeding 30 characters into the list.
    Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
    Add a valid item name to the list.
    Validate that the active task count is exactly one.
    Try to enter an item with the same name already present on the list.
    Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
     */

    test('Test Case 05 - Task Validation and Error Handling', async ({ page }) => {

        const inputField = page.locator('#input-add');
        await inputField.fill('');
        await page.locator('#add-btn').click();
        await expect(page.locator('.todo-item')).toHaveText('No tasks found!');

        await inputField.fill('This is a very long task more than 30 characters');
        await page.locator('#add-btn').click();
        await expect(page.locator('.notification.is-danger')).toHaveText('Error: Todo cannot be more than 30 characters!');

        await inputField.fill('Homework');
        await page.locator('#add-btn').click();
        await expect(page.locator('#panel')).toHaveCount(1);

        let item = 'Homework'
        await inputField.fill(item);
        await page.locator('#add-btn').click();
        await expect(page.locator('.notification.is-danger')).toHaveText(`Error: You already have ${item} in your todo list.`);




    })

})
