import { Given, Then } from '@wdio/cucumber-framework';
import * as chai from 'chai';

Given(/^Open herokuapp and perform-DragAndDrop$/, async function () {
  /**1. Open Herokuapp web app */
  await browser.url("https://the-internet.herokuapp.com/drag_and_drop"); 
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 }); //15 secs for web element and 10sec for page load

  // Find the source and target elements
  let sourceElement = await $('#column-a');
  let targetElement = await $('#column-b');

  // Perform the drag-and-drop action
  await sourceElement.dragAndDrop(targetElement)
  await browser.pause(5000)

});