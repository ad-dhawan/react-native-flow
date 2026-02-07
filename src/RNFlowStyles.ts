import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },

    nodeWrapper: {
        position: 'absolute',
    },
    node: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    nodeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },

    zoomControls: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    zoomIconBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    
    debugInfo: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderRadius: 4,
    },
    debugText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'monospace',
    },
});