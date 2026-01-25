"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimalistExample = MinimalistExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const SimpleData_1 = require("./Data/SimpleData");
function MinimalistExample() {
    return (<RNFlow_1.default data={SimpleData_1.simpleData} layout={{
            direction: 'vertical',
            nodeWidth: 100,
            nodeHeight: 50,
            levelGap: 100,
            siblingGap: 120,
        }} style={{
            backgroundColor: '#FFFFFF',
            nodeStyle: {
                backgroundColor: '#000',
                borderRadius: 4,
            },
            edgeStyle: {
                stroke: '#000',
                strokeWidth: 1,
            },
        }} edgeType="straight" render={{
            renderNode: (node, { onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    backgroundColor: '#000',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                        <react_native_1.Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
                            {node.data.title}
                        </react_native_1.Text>
                    </react_native_1.TouchableOpacity>),
        }}/>);
}
