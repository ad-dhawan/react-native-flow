"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCategoryExample = ShoppingCategoryExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const CategoryData_1 = require("./Data/CategoryData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
function ShoppingCategoryExample() {
    return (<RNFlow_1.default data={CategoryData_1.categoryData} layout={{
            direction: 'vertical',
            nodeWidth: 160,
            nodeHeight: 120,
            levelGap: 140,
            siblingGap: 180,
        }} zoom={{
            defaultZoom: 0.9,
        }} edgeType="smoothstep" render={{
            renderNode: (node, { onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    AdvanceExampleStyles_1.advancedStyles.categoryNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                    },
                ]}>
                        {node.data.discount && (<react_native_1.View style={AdvanceExampleStyles_1.advancedStyles.discountBadge}>
                                <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.discountText}>{node.data.discount}% OFF</react_native_1.Text>
                            </react_native_1.View>)}
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.categoryIcon}>{node.data.icon}</react_native_1.Text>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.categoryName}>{node.data.name}</react_native_1.Text>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.itemCount}>
                            {node.data.itemCount.toLocaleString()} items
                        </react_native_1.Text>
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#FFF',
            edgeStyle: {
                stroke: '#E91E63',
                strokeWidth: 2,
            },
        }}/>);
}
