
import RNFlow from "../RNFlow";
import { simpleData } from "./Data/SimpleData";

export function SimpleExample() {
    return (
        <RNFlow
            data={simpleData}
            layout={{
                direction: 'vertical',
                nodeWidth: 120,
                nodeHeight: 60,
            }}
            zoom={{
                enableZoomControls: true,
            }}
        />
    );
}