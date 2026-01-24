import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RNFlow from '../RNFlow';
import { simpleData } from './Data/SimpleData';

export function MinimalistExample() {
    return (
        <RNFlow
            data={simpleData}
            layout={{
                direction: 'vertical',
                nodeWidth: 100,
                nodeHeight: 50,
                levelGap: 100,
                siblingGap: 120,
            }}
            style={{
                backgroundColor: '#FFFFFF',
                nodeStyle: {
                    backgroundColor: '#000',
                    borderRadius: 4,
                },
                edgeStyle: {
                    stroke: '#000',
                    strokeWidth: 1,
                },
            }}
            edgeType="straight"
            render={{
                renderNode: (node: any, { onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            width: dimensions.width,
                            height: dimensions.height,
                            backgroundColor: '#000',
                            borderRadius: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
                            {node.data.title}
                        </Text>
                    </TouchableOpacity>
                ),
            }}
        />
    );
}