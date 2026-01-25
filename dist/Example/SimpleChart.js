"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleExample = SimpleExample;
const RNFlow_1 = __importDefault(require("../RNFlow"));
const SimpleData_1 = require("./Data/SimpleData");
function SimpleExample() {
    return (<RNFlow_1.default data={SimpleData_1.simpleData} layout={{
            direction: 'vertical',
            nodeWidth: 120,
            nodeHeight: 60,
        }} zoom={{
            enableZoomControls: true,
        }}/>);
}
