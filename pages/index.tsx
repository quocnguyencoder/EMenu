import Layout from "../components/Layout";
import Banners from "../components/Homepage";
import { Container } from "@material-ui/core";

export default function Home() {
  return (
    <Layout title="Homepage">
      <Container maxWidth="lg">
        <Banners />
        <h1>hello</h1>
      </Container>
    </Layout>
  );
}
