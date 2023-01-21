import React, { useState, useEffect, ReactNode } from "react";
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

// prettier-ignore
interface AnimateRenderProps { isMounted: boolean; enter:string; exit: string; children: ReactNode }
const AnimateRender: React.FC<AnimateRenderProps> = ({
  isMounted,
  children,
  enter,
  exit,
}: AnimateRenderProps) => {
  const shouldRenderChild = useDelayUnmount(isMounted, 500);
  const mountedStyle = { animation: enter };
  const unmountedStyle = { animation: exit };

  if (!shouldRenderChild) return null;
  return (
    <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>
  );
};

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);
  const [isMounted2, setIsMounted2] = useState(true);
  const [isMounted3, setIsMounted3] = useState(true);

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
    setTimeout(() => setIsMounted2(!isMounted2), 1000);
    setTimeout(() => setIsMounted3(!isMounted3), 2000);
  };

  return (
    <main>
      <button onClick={handleToggleClicked}>Click me!</button>

      <AnimateRender
        isMounted={isMounted}
        enter="bounceIn 500ms ease-in"
        exit="bounceOut 600ms ease-in"
      >
        <h1>YO DUDE!!!</h1>
      </AnimateRender>

      <AnimateRender
        isMounted={isMounted2}
        enter="fadeIn 500ms ease-in"
        exit="fadeOut 600ms ease-in"
      >
        <h1>Hey buddy!!!</h1>
      </AnimateRender>

      <AnimateRender
        isMounted={isMounted3}
        enter="slideIn 500ms ease-in"
        exit="slideOut 600ms ease-in"
      >
        <h1>Holla papi!!!</h1>
      </AnimateRender>
    </main>
  );
};

export default App;
