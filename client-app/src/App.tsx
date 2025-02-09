import './App.css'
import { useState } from 'react';
import RectangleObject from './UI/Rectangle';
import Position from './models/Position';
import Rectangle from './models/Rectangle';
import { Corners } from './models/Corners';

function App() {
  const [rect, setRect] = useState<Rectangle>({ width: 50, height: 100, x: 100, y: 100 });
  const [rectStartPos, setRectStartPos] = useState<Position | null>(null);
  const [resizingCorner, setResizingCorner] = useState<Corners | null>(null);

  const handleRectangleMove = (e: React.PointerEvent<SVGRectElement>, corner: Corners | null) => {
    setRectStartPos({ x: e.clientX, y: e.clientY });
    setResizingCorner(corner);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (rectStartPos === null) {
      return;
    }

    const dx = e.clientX - rectStartPos.x;
    const dy = e.clientY - rectStartPos.y;
    setRectStartPos({ x: e.clientX, y: e.clientY });

    setRect((prev: Rectangle) => {
      let x = prev.x;
      let y = prev.y;

      if (resizingCorner !== null) {
        let width = prev.width;
        let height = prev.height;

        if (resizingCorner === Corners.TopLeft) {
          width = Math.max(10, width - dx);
          height = Math.max(10, height - dy);
          x += dx;
          y += dy;
        }

        if (resizingCorner === Corners.TopRight) {
          width = Math.max(10, width + dx);
          height = Math.max(10, height - dy);
          y += dy;
        }

        if (resizingCorner === Corners.BottomLeft) {
          width = Math.max(10, width - dx);
          height = Math.max(10, height + dy);
          x += dx;
        }

        if (resizingCorner === Corners.BottomRight) {
          width = Math.max(10, width + dx);
          height = Math.max(10, height + dy);
        }

        return { x, y, width, height };
      }

      x += dx;
      y += dy;

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > 500 - prev.width) x = 500 - prev.width;
      if (y > 500 - prev.height) y = 500 - prev.height;

      return { ...prev, x, y, };
    });
  };

  const handlePointerUp = () => {
    setRectStartPos(null);
    setResizingCorner(null);
  };

  return (
    <div className="center-screen">
      <svg width={500} height={500} className="border" onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} >
        <text
          className={"prevent-select"}
          x={rect.x}
          y={rect.y - 5}
          fontSize={12}>
          width: {rect.width}, height: {rect.height}, pericular: {2 * (rect.height + rect.width)}
        </text>
        <RectangleObject
          width={rect.width}
          height={rect.height}
          x={rect.x}
          y={rect.y}
          handleRectangleMove={handleRectangleMove} />
      </svg>
    </div>
  )
}

export default App
