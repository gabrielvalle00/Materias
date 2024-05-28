import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStartCamera: {
        flex: 1,
        width: '100%'
    },
    containerPrincipalCameraView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    containerSecundarioCameraView: {
        position: 'absolute',
        left: '5%', top: '10%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    containerPrincipalTakePicture: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    containerTakePicture: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
    },
    buttonIniciarCamera: {
        width: 130,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    buttonTakeCapture: {
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    // camera: {
    //     flex: 1,
    // },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    buttonFlash: {
        // backgroundColor: flashMode === 'off' ? '#000' : '#fff',
        borderRadius: 50,
        height: 25,
        width: 25
    },
    buttonAlternarCamera: {
        marginTop: 20,
        borderRadius: 50,
        height: 25,
        width: 25
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    textButtonIniciarCamera: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});