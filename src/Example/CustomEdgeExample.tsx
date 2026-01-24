import React from 'react';
import RNFlow from '../RNFlow';
import { decisionTreeData } from './Data/DecisionTree';
import { Circle, Path } from 'react-native-svg';

export function CustomEdgeExample() {
    return (
        <RNFlow
            data={decisionTreeData}
            layout={{
                direction: 'vertical',
                nodeWidth: 150,
                nodeHeight: 80,
            }}
            render={{
                renderEdge: ({ path, style }: any) => (
                    <>
                        <Path
                            d={path}
                            stroke={style.stroke}
                            strokeWidth={style.strokeWidth}
                            fill="none"
                        />
                        {/* Add arrow marker */}
                        <Circle
                            r={4}
                            fill={style.stroke}
                        />
                    </>
                ),
            }}
            style={{
                edgeStyle: {
                    stroke: '#9C27B0',
                    strokeWidth: 3,
                },
            }}
        />
    );
}