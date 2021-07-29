import { observer } from "mobx-react";
import React from "react";
import { SetCardModel } from "../Models/SetCardModel";

let patternCount = 0

@observer
export default class Card extends React.Component<{context:SetCardModel}>{
    render(){
        const card = this.props.context;

        const renderCard = () => {
            switch (card.shape) {
                case "triangle" : 
                    return renderCardHelperTriangle();

                case "circle" : 
                    return renderCardHelperCircle();
                case "square" :
                    return renderCardHelperSquare();          
            }
            return <div>{renderCard()}</div>
            
        }     
      
        let w = 100;
        let h = 100;   
        let s = w/4; 
        const getShapeStartPoints = (
                pointXFormula: () => number,
                pointYFormula: () => number) => {
            const points: {x: number, y: number}[] = []
            let xStart = pointXFormula();
            for (let c = 0; c < card.count; c++) {
                let x = xStart + (s + (s/4))*c;
                let y = pointYFormula();
                points.push({x,y});
            }
            return points;
        }

        const createSvgPattern = (
                points:  {x:number,y:number}[], 
                pointMapper: (point: {x:number,y:number}, pattern: string, pointNumber: number) => JSX.Element) => {
            let pattern = "white";
            let patternDef: JSX.Element | null = null;

            switch (card.pattern) {
                case "solid": 
                    pattern = card.color; 
                    break;
                case "stripes": 
                    const patternId = `diagonalHatch_${patternCount++}`
                    patternDef =  <pattern id={patternId} width="5" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse" >
                                        <line x1="0" y1="0" x2="0" y2="10" stroke={card.color} stroke-width="5" />
                                    </pattern>
                    pattern =  `url(#${patternId})`;
                    break;

            }

            return <svg>
                {patternDef}
                {points.map((point,i) => pointMapper(point, pattern, i))}
            </svg>
        }

        const renderCardHelperCircle = () => {       
            const points = getShapeStartPoints(
                () => (w - ((card.count * s)  + (card.count - 1)*(s/4)))/2 + (s/2),
                () => h/2);
            return createSvgPattern(points, (point, pattern, pointNumber) =>  <circle cx={`${point.x}`} cy={`${point.y}`} r={`${s/2}`} fill={pattern} stroke={card.color} stroke-width="5" key={pointNumber}/>)
        }

        const renderCardHelperTriangle = () => {
            const points = getShapeStartPoints(
                () => (w - ((card.count * s)  + (card.count - 1)*(s/4)))/2,
                () => (h/2) + s/2);
            return createSvgPattern(points, (point, pattern, pointNumber) =>  <polygon points={`${point.x},${point.y} ${point.x+ s},${point.y} ${point.x+(s/2)},${point.y-s}`} key={pointNumber} fill={pattern} stroke={card.color} stroke-width="5" />)
        }

        const renderCardHelperSquare = () => {
            const points = getShapeStartPoints(
                () => (w - ((card.count * s)  + (card.count - 1)*(s/4)))/2,
                () => (h/2 - s/2));
            return createSvgPattern(points, (point, pattern, pointNumber) =>  <rect x={`${point.x}`} y = {`${point.y}`} width={`${s}`} height={`${s}`} fill={pattern} stroke={card.color} stroke-width="5" key={pointNumber} />)
        }

        const handleCardClick = () => {
            card.selected = true;
        }



        return <div className={card.selected ? "cardSelected" : "card"} style={{color:"red"}} onClick={handleCardClick}> {renderCard()} </div>
    }
}