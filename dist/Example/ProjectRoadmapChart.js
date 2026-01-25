"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoadmapExample = ProjectRoadmapExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const RoadmapData_1 = require("./Data/RoadmapData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
function ProjectRoadmapExample() {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return '#4CAF50';
            case 'in-progress':
                return '#FF9800';
            case 'pending':
                return '#9E9E9E';
        }
    };
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
        }
    };
    return (<RNFlow_1.default data={RoadmapData_1.roadmapData} layout={{
            direction: 'horizontal',
            nodeWidth: 200,
            nodeHeight: 120,
            levelGap: 220,
            siblingGap: 140,
        }} edgeType="step" render={{
            renderNode: (node, { onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    AdvanceExampleStyles_1.advancedStyles.roadmapNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                        borderLeftColor: getStatusColor(node.data.status),
                    },
                ]}>
                        <react_native_1.View style={AdvanceExampleStyles_1.advancedStyles.roadmapHeader}>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.roadmapTitle}>{node.data.title}</react_native_1.Text>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.priorityBadge}>
                                {getPriorityIcon(node.data.priority)}
                            </react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.roadmapDate}>{node.data.date}</react_native_1.Text>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.roadmapTeam}>Team: {node.data.team}</react_native_1.Text>
                        <react_native_1.View style={[
                    AdvanceExampleStyles_1.advancedStyles.statusBadge,
                    { backgroundColor: getStatusColor(node.data.status) },
                ]}>
                            <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.statusText}>
                                {node.data.status.replace('-', ' ').toUpperCase()}
                            </react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#F5F5F5',
            edgeStyle: {
                stroke: '#BDBDBD',
                strokeWidth: 2,
                strokeDasharray: '5,5',
            },
        }}/>);
}
