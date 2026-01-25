"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalFlowExample = HorizontalFlowExample;
const RNFlow_1 = __importDefault(require("../RNFlow"));
const SimpleData_1 = require("./Data/SimpleData");
function HorizontalFlowExample() {
    return (<RNFlow_1.default data={SimpleData_1.simpleData} layout={{
            direction: 'horizontal',
            nodeWidth: 140,
            nodeHeight: 80,
            levelGap: 200,
            siblingGap: 120,
        }} edgeType="smoothstep" style={{
            backgroundColor: '#ECEFF1',
            edgeStyle: {
                stroke: '#607D8B',
                strokeWidth: 2,
            },
            nodeStyle: {
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
            },
        }}/>);
}
