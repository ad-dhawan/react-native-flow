import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ViewStyle,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

// ==================== TYPES ====================

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
    shadowOffset?: { width: number; height: number };
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
    renderNode?: (
        node: RNFlowNode<T>,
        options: {
            isSelected: boolean;
            isHovered: boolean;
            onPress: () => void;
            onLongPress: () => void;
            dimensions: { width: number; height: number };
        }
    ) => React.ReactNode;
    renderEdge?: (
        parent: RNFlowNode<T>,
        child: RNFlowNode<T>,
        options: {
            path: string;
            style: EdgeStyle;
        }
    ) => React.ReactNode;
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
    // Core Data
    data: RNFlowNode<T>;
    selectedNodeIds?: string[];
    
    // Layout Configuration
    layout?: LayoutConfig;
    
    // Zoom Configuration
    zoom?: ZoomConfig;
    
    // Scroll Configuration
    scroll?: ScrollConfig;
    
    // Interaction Configuration
    interaction?: InteractionConfig;
    
    // Rendering Configuration
    render?: RenderConfig<T>;
    
    // Styling Configuration
    style?: StyleConfig;
    
    // Edge Configuration
    edgeType?: EdgeType;
    
    // Performance
    enableVirtualization?: boolean;
    
    // Debug
    debug?: boolean;
};

// ==================== LAYOUT ALGORITHMS ====================

function layoutTree<T = any>(
    node: RNFlowNode<T>,
    depth = 0,
    offset = { value: 0 },
    config: Required<LayoutConfig>
) {
    const children = node.children || [];
    const { direction, levelGap, siblingGap } = config;

    if (children.length === 0) {
        if (direction === 'vertical') {
            node.x = offset.value;
            node.y = depth * levelGap;
        } else {
            node.x = depth * levelGap;
            node.y = offset.value;
        }
        offset.value += siblingGap;
    } else {
        children.forEach(child =>
            layoutTree(child, depth + 1, offset, config)
        );

        const first = children[0];
        const last = children[children.length - 1];

        if (direction === 'vertical') {
            node.x = (first.x! + last.x!) / 2;
            node.y = depth * levelGap;
        } else {
            node.x = depth * levelGap;
            node.y = (first.y! + last.y!) / 2;
        }
    }

    return node;
}

function getTreeBounds<T = any>(
    nodes: RNFlowNode<T>[],
    nodeWidth: number,
    nodeHeight: number
) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodes.forEach(n => {
        const x = n.x ?? 0;
        const y = n.y ?? 0;

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + nodeWidth);
        maxY = Math.max(maxY, y + nodeHeight);
    });

    return {
        width: maxX - minX,
        height: maxY - minY,
        minX,
        minY,
    };
}

// ==================== EDGE RENDERING ====================

function getEdgePath<T = any>(
    parent: RNFlowNode<T>,
    child: RNFlowNode<T>,
    direction: 'vertical' | 'horizontal',
    nodeWidth: number,
    nodeHeight: number,
    paddingAmount: number,
    edgeType: EdgeType = 'step'
): string {
    if (direction === 'vertical') {
        const parentCenterX = (parent.x ?? 0) + nodeWidth / 2 + paddingAmount;
        const parentBottomY = (parent.y ?? 0) + nodeHeight + paddingAmount;
        const childCenterX = (child.x ?? 0) + nodeWidth / 2 + paddingAmount;
        const childTopY = (child.y ?? 0) + paddingAmount;

        switch (edgeType) {
            case 'straight':
                return `M ${parentCenterX} ${parentBottomY} L ${childCenterX} ${childTopY}`;
            
            case 'curved': {
                const midY = (parentBottomY + childTopY) / 2;
                return `M ${parentCenterX} ${parentBottomY} C ${parentCenterX} ${midY}, ${childCenterX} ${midY}, ${childCenterX} ${childTopY}`;
            }
            
            case 'smoothstep': {
                const midY = (parentBottomY + childTopY) / 2;
                const controlOffset = 20;
                return `M ${parentCenterX} ${parentBottomY} 
                        C ${parentCenterX} ${parentBottomY + controlOffset}, 
                          ${parentCenterX} ${midY - controlOffset}, 
                          ${parentCenterX} ${midY}
                        L ${childCenterX} ${midY}
                        C ${childCenterX} ${midY + controlOffset}, 
                          ${childCenterX} ${childTopY - controlOffset}, 
                          ${childCenterX} ${childTopY}`;
            }
            
            case 'step':
            default: {
                const midY = (parentBottomY + childTopY) / 2;
                return `M ${parentCenterX} ${parentBottomY} V ${midY} H ${childCenterX} V ${childTopY}`;
            }
        }
    } else {
        const parentRightX = (parent.x ?? 0) + nodeWidth + paddingAmount;
        const parentCenterY = (parent.y ?? 0) + nodeHeight / 2 + paddingAmount;
        const childLeftX = (child.x ?? 0) + paddingAmount;
        const childCenterY = (child.y ?? 0) + nodeHeight / 2 + paddingAmount;

        switch (edgeType) {
            case 'straight':
                return `M ${parentRightX} ${parentCenterY} L ${childLeftX} ${childCenterY}`;
            
            case 'curved': {
                const midX = (parentRightX + childLeftX) / 2;
                return `M ${parentRightX} ${parentCenterY} C ${midX} ${parentCenterY}, ${midX} ${childCenterY}, ${childLeftX} ${childCenterY}`;
            }
            
            case 'smoothstep': {
                const midX = (parentRightX + childLeftX) / 2;
                const controlOffset = 20;
                return `M ${parentRightX} ${parentCenterY} 
                        C ${parentRightX + controlOffset} ${parentCenterY}, 
                          ${midX - controlOffset} ${parentCenterY}, 
                          ${midX} ${parentCenterY}
                        L ${midX} ${childCenterY}
                        C ${midX + controlOffset} ${childCenterY}, 
                          ${childLeftX - controlOffset} ${childCenterY}, 
                          ${childLeftX} ${childCenterY}`;
            }
            
            case 'step':
            default: {
                const midX = (parentRightX + childLeftX) / 2;
                return `M ${parentRightX} ${parentCenterY} H ${midX} V ${childCenterY} H ${childLeftX}`;
            }
        }
    }
}

function flattenTree<T = any>(root: RNFlowNode<T>): RNFlowNode<T>[] {
    const nodes: RNFlowNode<T>[] = [];
    const traverse = (n: RNFlowNode<T>) => {
        nodes.push(n);
        n.children?.forEach(traverse);
    };
    traverse(root);
    return nodes;
}

// ==================== MAIN COMPONENT ====================

const RNFlow = <T,>(props: RNFlowProps<T>) => {
    // Default configurations
    const layout: Required<LayoutConfig> = {
        direction: props.layout?.direction ?? 'vertical',
        nodeWidth: props.layout?.nodeWidth ?? 120,
        nodeHeight: props.layout?.nodeHeight ?? 56,
        levelGap: props.layout?.levelGap ?? 140,
        siblingGap: props.layout?.siblingGap ?? 160,
        padding: props.layout?.padding ?? 200,
        alignment: props.layout?.alignment ?? 'center',
    };

    const zoom: Required<ZoomConfig> = {
        minZoom: props.zoom?.minZoom ?? 0.1,
        maxZoom: props.zoom?.maxZoom ?? 3,
        defaultZoom: props.zoom?.defaultZoom ?? 1,
        zoomStep: props.zoom?.zoomStep ?? 0.2,
        enablePinchZoom: props.zoom?.enablePinchZoom ?? true,
        enableZoomControls: props.zoom?.enableZoomControls ?? true,
        zoomControlsPosition: props.zoom?.zoomControlsPosition ?? 'top-right',
        animateZoom: props.zoom?.animateZoom ?? true,
        zoomAnimationDuration: props.zoom?.zoomAnimationDuration ?? 300,
    };

    const scroll: Required<ScrollConfig> = {
        enableHorizontalScroll: props.scroll?.enableHorizontalScroll ?? true,
        enableVerticalScroll: props.scroll?.enableVerticalScroll ?? true,
        showHorizontalScrollIndicator: props.scroll?.showHorizontalScrollIndicator ?? true,
        showVerticalScrollIndicator: props.scroll?.showVerticalScrollIndicator ?? true,
        scrollEventThrottle: props.scroll?.scrollEventThrottle ?? 16,
        autoCenter: props.scroll?.autoCenter ?? true,
        autoCenterDelay: props.scroll?.autoCenterDelay ?? 100,
    };

    const interaction: InteractionConfig<T> = {
        enableNodeSelection: props.interaction?.enableNodeSelection ?? true,
        enableNodeDrag: props.interaction?.enableNodeDrag ?? false,
        enableNodeHover: props.interaction?.enableNodeHover ?? false,
        multiSelect: props.interaction?.multiSelect ?? false,
        ...props.interaction,
    };

    const edgeStyle: EdgeStyle = {
        stroke: props.style?.edgeStyle?.stroke ?? '#B0B0B0',
        strokeWidth: props.style?.edgeStyle?.strokeWidth ?? 2,
        opacity: props.style?.edgeStyle?.opacity ?? 1,
        ...props.style?.edgeStyle,
    };

    // Refs and state
    const scale = useSharedValue(zoom.defaultZoom);
    const savedScale = useSharedValue(zoom.defaultZoom);
    const scrollViewRef = useRef<ScrollView>(null);
    const verticalScrollViewRef = useRef<ScrollView>(null);

    // Gestures
    const pinchGesture = Gesture.Pinch()
        .enabled(zoom.enablePinchZoom)
        .onStart(() => {
            savedScale.value = scale.value;
        })
        .onUpdate((e) => {
            const nextScale = savedScale.value * e.scale;
            scale.value = Math.min(Math.max(nextScale, zoom.minZoom), zoom.maxZoom);
        })
        .onEnd(() => {
            savedScale.value = scale.value;
            if (interaction.onZoomChange) {
                runOnJS(interaction.onZoomChange)(scale.value);
            }
        });

    const zoomIn = useCallback(() => {
        const newScale = Math.min(scale.value + zoom.zoomStep, zoom.maxZoom);
        if (zoom.animateZoom) {
            scale.value = withSpring(newScale, {
                duration: zoom.zoomAnimationDuration,
            });
        } else {
            scale.value = newScale;
        }
        savedScale.value = newScale;
        interaction.onZoomChange?.(newScale);
    }, [zoom, interaction]);

    const zoomOut = useCallback(() => {
        const newScale = Math.max(scale.value - zoom.zoomStep, zoom.minZoom);
        if (zoom.animateZoom) {
            scale.value = withSpring(newScale, {
                duration: zoom.zoomAnimationDuration,
            });
        } else {
            scale.value = newScale;
        }
        savedScale.value = newScale;
        interaction.onZoomChange?.(newScale);
    }, [zoom, interaction]);

    const resetZoom = useCallback(() => {
        if (zoom.animateZoom) {
            scale.value = withSpring(zoom.defaultZoom, {
                duration: zoom.zoomAnimationDuration,
            });
        } else {
            scale.value = zoom.defaultZoom;
        }
        savedScale.value = zoom.defaultZoom;
        interaction.onZoomChange?.(zoom.defaultZoom);
    }, [zoom, interaction]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Layout computation
    const layoutedTree = useMemo(() => {
        return layoutTree<T>(
            JSON.parse(JSON.stringify(props.data)),
            0,
            { value: 0 },
            layout
        );
    }, [props.data, layout]);

    const nodes = useMemo(
        () => flattenTree<T>(layoutedTree),
        [layoutedTree]
    );

    const bounds = useMemo(
        () => getTreeBounds<T>(nodes, layout.nodeWidth, layout.nodeHeight),
        [nodes, layout.nodeWidth, layout.nodeHeight]
    );

    const { width: screenW, height: screenH } = Dimensions.get('window');

    const contentWidth = bounds.width + layout.padding * 2;
    const contentHeight = bounds.height + layout.padding * 2;

    // Auto-center effect
    useEffect(() => {
        if (scroll.autoCenter) {
            setTimeout(() => {
                if (scrollViewRef.current && verticalScrollViewRef.current) {
                    const centerX = Math.max(0, (contentWidth - screenW) / 2);
                    const centerY = Math.max(0, (contentHeight - screenH) / 2);

                    scrollViewRef.current.scrollTo({
                        x: centerX,
                        y: 0,
                        animated: false,
                    });

                    verticalScrollViewRef.current.scrollTo({
                        x: 0,
                        y: centerY,
                        animated: false,
                    });
                }
            }, scroll.autoCenterDelay);
        }
    }, [bounds, contentWidth, contentHeight, screenW, screenH, scroll]);

    // Node press handler
    const handleNodePress = useCallback((node: RNFlowNode<T>) => {
        if (interaction.enableNodeSelection) {
            interaction.onNodePress?.(node);
        }
    }, [interaction]);

    const handleNodeLongPress = useCallback((node: RNFlowNode<T>) => {
        interaction.onNodeLongPress?.(node);
    }, [interaction]);

    // Render zoom controls
    const renderZoomControls = () => {
        if (!zoom.enableZoomControls) return null;

        if (props.render?.renderZoomControls) {
            return props.render.renderZoomControls(zoomIn, zoomOut, scale.value);
        }

        const positionStyle = getZoomControlsPosition(zoom.zoomControlsPosition);

        return (
            <View style={[styles.zoomControls, positionStyle, props.style?.zoomControlsStyle]}>
                <TouchableOpacity
                    onPress={zoomIn}
                    style={styles.zoomIconBtn}
                    activeOpacity={0.7}
                >
                    <Feather name="zoom-in" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={zoomOut}
                    style={styles.zoomIconBtn}
                    activeOpacity={0.7}
                >
                    <Feather name="zoom-out" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={resetZoom}
                    style={styles.zoomIconBtn}
                    activeOpacity={0.7}
                >
                    <Feather name="maximize" size={18} color="#000" />
                </TouchableOpacity>
            </View>
        );
    };

    // Render edges
    const renderEdges = () => {
        return nodes.map(node =>
            node.children?.map(child => {
                const path = getEdgePath<T>(
                    node,
                    child,
                    layout.direction,
                    layout.nodeWidth,
                    layout.nodeHeight,
                    layout.padding,
                    props.edgeType
                );

                if (props.render?.renderEdge) {
                    return (
                        <G key={`${node.id}-${child.id}`}>
                            {props.render.renderEdge(node, child, { path, style: edgeStyle })}
                        </G>
                    );
                }

                return (
                    <Path
                        key={`${node.id}-${child.id}`}
                        d={path}
                        stroke={edgeStyle.stroke}
                        strokeWidth={edgeStyle.strokeWidth}
                        strokeDasharray={edgeStyle.strokeDasharray}
                        opacity={edgeStyle.opacity}
                        fill="none"
                        onPress={() => interaction.onEdgePress?.(node, child)}
                    />
                );
            })
        );
    };

    // Render nodes
    const renderNodes = () => {
        return nodes.map((node) => {
            const isSelected = props.selectedNodeIds?.includes(node.id) ?? false;

            const nodeStyle = isSelected
                ? { ...props.style?.nodeStyle, ...props.style?.selectedNodeStyle }
                : props.style?.nodeStyle;

            let content: React.ReactNode;

            if (props.render?.renderNode) {
                content = props.render.renderNode(node, {
                    isSelected,
                    isHovered: false,
                    onPress: () => handleNodePress(node),
                    onLongPress: () => handleNodeLongPress(node),
                    dimensions: { width: layout.nodeWidth, height: layout.nodeHeight },
                });
            } else {
                content = (
                    <DefaultNode<T>
                        node={node}
                        width={layout.nodeWidth}
                        height={layout.nodeHeight}
                        onPress={handleNodePress}
                        onLongPress={handleNodeLongPress}
                        style={nodeStyle}
                        isSelected={isSelected}
                    />
                );
            }

            return (
                <View
                    key={node.id}
                    style={[
                        styles.nodeWrapper,
                        {
                            width: layout.nodeWidth,
                            height: layout.nodeHeight,
                            left: (node.x ?? 0) + layout.padding,
                            top: (node.y ?? 0) + layout.padding,
                        },
                    ]}
                >
                    {content}
                </View>
            );
        });
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        props.style?.backgroundColor ?? '#F5F5F5',
                },
                props.style?.containerStyle,
            ]}
        >
            <ScrollView
                ref={scrollViewRef}
                horizontal={scroll.enableHorizontalScroll}
                showsHorizontalScrollIndicator={scroll.showHorizontalScrollIndicator}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={scroll.scrollEventThrottle}
                style={styles.scrollView}
                onScroll={(e) => {
                    const x = e.nativeEvent.contentOffset.x;
                    const y = e.nativeEvent.contentOffset.y;
                    interaction.onScrollChange?.(x, y);
                }}
            >
                <ScrollView
                    ref={verticalScrollViewRef}
                    showsVerticalScrollIndicator={scroll.showVerticalScrollIndicator}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={scroll.enableVerticalScroll}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={scroll.scrollEventThrottle}
                >
                    <GestureDetector gesture={pinchGesture}>
                        <Animated.View
                            style={[
                                {
                                    width: contentWidth,
                                    height: contentHeight,
                                    position: 'relative',
                                },
                                props.style?.canvasStyle,
                                animatedStyle,
                            ]}
                        >
                            {/* EDGES */}
                            <Svg
                                width={contentWidth}
                                height={contentHeight}
                                style={StyleSheet.absoluteFill}
                                pointerEvents={interaction.onEdgePress ? 'auto' : 'none'}
                            >
                                {renderEdges()}
                            </Svg>

                            {/* NODES */}
                            {renderNodes()}
                        </Animated.View>
                    </GestureDetector>
                </ScrollView>
            </ScrollView>

            {/* ZOOM CONTROLS */}
            {renderZoomControls()}

            {/* MINI MAP */}
            {props.render?.renderMiniMap && props.render.renderMiniMap()}

            {/* DEBUG INFO */}
            {props.debug && (
                <View style={styles.debugInfo}>
                    <Text style={styles.debugText}>Nodes: {nodes.length}</Text>
                    <Text style={styles.debugText}>Zoom: {scale.value.toFixed(2)}</Text>
                    <Text style={styles.debugText}>
                        Size: {contentWidth.toFixed(0)}x{contentHeight.toFixed(0)}
                    </Text>
                </View>
            )}
        </View>
    );
};

// ==================== DEFAULT NODE ====================

type DefaultNodeProps<T> = {
    node: RNFlowNode<T>;
    width: number;
    height: number;
    onPress?: (node: RNFlowNode<T>) => void;
    onLongPress?: (node: RNFlowNode<T>) => void;
    style?: NodeStyle;
    isSelected?: boolean;
};

const DefaultNode = <T,>({
    node,
    width,
    height,
    onPress,
    onLongPress,
    style,
    isSelected,
}: DefaultNodeProps<T>) => {
    const nodeStyle: ViewStyle = {
        width,
        height,
        backgroundColor: style?.backgroundColor ?? '#FFFFFF',
        borderRadius: style?.borderRadius ?? 10,
        borderColor: isSelected ? '#007AFF' : (style?.borderColor ?? 'transparent'),
        borderWidth: isSelected ? 2 : (style?.borderWidth ?? 0),
        elevation: style?.elevation ?? 5,
        shadowColor: style?.shadowColor ?? '#000',
        shadowOpacity: style?.shadowOpacity ?? 0.15,
        shadowRadius: style?.shadowRadius ?? 6,
        shadowOffset: style?.shadowOffset ?? { width: 0, height: 3 },
    };

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPress?.(node)}
            onLongPress={() => onLongPress?.(node)}
            style={[styles.node, nodeStyle]}
        >
            <Text style={styles.nodeText} numberOfLines={2}>
                {String((node.data as any)?.title ?? node.id)}
            </Text>
        </TouchableOpacity>
    );
};

// ==================== UTILITIES ====================

function getZoomControlsPosition(
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
): ViewStyle {
    const base: ViewStyle = {
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        gap: 12,
    };

    switch (position) {
        case 'top-left':
            return { ...base, top: 12, left: 12 };
        case 'top-right':
            return { ...base, top: 12, right: 12 };
        case 'bottom-left':
            return { ...base, bottom: 12, left: 12 };
        case 'bottom-right':
            return { ...base, bottom: 12, right: 12 };
    }
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
    nodeWrapper: {
        position: 'absolute',
    },
    node: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    nodeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    zoomControls: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    zoomIconBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    debugInfo: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderRadius: 4,
    },
    debugText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'monospace',
    },
});

export default RNFlow;