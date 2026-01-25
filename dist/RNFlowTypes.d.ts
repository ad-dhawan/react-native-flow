import { ViewStyle } from "react-native";
export type RNFlowNode<T = any> = {
    id: string;
    data: T;
    children?: RNFlowNode<T>[];
    x?: number;
    y?: number;
    metadata?: Record<string, any>;
};
export type EdgeStyle = {
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
    opacity?: number;
};
export type EdgeType = 'straight' | 'curved' | 'step' | 'smoothstep';
export type NodeStyle = {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    shadowColor?: string;
    shadowOpacity?: number;
    shadowRadius?: number;
    shadowOffset?: {
        width: number;
        height: number;
    };
    elevation?: number;
};
export type ZoomConfig = {
    minZoom?: number;
    maxZoom?: number;
    defaultZoom?: number;
    zoomStep?: number;
    enablePinchZoom?: boolean;
    enableZoomControls?: boolean;
    zoomControlsPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    animateZoom?: boolean;
    zoomAnimationDuration?: number;
};
export type ScrollConfig = {
    enableHorizontalScroll?: boolean;
    enableVerticalScroll?: boolean;
    showHorizontalScrollIndicator?: boolean;
    showVerticalScrollIndicator?: boolean;
    scrollEventThrottle?: number;
    autoCenter?: boolean;
    autoCenterDelay?: number;
};
export type LayoutConfig = {
    direction?: 'vertical' | 'horizontal';
    nodeWidth?: number;
    nodeHeight?: number;
    levelGap?: number;
    siblingGap?: number;
    padding?: number;
    alignment?: 'start' | 'center' | 'end';
};
export type InteractionConfig<T = any> = {
    enableNodeSelection?: boolean;
    enableNodeDrag?: boolean;
    enableNodeHover?: boolean;
    multiSelect?: boolean;
    onNodePress?: (node: RNFlowNode<T>) => void;
    onNodeLongPress?: (node: RNFlowNode<T>) => void;
    onNodeDoublePress?: (node: RNFlowNode<T>) => void;
    onEdgePress?: (parent: RNFlowNode<T>, child: RNFlowNode<T>) => void;
    onCanvasPress?: () => void;
    onZoomChange?: (zoom: number) => void;
    onScrollChange?: (x: number, y: number) => void;
};
export type RenderConfig<T = any> = {
    renderNode?: (node: RNFlowNode<T>, options: {
        isSelected: boolean;
        isHovered: boolean;
        onPress: () => void;
        onLongPress: () => void;
        dimensions: {
            width: number;
            height: number;
        };
    }) => React.ReactNode;
    renderEdge?: (parent: RNFlowNode<T>, child: RNFlowNode<T>, options: {
        path: string;
        style: EdgeStyle;
    }) => React.ReactNode;
    renderZoomControls?: (zoomIn: () => void, zoomOut: () => void, currentZoom: number) => React.ReactNode;
    renderMiniMap?: () => React.ReactNode;
};
export type StyleConfig = {
    containerStyle?: ViewStyle;
    canvasStyle?: ViewStyle;
    nodeStyle?: NodeStyle;
    selectedNodeStyle?: NodeStyle;
    edgeStyle?: EdgeStyle;
    selectedEdgeStyle?: EdgeStyle;
    backgroundColor?: string;
    zoomControlsStyle?: ViewStyle;
};
export type RNFlowProps<T = any> = {
    data: RNFlowNode<T>;
    selectedNodeIds?: string[];
    layout?: LayoutConfig;
    zoom?: ZoomConfig;
    scroll?: ScrollConfig;
    interaction?: InteractionConfig;
    render?: RenderConfig<T>;
    style?: StyleConfig;
    edgeType?: EdgeType;
    enableVirtualization?: boolean;
    debug?: boolean;
};
export type DefaultNodeProps<T> = {
    node: RNFlowNode<T>;
    width: number;
    height: number;
    onPress?: (node: RNFlowNode<T>) => void;
    onLongPress?: (node: RNFlowNode<T>) => void;
    style?: NodeStyle;
    isSelected?: boolean;
};
//# sourceMappingURL=RNFlowTypes.d.ts.map