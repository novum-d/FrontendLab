import React from "react";

type DataProps = {
  name: string;
  elevation: number;
};

type ListProps<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  renderEmpty?: JSX.Element | null; // JSX.Element | null | undefined
};

const tahoe_peaks = [
  { name: "Freel Peak", elevation: 10891 },
  { name: "Monument Peak", elevation: 10067 },
  { name: "Pyramid Peak", elevation: 9983 },
  { name: "Mt. Tallac", elevation: 9735 },
];

const App = () => {
  return (
    <List
      data={tahoe_peaks}
      renderItem={(item: DataProps) => (
        <>
          {item.name} - {item.elevation.toLocaleString()}
        </>
      )}
      renderEmpty={<p>This list is empty</p>}
    />
  );
};

export const List = <T,>({
  data,
  renderItem,
  renderEmpty = null, // optional
}: ListProps<T>) => {
  return !data.length ? (
    renderEmpty
  ) : (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default App;
