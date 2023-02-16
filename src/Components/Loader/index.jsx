import {
  Container,
  Loader as LoaderMan,
  LoadingOverlay,
  useMantineTheme,
} from "@mantine/core";

const Loader = ({minHeight="84vh"}) => {
  const theme = useMantineTheme();
  return (
    <Container
      style={{
        backgroundColor: theme.colors.container,
        borderRadius: "15px",
        minHeight: minHeight,
        display:'flex',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
      }}
      size="xl"
    >
      <LoaderMan color={theme.colors.primary} size="xl" variant="dots" />
    </Container>
  );
};
export default Loader;
