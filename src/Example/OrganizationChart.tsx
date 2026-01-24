import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNFlow from '../RNFlow';
import { Employee } from './Data/OrganizationChartData';
import { organizationData } from './Data/OrganizationChartData';
import { exampleStyles } from './Styles//ExampleStyles';

export function OrganizationChartExample() {
    const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

    return (
        <RNFlow<Employee>
            data={organizationData}
            selectedNodeIds={selectedNodeIds}
            layout={{
                direction: 'vertical',
                nodeWidth: 200,
                nodeHeight: 120,
                levelGap: 160,
                siblingGap: 220,
            }}
            zoom={{
                minZoom: 0.3,
                maxZoom: 2,
                defaultZoom: 0.8,
                zoomControlsPosition: 'top-right',
            }}
            edgeType="smoothstep"
            interaction={{
                onNodePress: (node) => {
                    setSelectedNodeIds([node.id]);
                },
            }}
            render={{
                renderNode: (node, { isSelected, onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            exampleStyles.orgNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                borderColor: isSelected ? '#2196F3' : '#E0E0E0',
                                backgroundColor: isSelected ? '#E3F2FD' : '#FFFFFF',
                            },
                        ]}
                    >
                        <View style={exampleStyles.orgNodeHeader}>
                            <Text style={exampleStyles.orgTitle}>{node.data.title}</Text>
                        </View>
                        <Text style={exampleStyles.orgName}>{node.data.name}</Text>
                        <Text style={exampleStyles.orgDepartment}>{node.data.department}</Text>
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#F5F7FA',
                edgeStyle: {
                    stroke: '#64B5F6',
                    strokeWidth: 2,
                },
            }}
        />
    );
}