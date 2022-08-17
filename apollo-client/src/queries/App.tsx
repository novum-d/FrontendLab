import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://71z1g.sse.codesandbox.io/",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Dogs />
      </div>
    </ApolloProvider>
  );
};

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

type Dog = {
  id: string;
  breed: string;
};

const Dogs = ({ onDogSelected }: { onDogSelected?: () => void }) => {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog: Dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
};

export default App;
