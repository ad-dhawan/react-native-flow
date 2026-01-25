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
exports.MultiSelectExample = MultiSelectExample;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const OrganizationChartData_1 = require("./Data/OrganizationChartData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
function MultiSelectExample() {
    const [selectedNodes, setSelectedNodes] = (0, react_1.useState)([]);
    const handleNodePress = (0, react_1.useCallback)((node) => {
        setSelectedNodes((prev) => {
            if (prev.includes(node.id)) {
                return prev.filter((id) => id !== node.id);
            }
            return [...prev, node.id];
        });
    }, []);
    const clearSelection = () => setSelectedNodes([]);
    const selectAll = () => {
        const allIds = [];
        const collectIds = (node) => {
            allIds.push(node.id);
            node.children?.forEach(collectIds);
        };
        collectIds(OrganizationChartData_1.organizationData);
        setSelectedNodes(allIds);
    };
    return (<react_native_1.View style={{ flex: 1 }}>
            <react_native_1.View style={AdvanceExampleStyles_1.advancedStyles.actionBar}>
                <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.selectionCount}>
                    Selected: {selectedNodes.length}
                </react_native_1.Text>
                <react_native_1.TouchableOpacity onPress={selectAll} style={AdvanceExampleStyles_1.advancedStyles.actionButton}>
                    <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.actionButtonText}>Select All</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={clearSelection} style={AdvanceExampleStyles_1.advancedStyles.actionButton}>
                    <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.actionButtonText}>Clear</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <RNFlow_1.default data={OrganizationChartData_1.organizationData} selectedNodeIds={selectedNodes} interaction={{
            multiSelect: true,
            onNodePress: handleNodePress,
        }} layout={{
            direction: 'vertical',
            nodeWidth: 140,
            nodeHeight: 80,
        }} style={{
            backgroundColor: '#F5F5F5',
        }}/>
        </react_native_1.View>);
}
