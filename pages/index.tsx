import { Banners, Discovery } from "../components/Homepage";
import { Container } from "@material-ui/core";
import firebase from "../firebase/initFirebase";

firebase();
export default function Home() {
  return (
    <>
      <Banners />
      <Container maxWidth="lg">
        <Discovery />
      </Container>
    </>
  );
}
