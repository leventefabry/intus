import './Rectangle.css'
import { Corners } from "../models/Corners";

interface Props {
    width: number;
    height: number;
    x: number;
    y: number;
    handleRectangleMove(e: React.PointerEvent<SVGRectElement>, corner: Corners | null): void;
}

function RectangleObject(props: Props) {
    return (
        <>
            <rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fill="blue"
                className="drag-cursor rectangle"
                onPointerDown={(e) => props.handleRectangleMove(e, null)} />

            {(Object.keys(Corners) as Array<keyof typeof Corners>).map((corner) => {
                const size = 6;
                let cx = props.x - size / 2;
                let cy = props.y - size / 2;

                if (Corners[corner] === Corners.TopRight || Corners[corner] === Corners.BottomRight) {
                    cx = cx + props.width;
                }

                if (Corners[corner] === Corners.BottomLeft || Corners[corner] === Corners.BottomRight) {
                    cy = cy + props.height;
                }

                return (<rect
                    key={corner}
                    x={cx}
                    y={cy}
                    width={size}
                    height={size}
                    fill="transparent"
                    className="pointer-cursor corner"
                    onPointerDown={(e) => props.handleRectangleMove(e, Corners[corner])} />)
            })}
        </>
    )

}

export default RectangleObject;