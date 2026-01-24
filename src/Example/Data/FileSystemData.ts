import { RNFlowNode } from "../../RNFlowTypes";

export interface FileSystemNode {
    name: string;
    type: 'folder' | 'file';
    size?: string;
    modified?: string;
}

export const fileSystemData: RNFlowNode<FileSystemNode> = {
    id: 'root',
    data: {
        name: 'My Project',
        type: 'folder',
    },
    children: [
        {
            id: 'src',
            data: {
                name: 'src',
                type: 'folder',
            },
            children: [
                {
                    id: 'components',
                    data: {
                        name: 'components',
                        type: 'folder',
                    },
                    children: [
                        {
                            id: 'button.tsx',
                            data: {
                                name: 'Button.tsx',
                                type: 'file',
                                size: '2.4 KB',
                            },
                        },
                        {
                            id: 'input.tsx',
                            data: {
                                name: 'Input.tsx',
                                type: 'file',
                                size: '3.1 KB',
                            },
                        },
                    ],
                },
                {
                    id: 'utils',
                    data: {
                        name: 'utils',
                        type: 'folder',
                    },
                    children: [
                        {
                            id: 'helpers.ts',
                            data: {
                                name: 'helpers.ts',
                                type: 'file',
                                size: '1.8 KB',
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 'public',
            data: {
                name: 'public',
                type: 'folder',
            },
            children: [
                {
                    id: 'index.html',
                    data: {
                        name: 'index.html',
                        type: 'file',
                        size: '0.5 KB',
                    },
                },
            ],
        },
        {
            id: 'package.json',
            data: {
                name: 'package.json',
                type: 'file',
                size: '1.2 KB',
            },
        },
    ],
};