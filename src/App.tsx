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
  const [containerHeight, setContainerHeight] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (ref.current?.getBoundingClientRect) {
      setContainerHeight(ref.current?.getBoundingClientRect().height);
    } else {
      setContainerHeight(0);
    }
  }, [ref, shouldRender]);

  // useEffect(() => {
  //   console.log(containerHeight);
  // }, [containerHeight]);

  useEffect(() => {
    let timeoutId: number;
    if (isMounted && !shouldRender) {
      console.log("animate enter!", containerHeight);
      setShouldRender(true);

      setTimeout(() => {
        console.log("will enter!", containerHeight);
      }, delayTime * 0.5);

      setTimeout(() => {
        console.log("entered!", containerHeight);
      }, delayTime);
    } else if (!isMounted && shouldRender) {
      console.log("animate removal!", containerHeight);

      setTimeout(() => {
        console.log("will remove!", containerHeight);
      }, delayTime * 0.5);

      timeoutId = setTimeout(() => {
        console.log("removed!", containerHeight);
        setShouldRender(false);
      }, delayTime); // subtract to prevent reflow
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
  // const [containerHeight, setContainerHeight] = useState(0);

  // useEffect(() => {
  //   if (containerRef.current?.getBoundingClientRect) {
  //     console.log("enter!", containerRef.current?.getBoundingClientRect());
  //     setContainerHeight(containerRef.current?.getBoundingClientRect().height);

  //     // containerRef.current.style.
  //   } else {
  //     console.log("removed!");
  //     setContainerHeight(0);
  //   }
  // }, [shouldRenderChild]);

  // useEffect(() => {
  //   if (containerHeight > 0) {
  //     containerRef.current?.animate(
  //       [{ position: "absolute" }, { position: "relative" }],
  //       { duration: 200 }
  //     );

  //     setTimeout(() => {
  //       containerRef.current?.animate(
  //         [{ height: 0 }, { height: `${containerHeight}px` }],
  //         { duration: 500, fill: "forwards" }
  //       );
  //     }, 60);
  //   }
  // }, [containerHeight]);

  if (!shouldRenderChild) return null;
  return (
    <div
      ref={containerRef}
      className="animation-container"
      // className={`animation-container ${isMounted ? "grow" : "shrink"}`}
    >
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
        enter="bounceIn 500ms ease-in 500ms both"
        exit="bounceOut 500ms ease-in 0ms both"
        duration={1000}
      >
        <h1>YO DUDE!!!</h1>
      </AnimateRender>
      <AnimateRender
        isMounted={isMounted}
        enter="slideIn 500ms ease-in 500ms both"
        exit="slideOut 500ms ease-in 0ms both"
        duration={1000}
      >
        <h1>YO DUDE!!!</h1>
      </AnimateRender>

      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          tenetur, sit voluptates illo ullam itaque cum sed reiciendis libero
          dolorum soluta assumenda repellendus incidunt asperiores beatae
          delectus veritatis voluptatem quae.
        </p>
      </section>
    </main>
  );
};

export default App;
