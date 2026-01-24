import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { NetworkNode, networkData } from './Data/NetworkData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function NetworkDiagramExample() {
    const getStatusColor = (status: NetworkNode['status']) => {
        switch (status) {
            case 'online':
                return '#4CAF50';
            case 'offline':
                return '#F44336';
            case 'warning':
                return '#FF9800';
        }
    };

    const getTypeIcon = (type: NetworkNode['type']) => {
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

    return (
        <RNFlow<NetworkNode>
            data={networkData}
            layout={{
                direction: 'vertical',
                nodeWidth: 180,
                nodeHeight: 110,
                levelGap: 160,
                siblingGap: 200,
            }}
            edgeType="step"
            render={{
                renderNode: (node, { onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            advancedStyles.networkNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                            },
                        ]}
                    >
                        <View style={advancedStyles.networkHeader}>
                            <Icon name={getTypeIcon(node.data.type)} size={24} color="#00BCD4" />
                            <View
                                style={[
                                    advancedStyles.statusIndicator,
                                    { backgroundColor: getStatusColor(node.data.status) },
                                ]}
                            />
                        </View>
                        <Text style={advancedStyles.networkName}>{node.data.name}</Text>
                        {node.data.ip && (
                            <Text style={advancedStyles.networkIP}>{node.data.ip}</Text>
                        )}
                        {node.data.connections !== undefined && (
                            <Text style={advancedStyles.networkConnections}>
                                {node.data.connections} conn.
                            </Text>
                        )}
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#263238',
                edgeStyle: {
                    stroke: '#00BCD4',
                    strokeWidth: 2,
                },
            }}
        />
    );
}