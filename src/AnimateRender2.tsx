import { ReactNode, useRef } from "react";
import { useDelayUnmount } from "./useDelayAmount";

export interface AnimateRenderProps {
  isMounted: boolean;
  enter: string;
  exit: string;
  duration: number;
  children: ReactNode;
}
const AnimateRender2: React.FC<AnimateRenderProps> = ({
  isMounted,
  enter,
  exit,
  duration,
  children,
}: AnimateRenderProps) => {
  return null
  // const containerRef = useRef<HTMLDivElement>(null);

  // const shouldRenderChild = useDelayUnmount(isMounted, duration, containerRef);
  // const mountedStyle = { animation: enter };
  // const unmountedStyle = { animation: exit };

  // return shouldRenderChild ? (
  //   <div ref={containerRef} className="animation-container">
  //     <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>
  //   </div>
  // ) : null;
};

export default AnimateRender2