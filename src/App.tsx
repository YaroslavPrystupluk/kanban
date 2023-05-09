import { FC, KeyboardEvent, ChangeEvent, useState } from "react";
import { Spinner, Alert, ThemeProvider, Container } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { fetchIssues } from "./store/slice/getIssuesSlice";
import SearchIssues from "./components/SearchIssues/SearchIssues";
import TabletCards from "./components/TabletCartds/TabletCards";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { issues, loading, error } = useAppSelector((state) => state.issues);

  const [repositoryUrl, setRepositoryUrl] = useState("");
  const url = repositoryUrl.split("/");
  const owner = url[3];
  const repo = url[4];

  const handleKeyDoun = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") dispatch(fetchIssues([owner, repo]));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepositoryUrl(e.target.value);
  };

  const showIssues = () => {
    dispatch(fetchIssues([owner, repo]));
  };

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container>
        <SearchIssues
          handleKeyDoun={handleKeyDoun}
          showIssues={showIssues}
          handleChange={handleChange}
          repositoryUrl={repositoryUrl}
        />
        {issues.length > 0 && <Breadcrumbs owner={owner} repo={repo} />}

        {loading ? (
          <Spinner
            style={{ position: "absolute", top: "50%", right: "50%" }}
            animation="border"
            variant="primary"
          />
        ) : error ? (
          <Alert style={{ textAlign: "center" }} variant="danger">
            Error: {error}
          </Alert>
        ) : (
          <TabletCards />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;