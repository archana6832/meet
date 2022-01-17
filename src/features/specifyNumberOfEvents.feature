Feature: Specify Number of Events

    Scenario: The default number of events is 32
    Given the user launches the app
    When the user has not specified a number of events
    Then the default number of events is 32

    Scenario: The user can change the number of events
    Given the user launches the app
    When the user specifies the number of events they want to see
    Then the app changes that number to the specified number by the user