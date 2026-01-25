import { RNFlowNode } from "../../RNFlowTypes";
export interface Concept {
    concept: string;
    category: 'core' | 'feature' | 'tool' | 'skill';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    icon: string;
}
export declare const knowledgeGraphData: RNFlowNode<Concept>;
//# sourceMappingURL=KnowledgeGraphData.d.ts.map