import Layout from "../components/Layout";
import { Banners, Discovery } from "../components/Homepage";
import { Container } from "@material-ui/core";

export default function Home() {
  return (
    <Layout title="Homepage">
      <Container maxWidth="lg">
        <Banners />
        <Discovery />
      </Container>
    </Layout>
  );
}
