import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import Nav from "../components/Nav";
import QuestionCard from "../components/QuestionCard";

import { useDispatch, useSelector } from "react-redux";
import { searchQuestion } from "../app/actions/Question";
import {
  Error,
  Status,
  TotalPages,
  allSearchId,
  setSearchEmpty,
} from "../app/slice/Search";

const AllQuestions = () => {
  const observer = useRef();
  const dispatch = useDispatch();
  const searches = useSelector(allSearchId);
  const totalPages = useSelector(TotalPages);
  const status = useSelector(Status);
  const error = useSelector(Error);
  const [showSearch, setShowSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const lastItem = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    dispatch(setSearchEmpty());
  }, [dispatch, search]);

  useEffect(() => {
    if (search.length > 0) {
      setShowSearch(true);
    }
    if (search.length === 0) {
      setLoading(false);
    }
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (search.length > 0) {
      setLoading(true);
    }
    const delayDebounce = setTimeout(() => {
      if (search.length > 0) {
        dispatch(searchQuestion({ search, page }));
      }
    }, 1000);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [dispatch, search, page]);

  useEffect(() => {
    if (status === "success" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  return (
    <Box>
      <Nav
        search={search}
        setSearch={setSearch}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      <Box mt={"100px"} pb={"20px"}>
        {searches.length > 0 && (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            rowGap={"50px"}
            columnGap={"50px"}
            mb={"20px"}
          >
            {searches.map((each, index) => (
              <Box
                key={each}
                ref={index === searches.length - 1 ? lastItem : null}
              >
                <QuestionCard id={each} />
              </Box>
            ))}
          </SimpleGrid>
        )}
        {searches.length === 0 && !loading && !error && (
          <Text as={"p"}>No search result</Text>
        )}
        {loading && (
          <Text as={"p"} textAlign={"center"}>
            Searching...
          </Text>
        )}
        {status === "failed" && !loading && (
          <Text textAlign={"center"} as={"p"}>
            {error}
          </Text>
        )}
        {page === totalPages && searches.length > 0 && !loading && (
          <Text textAlign={"center"} as={"p"}>
            No more search result
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default AllQuestions;
