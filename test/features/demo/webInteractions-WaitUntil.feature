Feature: Demo Feature

    # Feature Description
    #@demo
    Scenario Outline: Run first demo feature
        Given Google page is opened-WaitUntil
        When Search with-WaitUntil <SearchItem>
        Then Click on first search result-WaitUntil
        Then URL should match-WaitUntil <ExpectedURL>

        Examples:
            | TestID     | SearchItem | ExpectedURL           |
            | Demo_TC013 | WDIO       | https://webdriver.io/ |