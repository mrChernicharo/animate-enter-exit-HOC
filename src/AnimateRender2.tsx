import { ReactNode, useRef } from "react";
import { useDelayUnmount } from "./useDelayAmount";

export interface AnimateRenderProps {
  isMounted: boolean;
  enter: string;
  exit: string;
  duration: number;
  children: ReactNode;
  animateContainer?: boolean;
  animateContainerX?: boolean;
  animateContainerY?: boolean;
}
const AnimateRender: React.FC<AnimateRenderProps> = ({
  isMounted,
  enter,
  exit,
  duration,
  children,
  animateContainer = false, // both x and y
  animateContainerX = false,
  animateContainerY = false,
}: AnimateRenderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const animateX = animateContainer || animateContainerX;
  const animateY = animateContainer || animateContainerY;

  const shouldRenderChild = useDelayUnmount(
    isMounted,
    duration,
    containerRef,
    animateX,
    animateY
  );

  return shouldRenderChild ? (
    <div ref={containerRef} className="animation-container">
      <div
        className="animation-content"
        style={isMounted ? { animation: enter } : { animation: exit }}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default AnimateRender;
