import { ReactNode, useRef } from "react";
import { useDelayUnmount } from "./useDelayAmount";

export interface AnimateRenderProps {
  isMounted: boolean;
  enter: string;
  exit: string;
  duration: number;
  children: ReactNode;
  flexibleContainerX?: boolean
  flexibleContainerY?: boolean
}
const AnimateRender: React.FC<AnimateRenderProps> = ({
  isMounted,
  enter,
  exit,
  duration,
  children,
  flexibleContainerX = false,
  flexibleContainerY = false
}: AnimateRenderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldRenderChild = useDelayUnmount(isMounted, duration, containerRef, flexibleContainerX, flexibleContainerY);
  const mountedStyle = { animation: enter };
  const unmountedStyle = { animation: exit };

  return shouldRenderChild ? (
    <div ref={containerRef} className="animation-container">
      <div className="animation-content" style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>
    </div>
  ) : null;
};

export default AnimateRender