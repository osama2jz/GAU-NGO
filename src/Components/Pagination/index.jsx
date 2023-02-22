import {
    Container,
    Pagination as PaginationMan
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Pagination = ({ total = 10, activePage, setPage }) => {
  const matches = useMediaQuery("(min-width: 600px)");
  return (
    <Container style={{ display: "flex", justifyContent: "center" }} mt="md">
      <PaginationMan
        page={activePage}
        onChange={setPage}
        total={total}
        noWrap
        radius="xl"
        size={!matches ? "xs" : "lg"}
        styles={(theme) => ({
          item: {
            "&[data-active]": {
              backgroundColor: theme.colors.green,
            },
            border: "1px solid gray",
          },
        })}
      />
    </Container>
  );
};
export default Pagination;
