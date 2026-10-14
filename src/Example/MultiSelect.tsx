import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { RNFlowNode } from '../RNFlowTypes';
import { organizationData } from './Data/OrganizationChartData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';

export function MultiSelectExample() {
    console.log("MultiSelectExample");

    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

    const handleNodePress = useCallback((node: RNFlowNode) => {
        setSelectedNodes((prev: any) => {
            if (prev.includes(node.id)) {
                return prev.filter((id: any) => id !== node.id);
            }
            return [...prev, node.id];
        });
    }, []);

    const clearSelection = () => setSelectedNodes([]);
    const selectAll = () => {
        const allIds: string[] = [];
        const collectIds = (node: RNFlowNode) => {
            allIds.push(node.id);
            node.children?.forEach(collectIds);
        };
        collectIds(organizationData);
        setSelectedNodes(allIds);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={advancedStyles.actionBar}>
                <Text style={advancedStyles.selectionCount}>
                    Selected: {selectedNodes.length}
                </Text>
                <TouchableOpacity onPress={selectAll} style={advancedStyles.actionButton}>
                    <Text style={advancedStyles.actionButtonText}>Select All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearSelection} style={advancedStyles.actionButton}>
                    <Text style={advancedStyles.actionButtonText}>Clear</Text>
                </TouchableOpacity>
            </View>
            <RNFlow
                data={organizationData}
                selectedNodeIds={selectedNodes}
                interaction={{
                    multiSelect: true,
                    onNodePress: handleNodePress,
                }}
                layout={{
                    direction: 'vertical',
                    nodeWidth: 140,
                    nodeHeight: 80,
                }}
                style={{
                    backgroundColor: '#F5F5F5',
                }}
            />
        </View>
    );
}