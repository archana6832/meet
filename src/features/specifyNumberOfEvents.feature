Feature: Specify the number of events.

Scenario: When user hasn’t specified a number, 32 is the default number
Given the user is viewing the events on the main page
When  the user hasn't selected the number of events to be displayed
Then  the default number of events wil be displayed

Scenario: User can change the number of events they want to see
Given the user is viewing the events on the main page
When  the user has selected the number of events to be visible
Then  the number of events selected will be the amount displayed