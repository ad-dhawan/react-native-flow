import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { Category, categoryData } from './Data/CategoryData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';

export function ShoppingCategoryExample() {
    return (
        <RNFlow<Category>
            data={categoryData}
            layout={{
                direction: 'vertical',
                nodeWidth: 160,
                nodeHeight: 120,
                levelGap: 140,
                siblingGap: 180,
            }}
            zoom={{
                defaultZoom: 0.9,
            }}
            edgeType="smoothstep"
            render={{
                renderNode: (node, { onPress, dimensions }) => (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[
                            advancedStyles.categoryNode,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                            },
                        ]}
                    >
                        {node.data.discount && (
                            <View style={advancedStyles.discountBadge}>
                                <Text style={advancedStyles.discountText}>{node.data.discount}% OFF</Text>
                            </View>
                        )}
                        <Text style={advancedStyles.categoryIcon}>{node.data.icon}</Text>
                        <Text style={advancedStyles.categoryName}>{node.data.name}</Text>
                        <Text style={advancedStyles.itemCount}>
                            {node.data.itemCount.toLocaleString()} items
                        </Text>
                    </TouchableOpacity>
                ),
            }}
            style={{
                backgroundColor: '#FFF',
                edgeStyle: {
                    stroke: '#E91E63',
                    strokeWidth: 2,
                },
            }}
        />
    );
}