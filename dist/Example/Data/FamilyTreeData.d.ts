import { RNFlowNode } from "../../RNFlowTypes";
export interface FamilyMember {
    name: string;
    birthYear: number;
    gender: 'male' | 'female';
    isAlive: boolean;
    photo?: string;
}
export declare const familyTreeData: RNFlowNode<FamilyMember>;
//# sourceMappingURL=FamilyTreeData.d.ts.map