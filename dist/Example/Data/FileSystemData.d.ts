import { RNFlowNode } from "../../RNFlowTypes";
export interface FileSystemNode {
    name: string;
    type: 'folder' | 'file';
    size?: string;
    modified?: string;
}
export declare const fileSystemData: RNFlowNode<FileSystemNode>;
//# sourceMappingURL=FileSystemData.d.ts.map