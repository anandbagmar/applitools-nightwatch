const {Eyes, Target, VisualLocatorSettings, RectangleSize} = require('@applitools/eyes-nightwatch');
module.exports = {
    'Test - Click on Map': async function (browser) {
        const eyes = new Eyes();

        // Set the Applitools API key
        eyes.setApiKey("<APPLITOOLS_API_KEY>");

        // Open Eyes for visual testing
        await eyes.open(browser, "schoolbuildings", "Click on Map");

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

        await eyes.check(`Map_217_beforeClick`, Target.region('.rpl-map'));

        const visualLocatorSettings_217 = {
            locatorNames: ["217"],
            firstOnly: false  // Optionally set to true to only return the first match
        };

        await eyes.locate(visualLocatorSettings_217)
            .then((locators_217) => {
                // Use locators to interact with the found visual elements
                console.log("Found locators: ", locators_217);
                console.log(`Number of locators found: ${locators_217["217"].length}`)

                const listViewLocator_217 = locators_217["217"][0];
                console.log(`listViewLocator_217: `, JSON.stringify(listViewLocator_217));

                console.log(`Location-x: ${listViewLocator_217.x}, Location-y: ${listViewLocator_217.y}`);
                console.log(`Size-width: ${listViewLocator_217.width}, Size-height: ${listViewLocator_217.height}`);
            })
            .catch((error) => {
                console.error("Error locating elements: ", error);
            });

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
