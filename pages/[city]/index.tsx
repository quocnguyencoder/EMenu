import { useRouter } from "next/router";
import Link from "next/link";
import { Box } from "@material-ui/core";

export default function City() {
  const router = useRouter();
  console.log(router.query);

  return (
    <Box display="flex" flexDirection="column">
      {menu.map((m) => (
        <Link
          key={m.name}
          as={`/${router.query.city}/${m.name}`}
          href="/[city]/[place]"
        >
          <a>{m.name}</a>
        </Link>
      ))}
    </Box>
  );
}

const menu = [
  {
    category: "meatttttttttttttttttttttttttttttttttttttttttt",
    name: "beef",
    price: "7$",
  },
  { category: "meat", name: "steak", price: "8$" },
  { category: "meat", name: "goat", price: "9$" },
  { category: "fruit", name: "apple", price: "10$" },
  { category: "fruit", name: "weed", price: "11$" },
  { category: "cake", name: "pipe", price: "12$" },
];
