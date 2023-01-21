import React, {
  useState,
  useEffect,
  ReactNode,
  useRef,
  RefObject,
} from "react";
import "./styles.css";

function useDelayUnmount(
  isMounted: boolean,
  delayTime: number,
  ref: RefObject<HTMLDivElement>
) {
  const containerHeight = useRef(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (ref.current?.getBoundingClientRect) {
      containerHeight.current = ref.current?.getBoundingClientRect().height;
    }
  }, [ref, shouldRender]);

  useEffect(() => {
    let timeoutId: number;
    if (isMounted && !shouldRender) {
      console.log("animate enter!", containerHeight.current);

      setShouldRender(true);
      setTimeout(() => {
        console.log("entering!", containerHeight.current);
        ref.current?.animate(
          [{ height: 0 }, { height: `${containerHeight.current}px` }],
          { duration: delayTime * 0.5 }
        );
      }, 0);

      setTimeout(() => {
        console.log("will enter!", containerHeight.current);
      }, delayTime * 0.5);

      setTimeout(() => {
        console.log("entered!", containerHeight.current);
      }, delayTime);
    } else if (!isMounted && shouldRender) {
      console.log("animate removal!", containerHeight.current);

      setTimeout(() => {
        console.log("will remove!", containerHeight.current);
        ref.current?.animate(
          [{ height: `${containerHeight.current}px` }, { height: 0 }],
          { duration: delayTime * 0.5 }
        );
      }, delayTime * 0.5);

      timeoutId = setTimeout(() => {
        containerHeight.current = 0;
        setShouldRender(false);
        console.log("removed!", containerHeight.current);
      }, delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
}

interface AnimateRenderProps {
  isMounted: boolean;
  enter: string;
  exit: string;
  duration: number;
  children: ReactNode;
}
const AnimateRender: React.FC<AnimateRenderProps> = ({
  isMounted,
  enter,
  exit,
  duration,
  children,
}: AnimateRenderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldRenderChild = useDelayUnmount(isMounted, duration, containerRef);
  const mountedStyle = { animation: enter };
  const unmountedStyle = { animation: exit };

  if (!shouldRenderChild) return null;
  return (
    <div ref={containerRef} className="animation-container">
      <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(true);

  const handleToggleClicked = () => {
    setIsMounted(!isMounted);
  };

  return (
    <main>
      <h1>Header</h1>
      <button onClick={handleToggleClicked}>Click me!</button>

      <AnimateRender
        isMounted={isMounted}
        enter="slideIn 500ms ease-in 500ms both"
        exit="slideOut 500ms ease-in 0ms both"
        duration={1000}
      >
        <h1>SLIDE!!!</h1>
      </AnimateRender>

      <AnimateRender
        isMounted={isMounted}
        enter="bounceIn 250ms ease-in 250ms both"
        exit="bounceOut 250ms ease-in 0ms both"
        duration={500}
      >
        <h1>BOUNCE!!!</h1>
      </AnimateRender>

      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          tenetur, sit voluptates illo ullam itaque cum sed reiciendis libero
          dolorum soluta assumenda repellendus incidunt asperiores beatae
          delectus veritatis voluptatem quae.
        </p>
      </section>

      <AnimateRender
        isMounted={isMounted}
        enter="slideIn 1000ms ease-in 1000ms both"
        exit="slideOut 1000ms ease-in 0ms both"
        duration={2000}
      >
        <h1>HOLLA PAPITO!!!</h1>
      </AnimateRender>
    </main>
  );
};

export default App;
