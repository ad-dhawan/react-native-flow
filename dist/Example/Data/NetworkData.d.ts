import { RNFlowNode } from "../../RNFlowTypes";
export interface NetworkNode {
    name: string;
    type: 'server' | 'database' | 'service' | 'client';
    status: 'online' | 'offline' | 'warning';
    ip?: string;
    connections?: number;
}
export declare const networkData: RNFlowNode<NetworkNode>;
//# sourceMappingURL=NetworkData.d.ts.map