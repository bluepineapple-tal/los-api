# 📌 GraphQL Queries & Mutations

🔹 Query all External Checks

```graphql
query {
  externalChecks {
    id
    check_type
    check_status
    requested_at
    responded_at
    response_data
  }
}
```

💡 Fetches all external checks in the system.

---

🔹 Query a single External Check by ID

```graphql
query {
  externalCheck(id: "some-uuid") {
    id
    check_type
    check_status
    requested_at
    responded_at
    response_data
  }
}
```

💡 Fetches a specific external check based on its ID.

---

🔹 Create a new External Check

```graphql
mutation {
  createExternalCheck(
    input: {
      loanApplicationId: "loan-app-uuid"
      check_type: CREDIT
    }
  ) {
    id
    check_type
    check_status
    requested_at
  }
}
```

💡 Creates a new external check for a loan application.

`check_type` can be CREDIT, KYC, or AML.

---

🔹 Update an External Check

```graphql
mutation {
  updateExternalCheck(
    id: "some-uuid"
    input: {
      check_status: SUCCESS
      response_data: "Credit check passed"
    }
  ) {
    id
    check_type
    check_status
    response_data
    responded_at
  }
}
```

💡 Updates the status of an external check (e.g., SUCCESS, FAILED) along with any response data.

---

🔹 Remove an External Check

```graphql
mutation {
  removeExternalCheck(id: "some-uuid")
}
```

💡 Deletes an external check record from the system.

⚠️ Use with caution—external checks should usually be immutable!
