import { GraphQLClient } from "graphql-request";
import { token } from "../githubApi/hooks";

const query = `
query findRepos($login:String!) {
    user(login:$login) {
        login
        name
        location
        avatar_url: avatarUrl
        repositories(first:100) {
            totalCount
            nodes {
                name
            }
        }
    }
}
`;
const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { query, client };
