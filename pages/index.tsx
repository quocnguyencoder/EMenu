import Layout from "../components/Layout";
import { Banners, Discovery } from "../components/Homepage";
import { Container } from "@material-ui/core";

export default function Home() {
  return (
    <Layout>
      <Banners />
      <Container maxWidth="lg">
        <Discovery />
      </Container>
    </Layout>
  );
}
