import { Banners, Discovery } from "../components/Homepage";
import { Container } from "@material-ui/core";
import Write from "../components/cloudFirestore/Write";
import Read from "../components/cloudFirestore/Read";

export default function Home() {
  return (
    <>
      <Banners />
      <Container maxWidth="lg">
        <Write />
        <Read />
        <Discovery />
      </Container>
    </>
  );
}
