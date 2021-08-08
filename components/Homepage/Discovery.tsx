import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import Newest from "./Newest";
import React, { useState } from "react";

const Discovery = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper style={{ marginTop: 10 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value="one" label="Mới nhất" />
          <Tab value="two" label="Gần tôi" />
          <Tab value="three" label="Đã lưu" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="one">
        <Newest />
      </TabPanel>
      <TabPanel value={value} index="two">
        Item 2
      </TabPanel>
      <TabPanel value={value} index="three">
        Item 3
      </TabPanel>
    </>
  );
};

export default Discovery;
