import { StyleSheet } from "react-native";

export const advancedStyles = StyleSheet.create({
    // Family Tree Styles
    familyNode: {
        borderRadius: 12,
        borderWidth: 3,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    familyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    familyName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#212121',
        textAlign: 'center',
        marginBottom: 4,
    },
    familyYear: {
        fontSize: 11,
        color: '#757575',
    },
    deceasedBadge: {
        fontSize: 16,
        color: '#757575',
        marginTop: 4,
    },

    // Roadmap Styles
    roadmapNode: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderLeftWidth: 4,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    roadmapHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    roadmapTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#212121',
        flex: 1,
    },
    priorityBadge: {
        fontSize: 16,
    },
    roadmapDate: {
        fontSize: 11,
        color: '#757575',
        marginBottom: 4,
    },
    roadmapTeam: {
        fontSize: 11,
        color: '#9E9E9E',
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },

    // Knowledge Graph Styles
    conceptNode: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 2,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    conceptIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    conceptText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#212121',
        textAlign: 'center',
        marginBottom: 8,
    },
    categoryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    categoryText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#FFF',
        textTransform: 'uppercase',
    },

    // Network Diagram Styles
    networkNode: {
        backgroundColor: '#37474F',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#546E7A',
    },
    networkHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    networkName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ECEFF1',
        marginBottom: 4,
    },
    networkIP: {
        fontSize: 11,
        color: '#90A4AE',
        fontFamily: 'monospace',
        marginBottom: 4,
    },
    networkConnections: {
        fontSize: 10,
        color: '#78909C',
    },

    // Shopping Category Styles
    categoryNode: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    discountBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#F44336',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 10,
    },
    discountText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },
    categoryIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#212121',
        textAlign: 'center',
        marginBottom: 4,
    },
    itemCount: {
        fontSize: 11,
        color: '#9E9E9E',
    },

    // Custom Zoom Controls
    customZoomControls: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 25,
        padding: 8,
        alignItems: 'center',
        gap: 12,
    },
    zoomButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    zoomDisplay: {
        paddingHorizontal: 12,
    },
    zoomText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },

    // Multi-Select Action Bar
    actionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#2196F3',
        gap: 12,
    },
    selectionCount: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2196F3',
    },
});