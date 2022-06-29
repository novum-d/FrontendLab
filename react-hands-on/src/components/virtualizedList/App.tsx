import { faker } from "@faker-js/faker";
// import { List } from "../renderProps/App";
import { List } from "react-virtualized";

const bigList = [...Array(5000)].map(() => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

type RowProps<T> = {
  index: number;
  style: T;
};

const App = () => {
  const renderRow = <T,>({ index, style }: RowProps<T>) => (
    <div style={{ ...style, ...{ display: "flex" } }}>
      <img src={bigList[index].avatar} alt={bigList[index].name} width={50} />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  );

  return (
    <List
      height={window.innerHeight}
      width={window.innerWidth - 20}
      rowCount={bigList.length}
      estimatedRowSize={50}
      rowRenderer={() => renderRow()}
    ></List>
  );
};

export default App;
