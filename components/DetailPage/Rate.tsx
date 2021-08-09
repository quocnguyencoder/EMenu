import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

export default function Rate() {
  const [value, setValue] = useState<number | null>(1);

  return <Rating name="read-only" value={value} readOnly precision={0.5} />;
}
