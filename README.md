# Applitools-nightwatch.js integration using Visual Locators

This repo showcases an integration of [Applitools](https://applitools.com) with [Nightwatch.js](https://nightwatchjs.org/) and uses Applitools [Visual Locators](https://applitools.com/tutorials/concepts/best-practices/visual-locators) (https://applitools.com/tutorials/concepts/best-practices/visual-locators)

## Setup
```shell
    npm install
```

## Running the tests

### Provide the APPLITOOLS_API_KEY

There are 2 examples in this repo.
1. [schoolbuildings_vic_gov_test.js](tests/schoolbuildings_vic_gov_test.js)
2. [schoolbuildings_vic_gov_visual_locator_test.js](tests/schoolbuildings_vic_gov_visual_locator_test.js)

Replace `<APPLITOOLS_API_KEY>` in `eyes.setApiKey("<APPLITOOLS_API_KEY>");` with the API key for your Applitools account:

ex: 

    `eyes.setApiKey("j1ZaKdSEFbhnOGn3x1WJaEU4jqAFcvnUsO105Z");`

### Run the test

The below command will run both the tests in this repo

```shell
    npm test
```
