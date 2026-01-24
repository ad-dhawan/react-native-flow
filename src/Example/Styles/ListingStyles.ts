import { StyleSheet } from "react-native";

export const listingStyles = StyleSheet.create({
    // Container Styles
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    // Header Styles (when viewing example)
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    backIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 60,
    },

    // Content Styles
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    // Title Section
    titleSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#212121',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '400',
    },

    // Scroll View
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    // Category Styles
    categoryContainer: {
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    categoryHeaderLeft: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 4,
    },
    categoryDescription: {
        fontSize: 13,
        color: '#757575',
        fontWeight: '400',
    },
    expandIcon: {
        fontSize: 14,
        color: '#757575',
        marginLeft: 12,
    },

    // Examples Container
    examplesContainer: {
        backgroundColor: '#FFFFFF',
    },

    // Example Item Styles
    exampleItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    exampleItemLast: {
        borderBottomWidth: 0,
    },
    exampleItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    exampleItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#424242',
        flex: 1,
    },
    exampleItemArrow: {
        fontSize: 18,
        color: '#2196F3',
        fontWeight: '600',
    },

    // Footer
    footer: {
        marginTop: 24,
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        color: '#9E9E9E',
        textAlign: 'center',
    },
});