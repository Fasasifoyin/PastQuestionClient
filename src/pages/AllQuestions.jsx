import { Box } from "@chakra-ui/react";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";

const AllQuestions = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length > 0) {
      setShowSearch(true);
    }
  }, [search]);

  return (
    <Box>
      <Nav
        search={search}
        setSearch={setSearch}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <Box mt={"90px"}>Loading...</Box>
    </Box>
  );
};

export default AllQuestions;
