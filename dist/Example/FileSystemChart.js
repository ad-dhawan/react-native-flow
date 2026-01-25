"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemExample = FileSystemExample;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RNFlow_1 = __importDefault(require("../RNFlow"));
const FileSystemData_1 = require("./Data/FileSystemData");
const ExampleStyles_1 = require("./Styles//ExampleStyles");
function FileSystemExample() {
    return (<RNFlow_1.default data={FileSystemData_1.fileSystemData} layout={{
            direction: 'horizontal',
            nodeWidth: 160,
            nodeHeight: 80,
            levelGap: 180,
            siblingGap: 100,
        }} edgeType="step" render={{
            renderNode: (node, { onPress, dimensions }) => (<react_native_1.TouchableOpacity onPress={onPress} style={[
                    ExampleStyles_1.exampleStyles.fileNode,
                    {
                        width: dimensions.width,
                        height: dimensions.height,
                        backgroundColor: node.data.type === 'folder' ? '#FFF3E0' : '#E8F5E9',
                    },
                ]}>
                        <react_native_1.Text style={ExampleStyles_1.exampleStyles.fileIcon}>
                            {node.data.type === 'folder' ? '📁' : '📄'}
                        </react_native_1.Text>
                        <react_native_1.Text style={ExampleStyles_1.exampleStyles.fileName} numberOfLines={1}>
                            {node.data.name}
                        </react_native_1.Text>
                        {node.data.size && (<react_native_1.Text style={ExampleStyles_1.exampleStyles.fileSize}>{node.data.size}</react_native_1.Text>)}
                    </react_native_1.TouchableOpacity>),
        }} style={{
            edgeStyle: {
                stroke: '#9E9E9E',
                strokeWidth: 1.5,
            },
        }}/>);
}
