import { Container, Flex, Table, Text } from "@mantine/core";
import { useState } from "react";
import { Eye, Trash } from "tabler-icons-react";
import DeleteModal from "../../../Components/DeleteModal";

import { useStyles } from "./styles";

export const AllUser = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>
        <Eye /> <Trash onClick={() => setOpened(true)} />
      </td>
    </tr>
  ));
  return (
    <Container className={classes.addUser} size="xl">
      <Text fz={"xl"} fw="bolder" align="center">
        All Users
      </Text>
      <Table striped withBorder className={classes.table}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <DeleteModal
        opened={opened}
        setOpened={setOpened}
        onCancel={() => setOpened(false)}
        onDelete={() => setOpened(false)}
        label="Are you Sure?"
        message="Do you really want to delete these records? This process cannot be undone."
      />
    </Container>
  );
};
