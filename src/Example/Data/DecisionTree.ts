import { RNFlowNode } from "../../RNFlowTypes";

export interface Decision {
    question: string;
    answer?: string;
    isEndNode?: boolean;
}

export const decisionTreeData: RNFlowNode<Decision> = {
    id: 'start',
    data: {
        question: 'Do you like programming?',
    },
    children: [
        {
            id: 'yes-programming',
            data: {
                question: 'Do you prefer frontend or backend?',
                answer: 'Yes',
            },
            children: [
                {
                    id: 'frontend',
                    data: {
                        question: 'Learn React Native!',
                        answer: 'Frontend',
                        isEndNode: true,
                    },
                },
                {
                    id: 'backend',
                    data: {
                        question: 'Learn Node.js!',
                        answer: 'Backend',
                        isEndNode: true,
                    },
                },
            ],
        },
        {
            id: 'no-programming',
            data: {
                question: 'Do you like design?',
                answer: 'No',
            },
            children: [
                {
                    id: 'yes-design',
                    data: {
                        question: 'Learn Figma!',
                        answer: 'Yes',
                        isEndNode: true,
                    },
                },
                {
                    id: 'no-design',
                    data: {
                        question: 'Explore more options!',
                        answer: 'No',
                        isEndNode: true,
                    },
                },
            ],
        },
    ],
};