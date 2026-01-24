import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNFlow from '../RNFlow';
import { familyTreeData } from './Data/FamilyTreeData';
import { advancedStyles } from './Styles/AdvanceExampleStyles';

export function DarkThemeExample() {

    return (
        <RNFlow
            data={familyTreeData}
            layout={{
                direction: 'horizontal',
                nodeWidth: 150,
                nodeHeight: 100,
            }}
            zoom={{
                enableZoomControls: true,
                zoomControlsPosition: 'bottom-right',
            }}
            render={{
                renderZoomControls: (zoomIn, zoomOut, currentZoom) => (
                    <View style={advancedStyles.customZoomControls}>
                        <TouchableOpacity onPress={zoomOut} style={advancedStyles.zoomButton}>
                            <Text style={advancedStyles.zoomButtonText}>−</Text>
                        </TouchableOpacity>
                        <View style={advancedStyles.zoomDisplay}>
                            <Text style={advancedStyles.zoomText}>{Math.round(currentZoom * 100)}%</Text>
                        </View>
                        <TouchableOpacity onPress={zoomIn} style={advancedStyles.zoomButton}>
                            <Text style={advancedStyles.zoomButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }}
            style={{
                backgroundColor: '#1E1E1E',
                // canvasBackgroundColor: '#2D2D2D',
                nodeStyle: {
                    backgroundColor: '#3A3A3A',
                    borderColor: '#555',
                    borderWidth: 1,
                    borderRadius: 12,
                },
                edgeStyle: {
                    stroke: '#666',
                    strokeWidth: 2,
                },
            }}
            edgeType="curved"
        />
    );
}