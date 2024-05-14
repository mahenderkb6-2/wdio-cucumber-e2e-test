Feature: Inventory

    # valid price means (>0)
    @demo @smoke
    Scenario Outline: Demo Inventory
        Given Login to inventory web app
        Then Inventory page should list <NoOfProducts>
        Then Validate all products have valid price in Inventory page
        Examples:
            | TestID    | NoOfProducts |
            | INTV_TC01 | 6            |