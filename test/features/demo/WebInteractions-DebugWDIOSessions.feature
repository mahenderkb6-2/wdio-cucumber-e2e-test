Feature: Inventory

    # valid price means (>0)
    #@demo
    Scenario Outline: Demo Inventory
        Given Login to inventory web app-DebugWDIOSessions
        Then Inventory page should list-DebugWDIOSessions <NoOfProducts>
        Examples:
            | TestID    | NoOfProducts |
            | INTV_TC01 | 6            |