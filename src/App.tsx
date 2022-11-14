import React, { useState, useCallback } from "react";
import {
  TagInput,
  MultiselectCheckbox,
  Modal,
  Tabs,
  Collapse,
  Alert,
} from "./components";
import { useInterval, usePersistedState, useLocalStorage, useKeyPress, useHover, useAsync, useGetSet } from "./hooks";

const Timer = () => {
  const [seconds, setSeconds] = React.useState(0);
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

const MyComponent = ({ name }: { name: string }) => {
  const [val, setVal] = usePersistedState(name, 10);
  return (
    <>
      <label>
        value:
        <input
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
      </label>
    </>
  );
};

const MyApp = () => {
  const [name, setName] = React.useState("my-value");
  return (
    <div>
      <>
        <label>
          key
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
      </>
      <MyComponent name={name} />
    </div>
  );
};

const KeyPressDemo = () => {
  const wPressed = useKeyPress('w');

  return <p>The "w" key is {!wPressed ? 'not ' : ''}pressed!</p>;
};

const UseHoverDemo = () => {
  const [hoverRef, isHovering] = useHover();

  return <div ref={hoverRef}>{isHovering ? 'Hovering' : 'Not hovering'}</div>;
};

const UseAsyncDemo = () => {
  const imgFetch = useAsync(url =>
    fetch(url).then(response => response.json())
  );

  const handlerClickBtn = async () => {
    const res = await imgFetch.run('https://dog.ceo/api/breeds/image/random')
    console.log('handlerClickBtn: ', res);
    console.log('handlerClickBtn1: ', imgFetch.value);
  }

  return (
    <div>
      <button
        onClick={handlerClickBtn}
        disabled={imgFetch.isLoading}
      >
        Load image
      </button>
      <br />
      {imgFetch.isLoading && <div>Loading...</div>}
      {imgFetch.error && <div>Error {imgFetch.error}</div>}
      {imgFetch.value && (
        <img
          src={imgFetch.value.message}
          alt="avatar"
          width={400}
          height="auto"
        />
      )}
    </div>
  );
};

const UseGetSetDemo = () => {
  const [getCount, setCount] = useGetSet(0);
  const onClick = () => {
    console.log('click')
    setTimeout(() => {
      setCount(getCount() + 1);
    }, 1_000);
  };

  return <button onClick={onClick}>Count: {getCount()}</button>;
};
function App() {
  console.log('App: ', 'App');
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
      <MyApp />
      <KeyPressDemo />
      <UseHoverDemo />
      <UseAsyncDemo />
      <UseGetSetDemo />
    </div>
  );
}

export default App;
