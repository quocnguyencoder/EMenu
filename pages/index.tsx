import Layout from "../components/Layout";

import Banners from "../components/Homepage/Banners";
import { Container } from "@material-ui/core";

export default function Home() {
  return (
    <Layout title="Homepage">
      <Container maxWidth="lg">
        <Banners />
      </Container>
    </Layout>
  );
}
