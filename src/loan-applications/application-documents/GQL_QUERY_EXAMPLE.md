# Example GraphQL queries

``` graphql
# Query: Get all application documents
query {
  applicationDocuments {
    id
    doc_type
    file_path
    status
    uploaded_at
  }
}

# Mutation: Create a new application document
mutation {
  createApplicationDocument(
    input: {
      loanApplicationId: "loan-app-1",
      doc_type: KYC,
      file_path: "/uploads/new-document.pdf"
    }
  ) {
    id
    doc_type
    file_path
    status
  }
}

# Mutation: Update an application document
mutation {
  updateApplicationDocument(id: "doc-4", input: { status: VERIFIED }) {
    id
    status
  }
}
```
