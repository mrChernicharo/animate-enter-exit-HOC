import React, {
  useState,
  useEffect,
  ReactNode,
  useRef,
  RefObject,
} from "react";
import AnimateRender from "./AnimateRender";
import AnimateRender2 from "./AnimateRender2";
import "./styles.css";

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMounted2, setIsMounted2] = useState(false);
  const [isMounted3, setIsMounted3] = useState(false);

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
    setTimeout(() => setIsMounted2(!isMounted2), 1000);
    setTimeout(() => setIsMounted3(!isMounted3), 2000);
  };

  return (
    <main>
      <h1>Header</h1>
      <button onClick={handleToggleClicked}>Click me!</button>

      {/* <div style={{ display: "block", maxWidth: "90vw" }}> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <section style={{ flexShrink: 1, flexGrow: 0 }}>
          <h2>Text 01</h2>
          <div>Lorem ipsum dolor sit amet consectetur.</div>
        </section>

        <section style={{ flexShrink: 1, flexGrow: 0 }}>
          <h2>Text 02</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            tenetur, sit voluptates illo ullam itaque cum sed reiciendis.
          </div>
        </section>
        <AnimateRender
          isMounted={isMounted}
          enter="bounceIn 500ms ease-in 250ms both"
          exit="bounceOut 500ms ease-in 0ms both"
          duration={1000}
          flexibleContainerX
          flexibleContainerY
        >
          <h3>BOUNCE!!!</h3>
        </AnimateRender>

        <AnimateRender
          isMounted={isMounted2}
          enter="fadeIn 1000ms ease-in 0ms both"
          exit="fadeOut 1000ms ease-in 1000ms both"
          duration={2000}
          flexibleContainerY
        >
          <h3>SLIDE!!!</h3>
          <div style={{ display: "flex" }}>
            <AnimateRender
              isMounted={isMounted3}
              enter="slideIn 500ms ease-in 0ms both"
              exit="slideOut 500ms ease-in 0ms both"
              duration={1000}
              flexibleContainerX
            >
              <h3>INNER SLIDE!!!</h3>
            </AnimateRender>
            <AnimateRender
              isMounted={isMounted3}
              enter="slideIn 500ms ease-in 0ms both"
              exit="slideOut 500ms ease-in 0ms both"
              duration={1000}
              flexibleContainerX
            >
              <h3>INNER SLIDE!!!</h3>
            </AnimateRender>
          </div>
        </AnimateRender>

        <section style={{ flexShrink: 1, flexGrow: 0 }}>
          <h2>Text 03</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            tenetur, sit voluptates illo ullam.
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
