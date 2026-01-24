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
import { styles } from './RNFlowStyles'
import { DefaultNodeProps, EdgeStyle, InteractionConfig, LayoutConfig, RNFlowNode, RNFlowProps, ScrollConfig, ZoomConfig } from './RNFlowTypes';
import { flattenTree, getEdgePath, getTreeBounds, getZoomControlsPosition, layoutTree } from './RNFlowFunctions';

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



export default RNFlow;