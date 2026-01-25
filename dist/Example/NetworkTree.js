"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkDiagramExample = NetworkDiagramExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const NetworkData_1 = require("./Data/NetworkData");
const AdvanceExampleStyles_1 = require("./Styles/AdvanceExampleStyles");
const MaterialIcons_1 = __importDefault(require("react-native-vector-icons/MaterialIcons"));
function NetworkDiagramExample() {
    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return '#4CAF50';
            case 'offline':
                return '#F44336';
            case 'warning':
                return '#FF9800';
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'server':
                return 'dns';
            case 'database':
                return 'storage';
            case 'service':
                return 'settings';
            case 'client':
                return 'computer';
        }
    };
    return (<RNFlow_1.default data={NetworkData_1.networkData} layout={{
            direction: 'vertical',
            nodeWidth: 180,
            nodeHeight: 110,
            levelGap: 160,
            siblingGap: 200,
        }} edgeType="step" render={{
            renderNode: (node, { onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    AdvanceExampleStyles_1.advancedStyles.networkNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                    },
                ]}>
                        <react_native_1.View style={AdvanceExampleStyles_1.advancedStyles.networkHeader}>
                            <MaterialIcons_1.default name={getTypeIcon(node.data.type)} size={24} color="#00BCD4"/>
                            <react_native_1.View style={[
                    AdvanceExampleStyles_1.advancedStyles.statusIndicator,
                    { backgroundColor: getStatusColor(node.data.status) },
                ]}/>
                        </react_native_1.View>
                        <react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.networkName}>{node.data.name}</react_native_1.Text>
                        {node.data.ip && (<react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.networkIP}>{node.data.ip}</react_native_1.Text>)}
                        {node.data.connections !== undefined && (<react_native_1.Text style={AdvanceExampleStyles_1.advancedStyles.networkConnections}>
                                {node.data.connections} conn.
                            </react_native_1.Text>)}
                    </react_native_1.TouchableOpacity>),
        }} style={{
            backgroundColor: '#263238',
            edgeStyle: {
                stroke: '#00BCD4',
                strokeWidth: 2,
            },
        }}/>);
}
