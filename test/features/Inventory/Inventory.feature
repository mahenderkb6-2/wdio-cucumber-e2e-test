Feature: Inventory

    # valid price means (>0)
    #@demo @smoke @debug
    Scenario Outline: <TestID>: Demo Inventory
        # Given Login to inventory web app
        Given As a standard user I Login to inventory web app
            | UserType | Username                |
            | StdUser  | standard_user           |
            | probUser | problem_user            |
            | perfUser | performance_glitch_user |
        Then Inventory page should list <NoOfProducts>
        Then Validate all products have valid price in Inventory page
        Examples:
            | TestID    | NoOfProducts |
            | INTV_TC01 | 6            |