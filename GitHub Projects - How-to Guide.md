# GitHub Projects: How-to Guide

## Tracking Code Progress
### General Guidelines for Pull Requests
**Steps to correctly using PRs:**
1. Create a new branch for each seperate ticket you decide to work on.
2. While working on code, I would suggest commiting changes to GitHub as a draft PR, then converting to a normal PR once code is ready for review. **This will allow GitHub Projects to track your progress in a Kanban board as you work in your branch.**
3. Add required labels to link PR to GitHub Projects:
    - Assignees (assign yourself if it's your PR)
    - Linked issues (add associated ticket from Kanban board)
    - Project 
        - **IMPORTANT: without this label the PR won't be linked to the project.**
    - Labels:
        - Indicate if the PR is for *frontend* or *backend dev.* using the labels provided.
        - I added a `DO NOT MERGE` label we can use for PRs that are broken or no longer necessary (Be sure to close the issue if PR is no longer being used)
    - Reviewers:
        - **Only add reviewers once PR has been converted from a draft PR to a normal PR and is ready for review** (this feature pings the reviewer whenever their name is added to a PR).
        - **SUGGESTION:** use @team-soen-341 to invite entire group to review.
