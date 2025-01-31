# Contributing Guidelines

## Naming Convention

Always prefix both branch names and PR names with the JIRA issue key.

### Branches

- Branch name should match exxactly: `${Context}/${JIRA_ISSUE_KEY}`
  - Context examples
    - Added an env var - `env/los-234`
    - Worked on a feature - `feat/los-1234`
    - Fixed a bug - `fix/los-2345`
- Use lowercases only on branch names
- *Do not prefix/suffix the branch name with any other text content*

### Commit Messages

- Commit messages must adhere to the standards set by commitlint with default settings.
- Ensure that each commit message provides a clear and concise summary of the changes introduced by the commit.
- Commit message pattern: `type(scope?): subject`
- Real world examples:
  - `chore: run tests on travis ci`
  - `fix(server): send cors headers`
  - `feat(blog): add comment section`
- Use imperative mood in commit messages.
  - **Good**: "fix: typo in README.md"
  - **Bad**: "Fixed typo in README.md" or "Fixes typo in README.md"
- Separate the subject from the body with a blank line if additional explanation is needed.

### Pull Requests

- Add the title/summary to the PR name.
- Pull request names must follow the convention exactly *and including* the square brackets:
  - Defects: `[JIRA-ISSUEKEY] [SEVERITY] [SUMMARY]`
    - Example: `[MP2-1234] [P1] Fix GraphQL errors in GET_NEWS query`
  - Feature: `[JIRA-ISSUEKEY] [FEAT] [SUMMARY]`
    - Example: `[MP2-23] [FEAT] Adjust font size and style for headlines`

## Pull Request - Content, Review and Approval

- All **Pull Requests** must use the template
- Approvers
  - **Atharva Mahamuni** - Front-end, Sanity, Infrastructure, Environment, Monitoring (API, GROQ, Queries, Ads)
- One member from the Growth Stats team must be added as an approver on all Pull Requests
- Do not remove or edit sections from the template
- If a section or checklist item doesn't apply, use ~~strikethrough~~ to indicate it doesn't apply
  - Strikethroughs can be added by prefixing and suffixing `~~`

## JIRA Do's and Dont's

- Dont add estimates on child tickets, instead deduct the remaining estimate on the parent story
- If moving a ticket to **Blocked**, provide specific questions and reasons why it is blocked
  - Bad - **Blocked**, need detail on blah
  - Good - **Blocked**, need the authentication token and method to connect with API X on development
- If moving a ticket to **Developer QA** you must add a link to the staging site on JIRA and highlight the changes to be tested

## Developer QA Process

- See <Development+Process>

## Adding/Updating/Removing Environment Variables

- Make sure you understand where variable is required `Build`, `Runtime` or `Client Side`
- Check with **Atharva Mahamuni**, the variable may require addition to `Vercel`, `Sanity` and/or `GitHub`
- Update `.env-example` and add your variable with a 1 line comment describing its usage and purpose, for example:
  - `# DEPLOY_ENV` - One of `dev`, `staging` or `prod`, used by the app to infer the current deployment environment
