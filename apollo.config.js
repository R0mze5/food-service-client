module.exports = {
  client: {
    includes: ["./src/**/*.tsx", "./src/**/*.ts"],
    tagName: "gql",
    service: {
      name: "food-service",
      url: "http://localhost:4000/graphql",
    },
  },
};
