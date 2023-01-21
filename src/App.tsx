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
  const [isMounted, setIsMounted] = useState(true);
  const [isMounted2, setIsMounted2] = useState(true);

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
    setTimeout(() => setIsMounted2(!isMounted2), 1000);
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
        {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}> */}

    

        {/* <AnimateRender
          isMounted={isMounted}
          enter="slideIn 1000ms ease-in 1000ms both"
          exit="slideOut 1000ms ease-in 0ms both"
          duration={2000}
          flexibleContainerX
        >
          <h3>HOLLA PAPITO!!!</h3>
        </AnimateRender> */}

        {/* <AnimateRender
          isMounted={isMounted}
          enter="slideIn 750ms ease-out 750ms both"
          exit="slideOut 750ms ease-out 0ms both"
          flexibleContainerY
          duration={1000}
        >
          <div style={{ flexShrink: 0, flexGrow: 1 }}>
            <h3>SLIDE!!!</h3>
          </div>
        </AnimateRender> */}

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
          enter="slideIn 500ms ease-in 500ms both"
          exit="slideOut 500ms ease-in 0ms both"
          duration={1000}
          flexibleContainerY
        >
            <h3>SLIDE!!!</h3>
        </AnimateRender> 
        {/* <AnimateRender
          isMounted={isMounted}
          enter="slideIn 500ms ease-in 500ms both"
          exit="slideOut 500ms ease-in 0ms both"
          duration={1000}
        >
            <h3>FIXO!!!</h3>
        </AnimateRender> */}

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
      </div>
    </main>
  );
};

export default App;
