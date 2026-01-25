"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTreeExample = DecisionTreeExample;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const DecisionTree_1 = require("./Data/DecisionTree");
const ExampleStyles_1 = require("./Styles/ExampleStyles");
function DecisionTreeExample() {
    const [selectedPath, setSelectedPath] = (0, react_1.useState)([]);
    return (<RNFlow_1.default data={DecisionTree_1.decisionTreeData} selectedNodeIds={selectedPath} layout={{
            direction: 'vertical',
            nodeWidth: 180,
            nodeHeight: 100,
            levelGap: 140,
            siblingGap: 200,
        }} edgeType="curved" interaction={{
            onNodePress: (node) => {
                const path = [];
                const findPath = (n, targetId) => {
                    path.push(n.id);
                    if (n.id === targetId)
                        return true;
                    if (n.children) {
                        for (const child of n.children) {
                            if (findPath(child, targetId))
                                return true;
                        }
                    }
                    path.pop();
                    return false;
                };
                findPath(DecisionTree_1.decisionTreeData, node.id);
                setSelectedPath(path);
            },
        }} render={{
            renderNode: (node, { isSelected, onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    ExampleStyles_1.exampleStyles.decisionNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                        backgroundColor: node.data.isEndNode
                            ? isSelected
                                ? '#C8E6C9'
                                : '#E8F5E9'
                            : isSelected
                                ? '#BBDEFB'
                                : '#FFFFFF',
                        borderColor: node.data.isEndNode ? '#4CAF50' : '#2196F3',
                    },
                ]}>
                        {node.data.answer && (<react_native_1.View style={ExampleStyles_1.exampleStyles.answerBadge}>
                                <react_native_1.Text style={ExampleStyles_1.exampleStyles.answerText}>{node.data.answer}</react_native_1.Text>
                            </react_native_1.View>)}
                        <react_native_1.Text style={ExampleStyles_1.exampleStyles.questionText} numberOfLines={3}>
                            {node.data.question}
                        </react_native_1.Text>
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#FAFAFA',
            edgeStyle: {
                stroke: '#90CAF9',
                strokeWidth: 3,
            },
        }}/>);
}
