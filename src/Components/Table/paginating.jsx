import { Pagination } from "@mantine/core";
import React from "react";

const Paginating = ({ pages, activePage, totalCount, setPage }) => {
  return (
    <div>
      {pages > 1 && (
        <Pagination
          page={activePage}
          onChange={setPage}
          total={totalCount}
          withEdges
          position="center"
          style={{
            padding: "1rem",
          }}
          styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundColor: "#D74D48 !important",
              },
            },
          })}
        />
      )}
    </div>
  );
};

export default Paginating;
