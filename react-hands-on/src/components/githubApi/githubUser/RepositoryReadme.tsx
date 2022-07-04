import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ReadmeProps } from "../exports";

const RepositoryReadme = ({ repo, login }: ReadmeProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");
  const loadReadme = useCallback(async (login: string, repo: string) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        setError(undefined);
        return res.json();
      })
      .catch(setError);
    await fetch(download_url).then((res) => res.text().then(setMarkdown));
    setLoading(false);
  }, []);
  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo);
  }, [repo]);
  if (error) return <pre>Markdown is not found.</pre>;
  if (loading) return <p>Loading...</p>;
  return <ReactMarkdown children={markdown} />;
};

export default RepositoryReadme;
