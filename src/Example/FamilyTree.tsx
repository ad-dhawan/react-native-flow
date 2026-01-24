import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { FamilyMember, familyTreeData } from './Data/FamilyTreeData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function FamilyTreeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <RNFlow<FamilyMember>
            data={familyTreeData}
            selectedNodeIds={selected}
            layout={{
                direction: 'vertical',
                nodeWidth: 160,
                nodeHeight: 140,
                levelGap: 180,
                siblingGap: 180,
            }}
            zoom={{
                minZoom: 0.5,
                maxZoom: 2,
            }}
            edgeType="curved"
            interaction={{
                onNodePress: (node) => setSelected([node.id]),
                onNodeLongPress: (node) => {
                    Alert.alert(
                        node.data.name,
                        `Born: ${node.data.birthYear}\nAge: ${2024 - node.data.birthYear}\nStatus: ${node.data.isAlive ? 'Living' : 'Deceased'
                        }`
                    );
                },
            }}
            render={{
                renderNode: (node, { isSelected, onPress, onLongPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[
                            advancedStyles.familyNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                borderColor: isSelected ? '#D4AF37' : '#D2B48C',
                                backgroundColor: node.data.gender === 'male' ? '#E3F2FD' : '#FCE4EC',
                            },
                        ]}
                    >
                        <View
                            style={[
                                advancedStyles.familyAvatar,
                                { backgroundColor: node.data.gender === 'male' ? '#2196F3' : '#E91E63' },
                            ]}
                        >
                            <Icon
                                name={node.data.gender === 'male' ? 'man' : 'woman'}
                                size={32}
                                color="#FFF"
                            />
                        </View>
                        <Text style={advancedStyles.familyName}>{node.data.name}</Text>
                        <Text style={advancedStyles.familyYear}>b. {node.data.birthYear}</Text>
                        {!node.data.isAlive && (
                            <Text style={advancedStyles.deceasedBadge}>†</Text>
                        )}
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#FFF8DC',
                edgeStyle: {
                    stroke: '#8B4513',
                    strokeWidth: 2,
                },
            }}
        />
    );
}