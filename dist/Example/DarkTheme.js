"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkThemeExample = DarkThemeExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const FamilyTreeData_1 = require("./Data/FamilyTreeData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
function DarkThemeExample() {
    return (<RNFlow_1.default data={FamilyTreeData_1.familyTreeData} layout={{
            direction: 'horizontal',
            nodeWidth: 150,
            nodeHeight: 100,
        }} zoom={{
            enableZoomControls: true,
            zoomControlsPosition: 'bottom-right',
        }} render={{
            renderZoomControls: (zoomIn, zoomOut, currentZoom) => (<react_native_1.View style={AdvanceExampleStyles_1.advancedStyles.customZoomControls}>
                        <react_native_1.TouchableOpacity onPress={zoomOut} style={AdvanceExampleStyles_1.advancedStyles.zoomButton}>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.zoomButtonText}>−</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.View style={AdvanceExampleStyles_1.advancedStyles.zoomDisplay}>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.zoomText}>{Math.round(currentZoom * 100)}%</react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.TouchableOpacity onPress={zoomIn} style={AdvanceExampleStyles_1.advancedStyles.zoomButton}>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.zoomButtonText}>+</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>),
        }} style={{
            backgroundColor: '#1E1E1E',
            nodeStyle: {
                backgroundColor: '#3A3A3A',
                borderColor: '#555',
                borderWidth: 1,
                borderRadius: 12,
            },
            edgeStyle: {
                stroke: '#666',
                strokeWidth: 2,
            },
        }} edgeType="curved"/>);
}
