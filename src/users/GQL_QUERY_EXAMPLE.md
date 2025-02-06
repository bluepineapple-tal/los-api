# Example GraphQL queries

``` graphql
query {
  users {
    id
    email
    role
    status
  }
}

mutation {
  createUser(input: {
    email: "test@example.com"
    password: "test123"
    role: CONSUMER
    first_name: "John"
    last_name: "Doe"
  }) {
    id
    email
    role
  }
}
```
