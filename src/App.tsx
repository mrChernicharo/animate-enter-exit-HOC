import React, {
  useState,
  useEffect,
  ReactNode,
  useRef,
  RefObject,
} from "react";
import "./styles.css";
import { useDelayUnmount } from "./useDelayUnmount";

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
  const elRef = useRef<HTMLDivElement>(null);

  const shouldRenderChild = useDelayUnmount(isMounted, duration, containerRef);

  const enterKeyframes = [
    {
      opacity: 0,
      transform: `translateX(-200px)`,
    },
    {
      opacity: 1,
      transform: `translateX(0)`,
    },
  ];
  const enterAnimationOptions: KeyframeAnimationOptions = {
    duration: duration * 0.5,
    delay: duration * 0.5,
    fill: "both",
  };
  const exitKeyframes = [
    {
      opacity: 1,
      transform: `translateX(0)`,
    },
    {
      opacity: 0,
      transform: `translateX(-200px)`,
    },
  ];
  const exitAnimationOptions: KeyframeAnimationOptions = {
    duration: duration * 0.5,
    delay: 0,
    fill: "both",
  };

  const enterAnimation: [Keyframe[], KeyframeAnimationOptions] = [
    enterKeyframes,
    enterAnimationOptions,
  ];
  const exitAnimation: [Keyframe[], KeyframeAnimationOptions] = [
    exitKeyframes,
    exitAnimationOptions,
  ];

  useEffect(() => {
    isMounted
      ? elRef.current?.animate(...enterAnimation)
      : elRef.current?.animate(...exitAnimation);
  }, [isMounted]);

  if (!shouldRenderChild) return null;
  return (
    <div ref={containerRef} className="animation-container">
      <div ref={elRef}>{children}</div>
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
