import React, {
  useState,
  useEffect,
  ReactNode,
  useRef,
  RefObject,
} from "react";
import AnimateRender from "./AnimateRender";
import AnimateRender2 from "./AnimateRender2";
import Example02 from "./examples/02";
import Example01 from "./examples/02";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div>
      {/* <Example01 /> */}
      <Example02 />
    </div>
  );
};

export default App;
