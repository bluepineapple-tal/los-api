# 📌 GraphQL Queries & Mutations

🔹 Query all Blacklist entries

```graphql
query {
  blacklists {
    id
    pan
    created_at
    updated_at
  }
}
```

---

🔹 Query one Blacklist entry

```graphql
query {
  blacklist(id: "some-uuid") {
    id
    pan
  }
}
```

---

🔹 Create a Blacklist entry

```graphql
mutation {
  createBlacklist(
    input: {
      pan: "ABCDE1234X"
      userId: "user-uuid" # optional
    }
  ) {
    id
    pan
  }
}
```

---

🔹 Update a Blacklist entry

```graphql
mutation {
  updateBlacklist(
    id: "some-uuid"
    input: {
      pan: "PQRSX9876Y"
    }
  ) {
    id
    pan
  }
}
```

---

🔹 Remove a Blacklist entry

```graphql
mutation {
  removeBlacklist(id: "some-uuid")
}
```
