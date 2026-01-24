import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { Concept, knowledgeGraphData } from './Data/KnowledgeGraphData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';

export function KnowledgeGraphExample() {
    const getCategoryColor = (category: Concept['category']) => {
        switch (category) {
            case 'core':
                return '#2196F3';
            case 'feature':
                return '#4CAF50';
            case 'tool':
                return '#FF9800';
            case 'skill':
                return '#9C27B0';
        }
    };

    return (
        <RNFlow<Concept>
            data={knowledgeGraphData}
            layout={{
                direction: 'vertical',
                nodeWidth: 140,
                nodeHeight: 100,
                levelGap: 150,
                siblingGap: 160,
            }}
            edgeType="curved"
            render={{
                renderNode: (node, { onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            advancedStyles.conceptNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                borderColor: getCategoryColor(node.data.category),
                            },
                        ]}
                    >
                        <Text style={advancedStyles.conceptIcon}>{node.data.icon}</Text>
                        <Text style={advancedStyles.conceptText}>{node.data.concept}</Text>
                        <View
                            style={[
                                advancedStyles.categoryBadge,
                                { backgroundColor: getCategoryColor(node.data.category) },
                            ]}
                        >
                            <Text style={advancedStyles.categoryText}>{node.data.category}</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#FAFAFA',
                edgeStyle: {
                    stroke: '#9C27B0',
                    strokeWidth: 2,
                    opacity: 0.6,
                },
            }}
        />
    );
}