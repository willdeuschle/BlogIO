import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    listRow: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    emptyRow: {
        marginTop: 10,
    },
    articleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: 4,
        height: 40,
        width: 40,
        borderRadius: 40/2,
    },
    title: {
        marginLeft: 4,
        marginRight: 4,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default Styles
