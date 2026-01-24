import { StyleSheet } from "react-native";

export const exampleStyles = StyleSheet.create({
    // Organization Chart Styles
    orgNode: {
        borderRadius: 12,
        borderWidth: 2,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    orgNodeHeader: {
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        width: '100%',
        alignItems: 'center',
    },
    orgTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976D2',
    },
    orgName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    orgDepartment: {
        fontSize: 12,
        color: '#757575',
    },

    // File System Styles
    fileNode: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    fileIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    fileName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#424242',
        textAlign: 'center',
    },
    fileSize: {
        fontSize: 11,
        color: '#9E9E9E',
        marginTop: 4,
    },

    // Decision Tree Styles
    decisionNode: {
        borderRadius: 12,
        borderWidth: 2,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    answerBadge: {
        position: 'absolute',
        top: -10,
        backgroundColor: '#FF9800',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    answerText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    questionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#212121',
        textAlign: 'center',
    },
});