Example GraphQL Queries and Mutations for Logos:

Query for displaying all properties of every logo in database:
{
  logos {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
  }
}

Query for displaying all properties of a logo with a specifc id (5e92458eefeb265ffc2de11d):
query {
  logo(id: "5e92458eefeb265ffc2de11d") {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
  }
}

Mutation for adding a new logo to the database and displaying it's properties: 
mutation {
  addLogo(text: "Added from GraphiQL", color: "#a00000", fontSize: 50, backgroundColor: "#b00000", borderColor: "#c00000", borderRadius: 10, borderWidth: 10, padding: 20, margin: 20) {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
  }
}

Mutation for updating the properties of a logo in the database and displaying the updated properties:
mutation {
  updateLogo(id: "5e9502b3a7208f2980e7d5a2", text: "Updated from GraphiQL", color: "#d00000", fontSize: 55, backgroundColor: "#e00000", borderColor: "#f00000", borderRadius: 15, borderWidth: 12, padding: 24, margin: 10) {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
  }
}

Mutation for removing a logo from the database with a specific id (5e9502b3a7208f2980e7d5a2):
mutation {
  removeLogo(id: "5e9502b3a7208f2980e7d5a2") {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
  }
}

