import React, { useState } from "react";
import T from "prop-types";
import { Box, Flex, Button } from "@chakra-ui/core";

/**
 * the renderer will be called to render the data
 * loadMore is a promise function that will return more data
 */

export const LoadMore = ({ loadMore, renderer, initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [more, setMore] = useState(null);

  return (
    <Box width="full">
      <Flex width="full" flexWrap="wrap" justifyContent="space-between">
        {initialData.map((el) => (
          <React.Fragment key={el.id || el.key}>{renderer(el)}</React.Fragment>
        ))}
        {more
          ? more.map((el) => (
              <React.Fragment key={el.id || el.key}>
                {renderer(el)}
              </React.Fragment>
            ))
          : null}
      </Flex>
      {more && <Box>More data</Box>}
      {loadMore && (
        <Flex marginY="10" direction="row" justifyContent="center">
          <Button
            isLoading={isLoading}
            loadingText="Loading more data"
            variantColor="green"
            onClick={async () => {
              console.log("we will load more data");
              setIsLoading(true);

              try {
                const data = await loadMore();
                if (more) {
                  setMore([...more, ...data]);
                } else {
                  setMore(data);
                }
              } catch (error) {
                console.log("loading more data failed");
              }
              setIsLoading(false);
            }}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Box>
  );
};

// LoadMore.propTypes = {
//   renderer: T.func,
//   loadMore: T.oneOfType([null, T.func]),
//   initialData: T.arrayOf(T.object),
// };

// LoadMore.defaultProps = {
//   loadMore: null,
// };
