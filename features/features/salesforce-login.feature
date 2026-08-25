@debug
Feature: Salesforce Trailhead login
  As a Trailhead learner
  I want to start signing in with my business email
  So that I can continue to my Salesforce account

  @salesforce @login @debug
  Scenario: Start Trailhead login with a business email
    Given I open the Trailhead login page
    When I click the "Login to Trailhead" button
    And I enter my business email
    And I click the "Next" button
    Then I should land on the Salesforce verification-code page and wait up to 20 seconds for the code to be entered manually
    And I automatically click the Submit code button identified by type "submit" after the code is entered
    