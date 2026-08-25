@debug
Feature: Amazon account login
  As an Amazon customer
  I want to start signing in to Amazon
  So that I can continue to my Amazon account

  @amazon @login @debug
  Scenario: Start Amazon login with a phone number and email
    Given I open the Amazon login page
    When I click on "Hello, sign in" button
    And I enter the phone number
    And I select the email "likhith.ponna94@gmail.com" in the text box under "Enter mobile number or email" section
    And I click on "continue"
    