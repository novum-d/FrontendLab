import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NetworkStatus,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import React, { ChangeEvent, useState } from "react";

/** Type */
type Dog = {
  id: string;
  breed: string;
};

type DogsProps = {
  onDogSelected?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

/** Client */
const client = new ApolloClient({
  uri: "https://71z1g.sse.codesandbox.io/",
  cache: new InMemoryCache(),
});

/** App */
const App = () => {
  const [selectedDog, setSelectedDog] = useState<string | null>(null);
  const onDogSelected = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelectedDog(e.target.value);
  return (
    <ApolloProvider client={client}>
      <div>
        <Dogs onDogSelected={onDogSelected} />
        <DogPhoto breed={selectedDog} />
        <DelayedQuery />
      </div>
    </ApolloProvider>
  );
};

/** Dogs */
const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }: DogsProps) => {
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

/** DogPhoto */
const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

const DogPhoto = ({ breed }: { breed: string | null }) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) return <div>Refetching!</div>;
  if (loading) return null;
  if (error) return <div>{`Error! ${error}`}</div>;

  return (
    <div>
      <div>
        <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      </div>
      {/** refetchに{breed: "pug"}のようなオブジェクトを渡すとpugの画像が再フェッチされる */}
      <button onClick={() => refetch()}>Refresh new breed!</button>
    </div>
  );
};

const DelayedQuery = () => {
  const [getDog, { loading, error, data }] = useLazyQuery(GET_DOG_PHOTO);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{`Error! ${error}`}</p>;

  return (
    <div>
      {data?.dog && <img src={data.dog.displayImage} />}
      <button onClick={() => getDog({ variables: { breed: "bulldog" } })}>
        Click me!
      </button>
    </div>
  );
};

export default App;
