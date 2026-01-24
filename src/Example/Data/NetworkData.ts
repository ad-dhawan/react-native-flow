import { RNFlowNode } from "../../RNFlowTypes";

export interface NetworkNode {
    name: string;
    type: 'server' | 'database' | 'service' | 'client';
    status: 'online' | 'offline' | 'warning';
    ip?: string;
    connections?: number;
}

export const networkData: RNFlowNode<NetworkNode> = {
    id: 'load-balancer',
    data: {
        name: 'Load Balancer',
        type: 'server',
        status: 'online',
        ip: '10.0.0.1',
        connections: 1250,
    },
    children: [
        {
            id: 'web-server-1',
            data: {
                name: 'Web Server 1',
                type: 'server',
                status: 'online',
                ip: '10.0.1.10',
                connections: 420,
            },
            children: [
                {
                    id: 'api-service',
                    data: {
                        name: 'API Service',
                        type: 'service',
                        status: 'online',
                        ip: '10.0.2.20',
                    },
                },
                {
                    id: 'cache',
                    data: {
                        name: 'Redis Cache',
                        type: 'database',
                        status: 'online',
                        ip: '10.0.2.30',
                    },
                },
            ],
        },
        {
            id: 'web-server-2',
            data: {
                name: 'Web Server 2',
                type: 'server',
                status: 'warning',
                ip: '10.0.1.11',
                connections: 830,
            },
            children: [
                {
                    id: 'database',
                    data: {
                        name: 'PostgreSQL',
                        type: 'database',
                        status: 'online',
                        ip: '10.0.3.10',
                    },
                },
            ],
        },
    ],
};