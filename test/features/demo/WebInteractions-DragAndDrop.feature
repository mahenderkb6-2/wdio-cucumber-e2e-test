Feature: Herokuapp
    #@demo
    Scenario Outline: Demo Herokuapp
        Given Open herokuapp and perform-DragAndDrop
        # Then Inventory page should list-DragAndDrop <NoOfProducts>
        Examples:
            | TestID    | NoOfProducts |
            | INTV_TC01 | 6            |