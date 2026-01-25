"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGraphExample = KnowledgeGraphExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const KnowledgeGraphData_1 = require("./Data/KnowledgeGraphData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
function KnowledgeGraphExample() {
    const getCategoryColor = (category) => {
        switch (category) {
            case 'core':
                return '#2196F3';
            case 'feature':
                return '#4CAF50';
            case 'tool':
                return '#FF9800';
            case 'skill':
                return '#9C27B0';
        }
    };
    return (<RNFlow_1.default data={KnowledgeGraphData_1.knowledgeGraphData} layout={{
            direction: 'vertical',
            nodeWidth: 140,
            nodeHeight: 100,
            levelGap: 150,
            siblingGap: 160,
        }} edgeType="curved" render={{
            renderNode: (node, { onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    AdvanceExampleStyles_1.advancedStyles.conceptNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                        borderColor: getCategoryColor(node.data.category),
                    },
                ]}>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.conceptIcon}>{node.data.icon}</react_native_1.Text>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.conceptText}>{node.data.concept}</react_native_1.Text>
                        <react_native_1.View style={[
                    AdvanceExampleStyles_1.advancedStyles.categoryBadge,
                    { backgroundColor: getCategoryColor(node.data.category) },
                ]}>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.categoryText}>{node.data.category}</react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#FAFAFA',
            edgeStyle: {
                stroke: '#9C27B0',
                strokeWidth: 2,
                opacity: 0.6,
            },
        }}/>);
}
