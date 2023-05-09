import { CSSProperties, HTMLAttributes, useEffect, useRef } from "react";

interface ScrollToBottomProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: React.ReactNode;
  style?: CSSProperties;
  height: number;
}

function ScrollToBottom(props: ScrollToBottomProps) {
  const { children, height, style, ...remaining } = props;
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const config = { childList: true, subtree: true };

    let elementScrollHeight = elementRef.current.scrollHeight;

    elementRef.current.scrollTo({
      top: elementScrollHeight,
      behavior: "smooth",
    });

    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) {
          elementScrollHeight = elementRef!.current!.scrollHeight;
          elementRef!.current!.scrollTo({
            top: elementScrollHeight,
            behavior: "smooth",
          });
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(elementRef.current, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        height,
        overflowY: "auto",
        ...style,
      }}
      ref={elementRef}
      {...remaining}
    >
      {children}
    </div>
  );
}

export default ScrollToBottom;
