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
exports.FamilyTreeExample = FamilyTreeExample;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const FamilyTreeData_1 = require("./Data/FamilyTreeData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
const MaterialIcons_1 = __importDefault(require("react-native-vector-icons/MaterialIcons"));
function FamilyTreeExample() {
    const [selected, setSelected] = (0, react_1.useState)([]);
    return (<RNFlow_1.default data={FamilyTreeData_1.familyTreeData} selectedNodeIds={selected} layout={{
            direction: 'vertical',
            nodeWidth: 160,
            nodeHeight: 140,
            levelGap: 180,
            siblingGap: 180,
        }} zoom={{
            minZoom: 0.5,
            maxZoom: 2,
        }} edgeType="curved" interaction={{
            onNodePress: (node) => setSelected([node.id]),
            onNodeLongPress: (node) => {
                react_native_1.Alert.alert(node.data.name, `Born: ${node.data.birthYear}\nAge: ${2024 - node.data.birthYear}\nStatus: ${node.data.isAlive ? 'Living' : 'Deceased'}`);
            },
        }} render={{
            renderNode: (node, { isSelected, onPress, onLongPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[
                    AdvanceExampleStyles_1.advancedStyles.familyNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                        borderColor: isSelected ? '#D4AF37' : '#D2B48C',
                        backgroundColor: node.data.gender === 'male' ? '#E3F2FD' : '#FCE4EC',
                    },
                ]}>
                        <react_native_1.View style={[
                    AdvanceExampleStyles_1.advancedStyles.familyAvatar,
                    { backgroundColor: node.data.gender === 'male' ? '#2196F3' : '#E91E63' },
                ]}>
                            <MaterialIcons_1.default name={node.data.gender === 'male' ? 'man' : 'woman'} size={32} color="#FFF"/>
                        </react_native_1.View>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.familyName}>{node.data.name}</react_native_1.Text>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.familyYear}>b. {node.data.birthYear}</react_native_1.Text>
                        {!node.data.isAlive && (<react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.deceasedBadge}>†</react_native_1.Text>)}
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#FFF8DC',
            edgeStyle: {
                stroke: '#8B4513',
                strokeWidth: 2,
            },
        }}/>);
}
