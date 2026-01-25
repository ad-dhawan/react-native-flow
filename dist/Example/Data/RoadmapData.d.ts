import { RNFlowNode } from "../../RNFlowTypes";
export interface Milestone {
    title: string;
    status: 'completed' | 'in-progress' | 'pending';
    date: string;
    team: string;
    priority: 'high' | 'medium' | 'low';
}
export declare const roadmapData: RNFlowNode<Milestone>;
//# sourceMappingURL=RoadmapData.d.ts.map