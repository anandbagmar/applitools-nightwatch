const {Eyes, Target, VisualLocatorSettings, RectangleSize} = require('@applitools/eyes-nightwatch');
module.exports = {
    'Test - Search & click on Map': async function (browser) {
        const eyes = new Eyes();

        // Set the Applitools API key
        eyes.setApiKey("<APPLITOOLS_API_KEY>");

        // Open Eyes for visual testing
        await eyes.open(browser, "schoolbuildings", "Search and click on Map");

        // Check if Eyes is open before running the test
        if (!eyes.isOpen) {
            console.log("ERROR: Applitools Eyes is not open. Skipping visual validation.");
            return browser.end();
        }

        // Navigate to the website
        browser.url('https://www.schoolbuildings.vic.gov.au')
            .waitForElementVisible('body', 10000);

        // Add a 3-second delay before calling Eyes for visual validation
        browser.pause(3000);  // Pause for 3 seconds

        // Visual validation using Applitools
        await eyes.check("Home", Target.window().fully(true).lazyLoad(true));

        // Scroll to the Search section
        browser.execute(function () {
            const searchSection = document.querySelector('#tide-address-lookup');
            if (searchSection) {
                searchSection.scrollIntoView();
            }
        });

        console.log("Scroll to Search section");

        // Scroll to the Search section
        browser.execute(function () {
            const searchSection = document.querySelector('#tide-address-lookup');
            if (searchSection) {
                searchSection.scrollIntoView();
            }
        });

        console.log("Search for Docklands");
        // Search for "Docklands" by setting the value in the correct input
        browser.setValue('#tide-address-lookup', 'Docklands')
            .pause(500)
            .keys(browser.Keys.ENTER)
            .perform();  // Adding a slight delay to ensure the input value is set

        browser.pause(2000);

        // Wait for the menu to appear
        browser.waitForElementVisible('#tide-address-lookup__menu', 10000);

        browser.pause(4000);

        console.log("Select 1st search result");

        // Click on the first search option in the list
        browser.click('.rpl-search-bar__menu-option');

        browser.pause(4000);

        console.log("Visual validation for search result");

        await eyes.check("Search result - Docklands", Target.region('.rpl-u-margin-t-8').lazyLoad(true));

        // Scroll to the element with class "rpl-map" using JavaScript execution
        browser.execute(function () {
            const element = document.querySelector('.rpl-map');
            if (element) {
                element.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        });

        await eyes.check("Map", Target.region('.rpl-map'));

        console.log("Click on map");

        const visualLocatorSettings_3 = {
            locatorNames: ["3"],
            firstOnly: false  // Optionally set to true to only return the first match
        };

        await eyes.locate(visualLocatorSettings_3)
            .then((locators_3) => {
                // Use locators to interact with the found visual elements
                console.log("Found locators: ", locators_3);
                console.log(`number of locators: ${locators_3["3"].length}`)

                const listViewLocator_3 = locators_3["3"][0];
                console.log(`listViewLocator_3: `, JSON.stringify(listViewLocator_3));

                console.log(`Location-x: ${listViewLocator_3.x}, Location-y: ${listViewLocator_3.y}`);
                console.log(`Size-width: ${listViewLocator_3.width}, Size-height: ${listViewLocator_3.height}`);
                // Extract x, y coordinates and size
                const x = Math.round(listViewLocator_3.x + (listViewLocator_3.width / 2));
                const y = Math.round(listViewLocator_3.y - (listViewLocator_3.height / 2));
                console.log(`Computed-x: ${x}, Computed-y: ${y}`);

                // //// TODO - THIS PART IS NOT WORKING
                // browser
                //     .moveTo(listViewLocator_3.x, listViewLocator_3.y)  // Move to (centerX, centerY)
                //     .click()
                //     .perform();

                browser.moveToElement(null, x, y)  // Move to (centerX, centerY)
                    .click()  // Perform the click action
                    .pause(2000);  // Wait for 2 seconds

                browser.pause(4000);

                eyes.check(`Map_3`, Target.region('.rpl-map')).then(
                    () => {
                        console.log("Map_3 visual validation done");
                    }
                );
            })
            .catch((error) => {
                console.error("Error locating elements: ", error);
            });

        await eyes.check(`Final`, Target.window().fully(true).lazyLoad(true));

        console.log("Get visual results");

        // Ensure the Eyes session is properly closed before ending the browser session
        await eyes.close()
            .then(result => {
                console.log("Applitools Results: ", result);
            })
            .catch(err => {
                console.log("Error during Applitools validation: ", err);
            })
            .finally(() => {
                // Close the browser after Eyes session is finished
                browser.end();
            });
    }
};
