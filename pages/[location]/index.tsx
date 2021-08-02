import { useRouter } from "next/router";

const Location = () => {
  const router = useRouter();
  return <div> {router.query.location} </div>;
};

export default Location;
