# Example GraphQL queries

``` graphql
mutation {
  createProduct(
    input: {
      name: "AC"
      description: "Split AC 1.5 ton"
      price: 35000
      status: ACTIVE
      vendorId: "vendor-uuid"
    }
  ) {
    id
    name
    status
  }
}

mutation {
  updateProduct(
    id: "some-uuid"
    input: {
      description: "Updated AC description"
      price: 37000
    }
  ) {
    id
    description
    price
  }
}

mutation {
  removeProduct(id: "some-uuid")
}
```
