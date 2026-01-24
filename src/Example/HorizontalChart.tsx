
import RNFlow from "../RNFlow";
import { simpleData } from "./Data/SimpleData";

export function HorizontalFlowExample() {
    return (
        <RNFlow
            data={simpleData}
            layout={{
                direction: 'horizontal',
                nodeWidth: 140,
                nodeHeight: 80,
                levelGap: 200,
                siblingGap: 120,
            }}
            edgeType="smoothstep"
            style={{
                backgroundColor: '#ECEFF1',
                edgeStyle: {
                    stroke: '#607D8B',
                    strokeWidth: 2,
                },
                nodeStyle: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 4,
                },
            }}
        />
    );
}