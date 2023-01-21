import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import "./styles.css";

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);
  const shouldRenderChild = useDelayUnmount(isMounted, 500);
  const mountedStyle = { animation: "inAnimation 500ms ease-in" };
  const unmountedStyle = { animation: "outAnimation 510ms ease-in" };

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
  };

  return (
    <main>
      <button onClick={handleToggleClicked}>Click me!</button>
      {shouldRenderChild && (
        <h1 style={isMounted ? mountedStyle : unmountedStyle}>YO DUDE!!!</h1>
      )}
    </main>
  );
};


export default App;