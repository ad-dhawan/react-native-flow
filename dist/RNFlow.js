"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Feather_1 = __importDefault(require("react-native-vector-icons/Feather"));
const RNFlowStyles_1 = require("./RNFlowStyles");
const RNFlowFunctions_1 = require("./RNFlowFunctions");
const RNFlow = (props) => {
    const layout = {
        direction: props.layout?.direction ?? 'vertical',
        nodeWidth: props.layout?.nodeWidth ?? 120,
        nodeHeight: props.layout?.nodeHeight ?? 56,
        levelGap: props.layout?.levelGap ?? 140,
        siblingGap: props.layout?.siblingGap ?? 160,
        padding: props.layout?.padding ?? 200,
        alignment: props.layout?.alignment ?? 'center',
    };
    const zoom = {
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
    const scroll = {
        enableHorizontalScroll: props.scroll?.enableHorizontalScroll ?? true,
        enableVerticalScroll: props.scroll?.enableVerticalScroll ?? true,
        showHorizontalScrollIndicator: props.scroll?.showHorizontalScrollIndicator ?? true,
        showVerticalScrollIndicator: props.scroll?.showVerticalScrollIndicator ?? true,
        scrollEventThrottle: props.scroll?.scrollEventThrottle ?? 16,
        autoCenter: props.scroll?.autoCenter ?? true,
        autoCenterDelay: props.scroll?.autoCenterDelay ?? 100,
    };
    const interaction = {
        enableNodeSelection: props.interaction?.enableNodeSelection ?? true,
        enableNodeDrag: props.interaction?.enableNodeDrag ?? false,
        enableNodeHover: props.interaction?.enableNodeHover ?? false,
        multiSelect: props.interaction?.multiSelect ?? false,
        ...props.interaction,
    };
    const edgeStyle = {
        stroke: props.style?.edgeStyle?.stroke ?? '#B0B0B0',
        strokeWidth: props.style?.edgeStyle?.strokeWidth ?? 2,
        opacity: props.style?.edgeStyle?.opacity ?? 1,
        ...props.style?.edgeStyle,
    };
    const scale = (0, react_native_reanimated_1.useSharedValue)(zoom.defaultZoom);
    const savedScale = (0, react_native_reanimated_1.useSharedValue)(zoom.defaultZoom);
    const scrollViewRef = (0, react_1.useRef)(null);
    const verticalScrollViewRef = (0, react_1.useRef)(null);
    const pinchGesture = react_native_gesture_handler_1.Gesture.Pinch()
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
            (0, react_native_reanimated_1.runOnJS)(interaction.onZoomChange)(scale.value);
        }
    });
    const zoomIn = (0, react_1.useCallback)(() => {
        const newScale = Math.min(scale.value + zoom.zoomStep, zoom.maxZoom);
        if (zoom.animateZoom) {
            scale.value = (0, react_native_reanimated_1.withSpring)(newScale, {
                duration: zoom.zoomAnimationDuration,
            });
        }
        else {
            scale.value = newScale;
        }
        savedScale.value = newScale;
        interaction.onZoomChange?.(newScale);
    }, [zoom, interaction]);
    const zoomOut = (0, react_1.useCallback)(() => {
        const newScale = Math.max(scale.value - zoom.zoomStep, zoom.minZoom);
        if (zoom.animateZoom) {
            scale.value = (0, react_native_reanimated_1.withSpring)(newScale, {
                duration: zoom.zoomAnimationDuration,
            });
        }
        else {
            scale.value = newScale;
        }
        savedScale.value = newScale;
        interaction.onZoomChange?.(newScale);
    }, [zoom, interaction]);
    const resetZoom = (0, react_1.useCallback)(() => {
        if (zoom.animateZoom) {
            scale.value = (0, react_native_reanimated_1.withSpring)(zoom.defaultZoom, {
                duration: zoom.zoomAnimationDuration,
            });
        }
        else {
            scale.value = zoom.defaultZoom;
        }
        savedScale.value = zoom.defaultZoom;
        interaction.onZoomChange?.(zoom.defaultZoom);
    }, [zoom, interaction]);
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ scale: scale.value }],
    }));
    const layoutedTree = (0, react_1.useMemo)(() => {
        return (0, RNFlowFunctions_1.layoutTree)(JSON.parse(JSON.stringify(props.data)), 0, { value: 0 }, layout);
    }, [props.data, layout]);
    const nodes = (0, react_1.useMemo)(() => (0, RNFlowFunctions_1.flattenTree)(layoutedTree), [layoutedTree]);
    const bounds = (0, react_1.useMemo)(() => (0, RNFlowFunctions_1.getTreeBounds)(nodes, layout.nodeWidth, layout.nodeHeight), [nodes, layout.nodeWidth, layout.nodeHeight]);
    const { width: screenW, height: screenH } = react_native_1.Dimensions.get('window');
    const contentWidth = bounds.width + layout.padding * 2;
    const contentHeight = bounds.height + layout.padding * 2;
    (0, react_1.useEffect)(() => {
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
    const handleNodePress = (0, react_1.useCallback)((node) => {
        if (interaction.enableNodeSelection) {
            interaction.onNodePress?.(node);
        }
    }, [interaction]);
    const handleNodeLongPress = (0, react_1.useCallback)((node) => {
        interaction.onNodeLongPress?.(node);
    }, [interaction]);
    const renderZoomControls = () => {
        if (!zoom.enableZoomControls)
            return null;
        if (props.render?.renderZoomControls) {
            return props.render.renderZoomControls(zoomIn, zoomOut, scale.value);
        }
        const positionStyle = (0, RNFlowFunctions_1.getZoomControlsPosition)(zoom.zoomControlsPosition);
        return (<react_native_1.View style={[RNFlowStyles_1.styles.zoomControls, positionStyle, props.style?.zoomControlsStyle]}>
                <react_native_1.TouchableOpacity onPress={zoomIn} style={RNFlowStyles_1.styles.zoomIconBtn} activeOpacity={0.7}>
                    <Feather_1.default name="zoom-in" size={20} color="#000"/>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={zoomOut} style={RNFlowStyles_1.styles.zoomIconBtn} activeOpacity={0.7}>
                    <Feather_1.default name="zoom-out" size={20} color="#000"/>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={resetZoom} style={RNFlowStyles_1.styles.zoomIconBtn} activeOpacity={0.7}>
                    <Feather_1.default name="maximize" size={18} color="#000"/>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>);
    };
    const renderEdges = () => {
        return nodes.map(node => node.children?.map(child => {
            const path = (0, RNFlowFunctions_1.getEdgePath)(node, child, layout.direction, layout.nodeWidth, layout.nodeHeight, layout.padding, props.edgeType);
            if (props.render?.renderEdge) {
                return (<react_native_svg_1.G key={`${node.id}-${child.id}`}>
                            {props.render.renderEdge(node, child, { path, style: edgeStyle })}
                        </react_native_svg_1.G>);
            }
            return (<react_native_svg_1.Path key={`${node.id}-${child.id}`} d={path} stroke={edgeStyle.stroke} strokeWidth={edgeStyle.strokeWidth} strokeDasharray={edgeStyle.strokeDasharray} opacity={edgeStyle.opacity} fill="none" onPress={() => interaction.onEdgePress?.(node, child)}/>);
        }));
    };
    const renderNodes = () => {
        return nodes.map((node) => {
            const isSelected = props.selectedNodeIds?.includes(node.id) ?? false;
            const nodeStyle = isSelected
                ? { ...props.style?.nodeStyle, ...props.style?.selectedNodeStyle }
                : props.style?.nodeStyle;
            let content;
            if (props.render?.renderNode) {
                content = props.render.renderNode(node, {
                    isSelected,
                    isHovered: false,
                    onPress: () => handleNodePress(node),
                    onLongPress: () => handleNodeLongPress(node),
                    dimensions: { width: layout.nodeWidth, height: layout.nodeHeight },
                });
            }
            else {
                content = (<DefaultNode node={node} width={layout.nodeWidth} height={layout.nodeHeight} onPress={handleNodePress} onLongPress={handleNodeLongPress} style={nodeStyle} isSelected={isSelected}/>);
            }
            return (<react_native_1.View key={node.id} style={[
                    RNFlowStyles_1.styles.nodeWrapper,
                    {
                        width: layout.nodeWidth,
                        height: layout.nodeHeight,
                        left: (node.x ?? 0) + layout.padding,
                        top: (node.y ?? 0) + layout.padding,
                    },
                ]}>
                    {content}
                </react_native_1.View>);
        });
    };
    return (<react_native_1.View style={[
            RNFlowStyles_1.styles.container,
            {
                backgroundColor: props.style?.backgroundColor ?? '#F5F5F5',
            },
            props.style?.containerStyle,
        ]}>
            <react_native_1.ScrollView ref={scrollViewRef} horizontal={scroll.enableHorizontalScroll} showsHorizontalScrollIndicator={scroll.showHorizontalScrollIndicator} showsVerticalScrollIndicator={false} scrollEventThrottle={scroll.scrollEventThrottle} style={RNFlowStyles_1.styles.scrollView} onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            const y = e.nativeEvent.contentOffset.y;
            interaction.onScrollChange?.(x, y);
        }}>
                <react_native_1.ScrollView ref={verticalScrollViewRef} showsVerticalScrollIndicator={scroll.showVerticalScrollIndicator} showsHorizontalScrollIndicator={false} scrollEnabled={scroll.enableVerticalScroll} nestedScrollEnabled={true} scrollEventThrottle={scroll.scrollEventThrottle}>
                    <react_native_gesture_handler_1.GestureDetector gesture={pinchGesture}>
                        <react_native_reanimated_1.default.View style={[
            {
                width: contentWidth,
                height: contentHeight,
                position: 'relative',
            },
            props.style?.canvasStyle,
            animatedStyle,
        ]}>
                            
                            <react_native_svg_1.default width={contentWidth} height={contentHeight} style={react_native_1.StyleSheet.absoluteFill} pointerEvents={interaction.onEdgePress ? 'auto' : 'none'}>
                                {renderEdges()}
                            </react_native_svg_1.default>

                            
                            {renderNodes()}
                        </react_native_reanimated_1.default.View>
                    </react_native_gesture_handler_1.GestureDetector>
                </react_native_1.ScrollView>
            </react_native_1.ScrollView>

            
            {renderZoomControls()}

            
            {props.render?.renderMiniMap && props.render.renderMiniMap()}

            
            {props.debug && (<react_native_1.View style={RNFlowStyles_1.styles.debugInfo}>
                    <react_native_1.Text style={RNFlowStyles_1.styles.debugText}>Nodes: {nodes.length}</react_native_1.Text>
                    <react_native_1.Text style={RNFlowStyles_1.styles.debugText}>Zoom: {scale.value.toFixed(2)}</react_native_1.Text>
                    <react_native_1.Text style={RNFlowStyles_1.styles.debugText}>
                        Size: {contentWidth.toFixed(0)}x{contentHeight.toFixed(0)}
                    </react_native_1.Text>
                </react_native_1.View>)}
        </react_native_1.View>);
};
const DefaultNode = ({ node, width, height, onPress, onLongPress, style, isSelected, }) => {
    const nodeStyle = {
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
    return (<react_native_1.TouchableOpacity activeOpacity={0.85} onPress={() => onPress?.(node)} onLongPress={() => onLongPress?.(node)} style={[RNFlowStyles_1.styles.node, nodeStyle]}>
            <react_native_1.Text style={RNFlowStyles_1.styles.nodeText} numberOfLines={2}>
                {String(node.data?.title ?? node.id)}
            </react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
exports.default = RNFlow;
