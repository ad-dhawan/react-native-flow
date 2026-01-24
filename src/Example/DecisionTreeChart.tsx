import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { RNFlowNode } from '../RNFlowTypes';
import { Decision, decisionTreeData } from './Data/DecisionTree';
import { exampleStyles } from './Styles/ExampleStyles';

export function DecisionTreeExample() {
    const [selectedPath, setSelectedPath] = useState<string[]>([]);

    return (
        <RNFlow<Decision>
            data={decisionTreeData}
            selectedNodeIds={selectedPath}
            layout={{
                direction: 'vertical',
                nodeWidth: 180,
                nodeHeight: 100,
                levelGap: 140,
                siblingGap: 200,
            }}
            edgeType="curved"
            interaction={{
                onNodePress: (node) => {
                    // Build path to clicked node
                    const path: string[] = [];
                    const findPath = (n: RNFlowNode<Decision>, targetId: string): boolean => {
                        path.push(n.id);
                        if (n.id === targetId) return true;
                        if (n.children) {
                            for (const child of n.children) {
                                if (findPath(child, targetId)) return true;
                            }
                        }
                        path.pop();
                        return false;
                    };
                    findPath(decisionTreeData, node.id);
                    setSelectedPath(path);
                },
            }}
            render={{
                renderNode: (node, { isSelected, onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            exampleStyles.decisionNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                backgroundColor: node.data.isEndNode
                                    ? isSelected
                                        ? '#C8E6C9'
                                        : '#E8F5E9'
                                    : isSelected
                                        ? '#BBDEFB'
                                        : '#FFFFFF',
                                borderColor: node.data.isEndNode ? '#4CAF50' : '#2196F3',
                            },
                        ]}
                    >
                        {node.data.answer && (
                            <View style={exampleStyles.answerBadge}>
                                <Text style={exampleStyles.answerText}>{node.data.answer}</Text>
                            </View>
                        )}
                        <Text style={exampleStyles.questionText} numberOfLines={3}>
                            {node.data.question}
                        </Text>
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#FAFAFA',
                edgeStyle: {
                    stroke: '#90CAF9',
                    strokeWidth: 3,
                },
            }}
        />
    );
}