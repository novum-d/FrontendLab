type UserRepositoriesProps = {
  login: string;
  onSelect: (name: string) => void;
};
type RepoMenuProps = {
  login: string;
  repositories: { name: string }[];
  onSelect: (name: string) => void;
};

type LoginProps = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
};

type ReadmeProps = {
  repo: string;
  login: string;
};

export type { LoginProps, ReadmeProps, RepoMenuProps, UserRepositoriesProps };
