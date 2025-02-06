# Example GraphQL queries

``` graphql
query {
  loanOffers {
    id
    offer_name
    interest_rate
    is_active
    product {
      id
      name
    }
    created_by {
      id
      email
    }
  }
}

mutation {
  createLoanOffer(
    input: {
      interest_rate: 12.5
      tenure_months: 12
      processing_fee: 1000
      offer_name: "Special Diwali Offer"
      offer_details: "Some details"
      is_active: true
      productId: "UUID_of_product"
      createdById: "UUID_of_user"
    }
  ) {
    id
    offer_name
    is_active
  }
}
```
