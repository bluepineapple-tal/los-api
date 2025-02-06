# Example GraphQL queries

``` graphql
# Query all Loan Applications
query {
  loanApplications {
    id
    status
    application_date
    requested_amount
    manual_review_needed
  }
}

# Query a single Loan Application
query {
  loanApplication(id: "some-uuid") {
    id
    status
    # ...
  }
}

# Create a new Loan Application
mutation {
  createLoanApplication(
    input: {
      consumerId: "consumer-uuid"
      productId: "product-uuid"
      loanOfferId: "offer-uuid"
      requested_amount: 50000
      underwriterId: "some-underwriter-uuid"
    }
  ) {
    id
    status
    requested_amount
  }
}

# Update an existing Loan Application
mutation {
  updateLoanApplication(
    id: "some-uuid"
    input: {
      status: UNDER_REVIEW
      requested_amount: 60000
    }
  ) {
    id
    status
    requested_amount
  }
}

# Remove a Loan Application
mutation {
  removeLoanApplication(id: "some-uuid")
}
```
