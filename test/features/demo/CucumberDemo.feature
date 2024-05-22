#@demo
# The 'Feature' section describes the overall purpose of the feature.
Feature: Cucumber Demo
    I can have more info about the feature..
    I can have more info about the feature..
    I can have more info about the feature..
    I can have more info about the feature..
    - Questions/Clarifications
    - Known issues
    - Todo

    Background: Background name
        Given Google page is opened

    #@demo
    Scenario: Scenario name
        # In When step, though we did not provided table for WDIO, it'll search WDIO bcoz in step definition we provided /^Search with (.*)$/, async function (searchItem)
        When Search with WDIO
        Then Click on first search result
        Then URL should match https://webdriver.io/

    Scenario: Scenario name
        When Search with webdriverio
        Then Click on first search result
        Then URL should match https://webdriver.io/




# The 'Feature' section describes the overall purpose of the feature.
# Feature: User Registration

#     As a new user,
#     I want to register on the website,
#     So that I can access the member-only sections.
#     # The 'Background' (Optional) section contains common steps to all scenarios, such as navigating to a page.
#     Background:
#         Given I navigate to the registration page

#     # The 'Scenario' section outlines a specific test case with a specific set of steps.
#     # A basic scenario with specific steps
#     Scenario: Register with valid information
#         When I fill in the registration form with the following data:
#             | field      | value                |
#             | first_name | John                 |
#             | last_name  | Doe                  |
#             | email      | john.doe@example.com |
#             | password   | Secure123!           |
#         And I submit the registration form
#         Then I should see a confirmation message saying "Registration successful!"

#     #The 'Scenario Outline' allows for parameterized tests, where you can define multiple scenarios using a template and then provide examples in a table.
#     # A scenario outline with examples
#     Scenario Outline: Register with invalid email
#         When I fill in the registration form with the following data:
#             | field      | value        |
#             | first_name | <first_name> |
#             | last_name  | <last_name>  |
#             | email      | <email>      |
#             | password   | Secure123!   |
#         And I submit the registration form
#         Then I should see an error message saying "<expected_error>"
#         # Examples for the scenario outline
#         Examples:
#             | first_name | last_name | email             | expected_error          |
#             | Alice      | Smith     | alice.example.com | "Invalid email address" |
#             | Bob        | Johnson   | bob@.com          | "Invalid email address" |
#             | Carol      | Davis     | carol@domain      | "Invalid email address" |









