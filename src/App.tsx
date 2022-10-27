import React, { useState, useCallback } from "react";
import { TagInput, MultiselectCheckbox, Modal, Tabs } from "./components";

function App() {
  const [isModal, setModal] = useState(false)
  const openModal = useCallback(() => {
    setModal(!isModal)
  }, [isModal])

  const closeModal = useCallback(() => {
    setModal(false)
  }, [])
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
    </div>
  );
}

export default App;
