import { faker } from "@faker-js/faker";
import { CSSProperties } from "react";
import { FixedSizeList } from "react-window";

const bigList = [...Array(5000)].map(() => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

type RowProps = {
  index: number;
  style: CSSProperties;
};

const App = () => {
  const renderRow = ({ index, style }: RowProps) => (
    <div style={{ ...style, ...{ display: "flex" } }}>
      <img src={bigList[index].avatar} alt={bigList[index].name} width={50} />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  );

  return (
    <FixedSizeList
      height={window.innerHeight}
      width={window.innerWidth - 20}
      itemCount={bigList.length}
      itemSize={50}
    >
      {renderRow}
    </FixedSizeList>
  );
};

export default App;
