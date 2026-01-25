import { ViewStyle } from "react-native";
import { EdgeType, LayoutConfig, RNFlowNode } from "./RNFlowTypes";
export declare function layoutTree<T = any>(node: RNFlowNode<T>, depth: number | undefined, offset: {
    value: number;
} | undefined, config: Required<LayoutConfig>): RNFlowNode<T>;
export declare function getTreeBounds<T = any>(nodes: RNFlowNode<T>[], nodeWidth: number, nodeHeight: number): {
    width: number;
    height: number;
    minX: number;
    minY: number;
};
export declare function getEdgePath<T = any>(parent: RNFlowNode<T>, child: RNFlowNode<T>, direction: 'vertical' | 'horizontal', nodeWidth: number, nodeHeight: number, paddingAmount: number, edgeType?: EdgeType): string;
export declare function flattenTree<T = any>(root: RNFlowNode<T>): RNFlowNode<T>[];
export declare function getZoomControlsPosition(position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'): ViewStyle;
//# sourceMappingURL=RNFlowFunctions.d.ts.map