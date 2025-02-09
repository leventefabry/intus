import './App.css'
import { useEffect, useState } from 'react';
import RectangleObject from './UI/Rectangle';
import Position from './models/Position';
import Rectangle from './models/Rectangle';
import { Corners } from './models/Corners';
import { fetchRectangle, saveRectangle } from './api/RectangleClient';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [savingMessage, setSavingMessage] = useState<string | null>(null);
  const [rect, setRect] = useState<Rectangle>({ width: 50, height: 100, x: 100, y: 100 });
  const [rectStartPos, setRectStartPos] = useState<Position | null>(null);
  const [resizingCorner, setResizingCorner] = useState<Corners | null>(null);

  useEffect(() => {
    const getRectangle = async () => {
      try {
        const response = await fetchRectangle();
        setRect(response);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
        setSavingMessage("The rectangle is loaded")
      }
    };

    getRectangle();
  }, []);

  const handleRectangleMove = (e: React.PointerEvent<SVGRectElement>, corner: Corners | null) => {
    if (saving) {
      return;
    }

    setRectStartPos({ x: e.clientX, y: e.clientY });
    setResizingCorner(corner);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (rectStartPos === null || saving) {
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
    if (rectStartPos !== null) {
      setSaving(true);
      setSavingMessage("Saving is in progress...");
      saveRectangle(rect)
        .then(() => {
          setSavingMessage("The rectangle is saved");
          setSaving(false);
        })
        .catch((err: any) => {
          setSavingMessage(`Error: ${err.response?.data?.title} ${err.response?.data?.detail}`);
          setSaving(false);
        })
    }

    setRectStartPos(null);
    setResizingCorner(null);
  };

  return (
    <div className="center-screen">
      <div className="instructions">
        <h1>Rectangle Resizer</h1>
        <h3>Instructions</h3>
        <p>Move or resize the rectangle below.</p>
        <p>The width can't exceed the height. In this case, the rectangle won't be saved.</p>
      </div>

      {loading ?
        <p>...loading</p> : (
          <>
            {savingMessage && <div className="saving-message">{savingMessage}</div>}
            <div className="svg-container">
              <svg width={500} height={500} className="border" onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} >
                <text
                  className={"prevent-select"}
                  x={rect.x}
                  y={rect.y - 5}
                  fontSize={12}>
                  width: {rect.width}, height: {rect.height}, perimeter: {2 * (rect.height + rect.width)}
                </text>
                <RectangleObject
                  width={rect.width}
                  height={rect.height}
                  x={rect.x}
                  y={rect.y}
                  saving={saving}
                  handleRectangleMove={handleRectangleMove} />
              </svg>
            </div>
          </>
        )}
    </div>
  )
}

export default App;
