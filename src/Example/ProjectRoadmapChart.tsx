import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { Milestone, roadmapData } from './Data/RoadmapData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';

export function ProjectRoadmapExample() {
    const getStatusColor = (status: Milestone['status']) => {
        switch (status) {
            case 'completed':
                return '#4CAF50';
            case 'in-progress':
                return '#FF9800';
            case 'pending':
                return '#9E9E9E';
        }
    };

    const getPriorityIcon = (priority: Milestone['priority']) => {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
        }
    };

    return (
        <RNFlow<Milestone>
            data={roadmapData}
            layout={{
                direction: 'horizontal',
                nodeWidth: 200,
                nodeHeight: 120,
                levelGap: 220,
                siblingGap: 140,
            }}
            edgeType="step"
            render={{
                renderNode: (node, { onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            advancedStyles.roadmapNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                borderLeftColor: getStatusColor(node.data.status),
                            },
                        ]}
                    >
                        <View style={advancedStyles.roadmapHeader}>
                            <Text style={advancedStyles.roadmapTitle}>{node.data.title}</Text>
                            <Text style={advancedStyles.priorityBadge}>
                                {getPriorityIcon(node.data.priority)}
                            </Text>
                        </View>
                        <Text style={advancedStyles.roadmapDate}>{node.data.date}</Text>
                        <Text style={advancedStyles.roadmapTeam}>Team: {node.data.team}</Text>
                        <View
                            style={[
                                advancedStyles.statusBadge,
                                { backgroundColor: getStatusColor(node.data.status) },
                            ]}
                        >
                            <Text style={advancedStyles.statusText}>
                                {node.data.status.replace('-', ' ').toUpperCase()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#F5F5F5',
                edgeStyle: {
                    stroke: '#BDBDBD',
                    strokeWidth: 2,
                    strokeDasharray: '5,5',
                },
            }}
        />
    );
}