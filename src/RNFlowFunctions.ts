import { ViewStyle } from "react-native";
import { EdgeType, LayoutConfig, RNFlowNode } from "./RNFlowTypes";

export function layoutTree<T = any>(
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

export function getTreeBounds<T = any>(
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

export function getEdgePath<T = any>(
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

export function flattenTree<T = any>(root: RNFlowNode<T>): RNFlowNode<T>[] {
    const nodes: RNFlowNode<T>[] = [];
    const traverse = (n: RNFlowNode<T>) => {
        nodes.push(n);
        n.children?.forEach(traverse);
    };
    traverse(root);
    return nodes;
}

export function getZoomControlsPosition(
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