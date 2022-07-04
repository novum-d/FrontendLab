import { useEffect } from "react";
import styled from "styled-components";
import { RepoMenuProps } from "../../exports";
import { useIterator } from "../../hooks";

const RepositoryName = styled.p`
  width: 300px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RepoMenu = ({
  repositories,
  selected,
  onSelect = () => undefined,
}: RepoMenuProps) => {
  const [{ name }, previous, next] = useIterator(
    repositories,
    selected
      ? repositories.findIndex((repo) => repo.name === selected)
      : undefined
  );
  console.log(`name: ${name}`);
  useEffect(() => {
    if (!name) return;
    onSelect(name);
  }, [name]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <button onClick={previous}>&lt;</button>
        <RepositoryName>{name}</RepositoryName>
        <button onClick={next}>&gt;</button>
      </div>
    </>
  );
};
export default RepoMenu;
