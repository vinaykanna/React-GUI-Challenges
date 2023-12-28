import { useEffect, useRef } from "react";

function ResizeableColumns() {
  const isMouseDown = useRef(false);
  const leftCol = useRef<HTMLDivElement | null>(null);
  const rightCol = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = () => {
    isMouseDown.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isMouseDown.current) {
        isMouseDown.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current) return;

      const resizerWidth = 10;
      const resizerHalfWidth = resizerWidth / 2;
      const windowWidth = window.innerWidth;
      const screenLeft = e.screenX;

      if (screenLeft < resizerHalfWidth) return;

      if (screenLeft > windowWidth - resizerHalfWidth) return;

      const leftColWidth = (screenLeft / windowWidth) * 100;
      const rightColWidth = 100 - leftColWidth;

      leftCol!.current!.style.width = `calc(${leftColWidth}% - 5px)`;
      rightCol!.current!.style.width = `calc(${rightColWidth}% - 5px)`;
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="resizeable_container">
      <div className="resizeable_column_left" ref={leftCol}></div>
      <div onMouseDown={handleMouseDown} className="column_resizer"></div>
      <div className="resizeable_column_right" ref={rightCol}></div>
    </div>
  );
}

export default ResizeableColumns;
