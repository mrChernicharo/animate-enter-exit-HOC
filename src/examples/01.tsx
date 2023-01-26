import { useState } from "react";
import AnimateRender from "../AnimateRender";
import "./01.css";

export default function Example01() {
  const [modalOpen, setModalOpen] = useState(false);

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
      <h1>Example 01</h1>
      <button onClick={handleToggleClicked}>Click me!</button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <AnimateRender
            isMounted={isMounted3}
            enter="slideIn 500ms ease-in 0ms both"
            exit="slideOut 500ms ease-in 0ms both"
            duration={1000}
            animateContainerY
          >
            <div style={{ minWidth: "200px" }}>
              <h3>INNER SLIDE!!!</h3>
            </div>
          </AnimateRender>
          <AnimateRender
            isMounted={isMounted3}
            enter="slideIn 500ms ease-in 0ms both"
            exit="slideOut 500ms ease-in 0ms both"
            duration={1000}
            animateContainerY
          >
            <div style={{ minWidth: "200px" }}>
              <h3>INNER SLIDE!!!</h3>
            </div>
          </AnimateRender>
        </div>
        <section style={{ flexShrink: 1, flexGrow: 0 }}>
          <h2>Text 01</h2>
          <div>Lorem ipsum dolor sit amet consectetur.</div>
        </section>

        <AnimateRender
          isMounted={isMounted}
          enter="bounceIn 500ms ease-in 250ms both"
          exit="bounceOut 500ms ease-in 0ms both"
          duration={1000}
          animateContainerX
          animateContainerY
        >
          <h3>BOUNCE!!!</h3>
        </AnimateRender>

        <section style={{ flexShrink: 1, flexGrow: 0 }}>
          <h2>Text 02</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            tenetur, sit voluptates illo ullam itaque cum sed reiciendis.
          </div>
        </section>

        <AnimateRender
          isMounted={isMounted2}
          enter="fadeIn 1000ms linear 1200ms both"
          exit="fadeOut 1000ms linear 1200ms both"
          duration={2000}
          animateContainerX
        >
          <h3>FADE!!!</h3>
          <p>
            Hello World! Hello World! Hello World! Hello World! Hello World!
            Hello World!
          </p>
        </AnimateRender>

        <section style={{ flexShrink: 1, flexGrow: 0 }}>
          <h2>Text 03</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            tenetur, sit voluptates illo ullam.
          </div>
        </section>

        <div style={{ display: "flex" }}>
          <AnimateRender
            isMounted={modalOpen}
            enter="nullIn 700ms linear 300ms both"
            exit="nullOut 700ms linear 300ms both"
            duration={1000}
            animateContainerX
          >
            <div className="modal" style={{ maxHeight: "132px" }}>
              <div>
                <button onClick={(e) => setModalOpen(false)}>X</button>
              </div>
              <h2>I'm a modal</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
                dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </AnimateRender>
          <div>
            <h2>Some content Here</h2>
          </div>
        </div>

        <button
          onClick={(e) => {
            setModalOpen(true);
          }}
        >
          Open Modal
        </button>
      </div>
    </main>
  );
}
