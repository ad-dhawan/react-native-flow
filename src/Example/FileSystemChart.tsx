import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import RNFlow from '../RNFlow';
import { FileSystemNode } from './Data/FileSystemData';
import { fileSystemData } from './Data/FileSystemData';
import { exampleStyles } from './Styles//ExampleStyles';

export function FileSystemExample() {
    return (
        <RNFlow<FileSystemNode>
            data={fileSystemData}
            layout={{
                direction: 'horizontal',
                nodeWidth: 160,
                nodeHeight: 80,
                levelGap: 180,
                siblingGap: 100,
            }}
            edgeType="step"
            render={{
                renderNode: (node, { onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            exampleStyles.fileNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                backgroundColor: node.data.type === 'folder' ? '#FFF3E0' : '#E8F5E9',
                            },
                        ]}
                    >
                        <Text style={exampleStyles.fileIcon}>
                            {node.data.type === 'folder' ? '📁' : '📄'}
                        </Text>
                        <Text style={exampleStyles.fileName} numberOfLines={1}>
                            {node.data.name}
                        </Text>
                        {node.data.size && (
                            <Text style={exampleStyles.fileSize}>{node.data.size}</Text>
                        )}
                    </TouchableOpacity>
                ),
            }}
            style={{
                edgeStyle: {
                    stroke: '#9E9E9E',
                    strokeWidth: 1.5,
                },
            }}
        />
    );
}