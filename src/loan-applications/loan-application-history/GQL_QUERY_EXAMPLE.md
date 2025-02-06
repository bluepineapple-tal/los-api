# Example GraphQL queries

``` graphql
# Query: Get all loan application history
query {
  loanApplicationHistories {
    id
    old_status
    new_status
    change_note
    changed_at
  }
}

# Mutation: Create a new loan application history entry
mutation {
  createLoanApplicationHistory(
    input: {
      loanApplicationId: "loan-app-1",
      old_status: PENDING,
      new_status: UNDER_REVIEW,
      change_note: "Initial review started",
      changed_by: "admin-1"
    }
  ) {
    id
    old_status
    new_status
    change_note
  }
}
```
