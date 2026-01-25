"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEdgeExample = CustomEdgeExample;
const react_1 = __importDefault(require("react"));
const RNFlow_1 = __importDefault(require("../RNFlow"));
const DecisionTree_1 = require("./Data/DecisionTree");
const react_native_svg_1 = require("react-native-svg");
function CustomEdgeExample() {
    return (<RNFlow_1.default data={DecisionTree_1.decisionTreeData} layout={{
            direction: 'vertical',
            nodeWidth: 150,
            nodeHeight: 80,
        }} render={{
            renderEdge: ({ path, style }) => (<>
                        <react_native_svg_1.Path d={path} stroke={style.stroke} strokeWidth={style.strokeWidth} fill="none"/>
                        
                        <react_native_svg_1.Circle r={4} fill={style.stroke}/>
                    </>),
        }} style={{
            edgeStyle: {
                stroke: '#9C27B0',
                strokeWidth: 3,
            },
        }}/>);
}
