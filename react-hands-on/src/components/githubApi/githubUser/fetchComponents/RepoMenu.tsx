import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useIterator } from "../../../../hooks";
import { ReadmeProps, RepoMenuProps } from "../../exports";

const RepositoryName = styled.p`
  width: 300px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RepoMenu = ({
  login,
  repositories,
  onSelect = () => undefined,
}: RepoMenuProps) => {
  const [{ name }, previous, next] = useIterator(repositories);
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
      <RepositoryReadme login={login} repo={name} />
    </>
  );
};

const RepositoryReadme = ({ repo, login }: ReadmeProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");
  const loadReadme = useCallback(async (login: string, repo: string) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then((res) => res.json());
    await fetch(download_url).then((res) =>
      res
        .text()
        .then(setMarkdown)
        .catch((e) => {
          setMarkdown("Readme not found.");
          setError(e);
        })
    );
    setLoading(false);
  }, []);
  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo);
  }, [repo]);
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <p>Loading...</p>;
  return <ReactMarkdown children={markdown} />;
};

export default RepoMenu;
