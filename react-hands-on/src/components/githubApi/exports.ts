type UserRepositoriesProps = {
  login: string;
  selectedRepo: string;
  onSelect: (name: string) => void;
};
type RepoMenuProps = {
  selected: string;
  repositories: { name: string }[];
  onSelect: (name: string) => void;
};

type LoginProps = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
};

type UserProps = LoginProps & {
  repositories: RepoProps;
};

type RepoProps = {
  totalCount: number;
  nodes: { name: string }[];
};

type ReadmeProps = {
  repo: string;
  login: string;
};

export type {
  LoginProps,
  UserProps,
  ReadmeProps,
  RepoMenuProps,
  UserRepositoriesProps,
};
