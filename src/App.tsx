import React, { useState, useCallback } from "react";
import {
  TagInput,
  MultiselectCheckbox,
  Modal,
  Tabs,
  Collapse,
  Alert
} from "./components";
import { useInterval } from "./hooks";


const Timer = () => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

function App() {
  const [isModal, setModal] = useState(false);
  const openModal = useCallback(() => {
    setModal(!isModal);
  }, [isModal]);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  return (
    <div className="App">
      <TagInput tags={["Nodejs", "MongoDB"]} />
      <MultiselectCheckbox
        options={[{ label: "Item One" }, { label: "Item Two" }]}
        onChange={(data) => {
          console.log(data);
        }}
      />
      <button onClick={openModal}>open modal</button>
      <Modal
        isVisible={isModal}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button onClick={closeModal}>Cancel</button>}
        onClose={closeModal}
      />
      <Tabs defaultIndex="1" onChange={console.log}>
        <Tabs.TabItem label="A" index="1">
          Lorem ipsum
        </Tabs.TabItem>
        <Tabs.TabItem label="B" index="2">
          Dolor sit amet
        </Tabs.TabItem>
      </Tabs>
      {/* <Timer /> */}

      <Collapse defaultActiveKey={["1"]} onChange={console.log}>
        <Collapse.Panel header="This is panel header 1" index="1">
          <p>1</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 2" index="2">
          <p>2</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" index="3">
          <p>3</p>
        </Collapse.Panel>
      </Collapse>
      <Alert message="Success Text" type="info" />
    </div>
  );
}

export default App;
