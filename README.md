# Project: 2DoBox

# Group Member Names:
Mike Duke
Steven Lawson

# Project Expectations: What does each group member hope to get out of this project?

Learn to refactor with the best of them, get used to working in an existing codebase

Both to get better at JavaScript, knowing how to grab and manipulate elements, knowing where we are in the DOM tree.

Steven posits pseudo-coding, and console.logging like our lives depend on it (which they do)


# Goals and expectations:

We feel this is a bit redundant.

# Team strengths:

Comic book references, as well as all things nerd (ie LOTR) as a lingua-franca.

# How to overcome obstacles:

Ask classmates and Mod 2 folk for help! (seriously, I hear this is the biggest difference between those who go on to next mod and those who don't)

TO DO: sign up for pairing after break when we complete this DTR

# Schedule Expectations (When are we available to work together and individually?):

Over break, we can meet, just not on Christmas weekend.
After school as late as we need to.

# Communication Expectations (How and often will we communicate? How do we keep lines of communication open?):

Use the Slack.

# Abilities Expectations (Technical strengths and areas for desired improvement):

JavaScriptJavaScriptJavaScript! Make it do the thing!

# Workload Expectations (What features do we each want to work on?):

As we believe we are at a similar skill level, right down the middle.

# Workflow Expectations (Git workflow/Tools/Code Review/Reviewing Pull Requests):

-Waffle IO: make sure EVERYTHING has an issue that is reflected in Waffle
-create new branches and create pull requests NEVER PUSH TO MASTER
TO DO : set up review before we can merge on github

# Expectations for giving and receiving feedback:

Direct and kind.

# Agenda to discuss project launch:

Beginning immediately.

# Ideas:

Probably should refactor some shit.

# Tools:

All the things.

Additional Notes:
Phase 1: Refactor
Your project should evolve, refactor, and clean up the code you inherit. This includes deleting redundant, broken, or obsolete code. However, you should not throw out the previous work wholesale.

Furthermore, there should be no reduction in functionality except when explicitly called for by new requirements.

There are no new features in this phase, however it is a good idea to generalize your application. For example, if there is an HTML element with the class of idea-save-button, then it should be updated to save-btn, which is less coupled to content and tied more to functionality.

Note: While refactoring, if there is functionality missing from the base IdeaBox project, you will need to implement that functionality as well in this refactor phase.

Refactoring Guidelines
Here are some refactoring points we want to see in your project:

Small JavaScript functions focused on single responsibility (SRP) - for example, one function should not handle both disabled button state and rendering elements to the DOM
Consistent formatting, indentation, and naming schemes
Smart, concise comments (only when absolutely needed for clarity)
Little to no duplication in JavaScript (DRY principle)
Avoid deep nesting (for if/else conditionals)
Line lengths (keep them short and readable to avoid horizontal scrolling in your text editor)
File and folder organization (images, CSS directories)
Specifically, we’re going to set some constraints:

You cannot use any nested if/else statements
When you can, you should not use anonymous functions (mainly looking at event event listeners for this)
For example, if you find an anonymous function in an event listener, pull it out of the event listener and use a function reference as the callback function
HTML must follow basic accessibility guidelines (semantic tagging, image attributes, roles)
No use of global variables (we’re not saying you should never use global variables in life, but for this project it will be an exercise in not using global variables)
Functions cannot be longer than 8 lines (including event listeners)
When you “refactor,” you make changes to the code without changing any of its functionality. You can think of it like a “clean up,” for the sake of improving readability and quality.

This doesn’t include bug fixes or the addition of any new 2DoBox functionality. You might refactor code that you have written the day before, while it’s still fresh in your head, so that it is more readable and reusable when you may potentially look at it two months from now. As the motto says: “refactor early, refactor often.”

Phase 2: Pivot
This is the existing IdeaBox functionality that should be pivoted for the 2DoBox user interface:

Adding a new TODO
On the application’s main page, a user should:

See two text boxes for entering the Title and Task for a new TODO, and a Save button for committing that TODO.

When a user clicks Save:
A new TODO with the provided title and body should appear in the TODO list.
The text fields should be cleared and ready to accept a new TODO.
The page should not reload.
The TODO should be persisted (in localStorage) - it should still be present upon reloading the page.
The Save button should be disabled when there is not valid content in both input fields.
Deleting an existing TODO
When viewing the TODO list:

Each TODO in the list should have a link or button to Delete (or 𝗫).
Upon clicking Delete, the appropriate TODO should be removed from the list.
The page should not reload when an idea is deleted.
The TODO should be removed from localStorage - it should not re-appear on next page load.
Editing an existing TODO
When a user clicks the title or task of a TODO in the list, that text should:

Become an editable text field, pre-populated with the existing TODO title or task.
The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
If the user reloads the page, their edits will be reflected.
Filtering
We’d like our users to be able to easily find specific TODOs they’ve already created, so let’s provide them with a filtering interface on the TODO list.

At the top of the TODO list, include a text field labeled Filter.
As a user types in the filter box, the list of TODOs should filter in real time to only display TODOs whose title or task include the user’s text.
The page should not reload.
Clearing the filter box should restore all the ideas to the list.
Phase 3: Add New Features
Marking a TODO as completed
When viewing the TODO list:

Each TODO in the list should have a button called Completed Task.
When a the user clicks the Completed Task button, the idea should be either grayed out and/or shown with a strike through text.
On reloading the page the page, the completed TODOs should be exempted (but not deleted) from the list.
When the user clicks the show completed TODOs, the completed TODOs should be loaded back onto the top of the TODO list.
Importance
Each TODO should be given a level of importance.

As a user, I should be able to change the level of importance by up-voting or down-voting that specific TODO.
Each TODO should start with a level of Normal.
Levels of importance are as follows:

1) Critical

2) High

3) Normal

4) Low

5) None

The change of importance should persist after a page refresh.
Recent TODOs
The application should only show the ten most recent TODOS.

The application should contain a button labeled Show more TODOs ....
When a user clicks on the Show more TODOs... button, this list should load additional messages from the past.
Filter by Importance
The application should allow users to filter the TODO list based on level of importance.

Your application should have 5 buttons corresponding to each level of importance (Critical, High, Normal, Low, and None).
When one of the filter buttons is clicked, the TODO list should only display TODOs with the selected importance.
Extensions
Character Counter
The application is able to count the number of characters inside of the input field in real time.

As the user types, the character count should increment up.
If the user deletes characters, then the character count should decrease.
Submit button disabled based on character count
The submit button should be disabled when there is not valid content in both input fields and if the input field character count exceeds 120 characters.

TODO Due Dates
When viewing the TODO list:

Each TODO should have an option to set a due date for the specific TODO.
Once a TODO’s due date is reached, the TODO should show a visual indication that it is past due if it has not been completed.
Note: TimeZones are hard - consider using a library like MomentJS

# Eval Notes
## Overall
would like to see css and UI a little tighter, but clear we put a lot of thought and time into the JS
More progress in general, think about big picture and not just tunnel vision on the JS; where we focused energy and time GOOD JOB!
## UI
  -no real need for overflow scroll for cards...let the window do it
  -cards visable behind filter bar
  -fix these squirrely things in the UI
## HTML
  -put a class on the span tag so it's more explicit
## css
  -margin:auto on universal selector: bandaids over whole body
  -text align:center is hacky
    -better to use flexbox or setting a % of a container with margin:saveButton
  -never use inline, use inline-block
  -up-vote: good place to refactor some CSS
    -shared class for upvote/down, then a more specific class for differences
  -no camelCase in CSS!
  -watch for opening and closing curlies on media query, and indentation inside of it
## JS

## Git/github
