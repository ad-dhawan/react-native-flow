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
exports.OrganizationChartExample = OrganizationChartExample;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const OrganizationChartData_1 = require("./Data/OrganizationChartData");
const ExampleStyles_1 = require("./Styles//ExampleStyles");
function OrganizationChartExample() {
    const [selectedNodeIds, setSelectedNodeIds] = (0, react_1.useState)([]);
    return (<RNFlow_1.default data={OrganizationChartData_1.organizationData} selectedNodeIds={selectedNodeIds} layout={{
            direction: 'vertical',
            nodeWidth: 200,
            nodeHeight: 120,
            levelGap: 160,
            siblingGap: 220,
        }} zoom={{
            minZoom: 0.3,
            maxZoom: 2,
            defaultZoom: 0.8,
            zoomControlsPosition: 'top-right',
        }} edgeType="smoothstep" interaction={{
            onNodePress: (node) => {
                setSelectedNodeIds([node.id]);
            },
        }} render={{
            renderNode: (node, { isSelected, onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    ExampleStyles_1.exampleStyles.orgNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                        borderColor: isSelected ? '#2196F3' : '#E0E0E0',
                        backgroundColor: isSelected ? '#E3F2FD' : '#FFFFFF',
                    },
                ]}>
                        <react_native_1.View style={ExampleStyles_1.exampleStyles.orgNodeHeader}>
                            <react_native_1.Text style={ExampleStyles_1.exampleStyles.orgTitle}>{node.data.title}</react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.Text style={ExampleStyles_1.exampleStyles.orgName}>{node.data.name}</react_native_1.Text>
                        <react_native_1.Text style={ExampleStyles_1.exampleStyles.orgDepartment}>{node.data.department}</react_native_1.Text>
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#F5F7FA',
            edgeStyle: {
                stroke: '#64B5F6',
                strokeWidth: 2,
            },
        }}/>);
}
