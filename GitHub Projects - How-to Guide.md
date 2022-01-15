# GitHub Projects: How-to Guide

## Tracking Code Progress
### General Guidelines for Pull Requests
**Steps to correctly using PRs:**
1. Create a new branch for each seperate ticket you decide to work on named `feature/title-associated-with-issue-being-addressed`
2. While working on code, I would suggest commiting changes to GitHub as a [draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests/), then converting to a normal [PR](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request) once code is ready for review. **This will allow GitHub Projects to track your progress in a [Kanban board](https://github.com/orgs/SOEN-341-Project/projects/1) as you work in your branch.**
3. Add required labels to link PR to GitHub Projects:
    - Assignees (assign yourself if it's your PR)
    - Linked issues (add associated ticket from Kanban board)
        > **Important:** without this label, the PR won't be linked to a ticket (issues in Kanban board).
    - Projects 
        > **Important:** without this label, the PR won't be linked to the project.
    - Labels:
        - Indicate if the PR is for *frontend* or *backend dev.* using the labels provided.
        - I added a `DO NOT MERGE` label we can use for PRs that are broken or no longer necessary (Be sure to close the issue if PR is no longer being used)
        - For more on labels, see [available labels](https://github.com/SOEN-341-Project/Online-Shopping-Website/labels).
    - Reviewers:
        - **Only add reviewers once PR has been converted from a draft PR to a normal PR and is ready for review** (this feature pings the reviewer whenever their name is added to a PR).
        > **SUGGESTION:** use [@SOEN-341-Project/team-soen-341](https://github.com/orgs/SOEN-341-Project/teams/team-soen-341) to invite entire group to review.
4. Be sure to be *descriptive and precise* when commenting on other people's PRs. Not only is it useful for the PR assignee, but it is also very good practice for documenting issues. 
5. **GitHub Projects has been *automated* for this project to automatically update the Kanban board:**
    - Creating a draft PR moves the associated ticket from `To do` to `In development`
    - Converting a PR from draft to a regular PR moves the associated ticket from `In development` to `In PR`
    - Once a PR is merged, the associated ticket is moved from `In PR` to `Done`


### Creating Issues (Tickets)
To create a new issue, go to issues tab on GitHub, then select `create new issue`. This will bring you to a page allowing you to select the issue template you would like (`bug` or `feature`).

> **Important Information:**
> Like PRs, issues with sub-tasks require the sub-tasks to be linked to issues using the `#my-issue-number` convention. Projects label is also required to be able to have the issue display on the Kanban board.
