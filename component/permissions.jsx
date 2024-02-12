import {
    Button,
    PermissionsAndroid,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const request_record_audio_permission_android = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Record Audio Permission',
                message: 'App needs access to your microphone to record audio',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can record audio');
        } else {
            console.log('Record audio permission denied');
        }
    } catch (error) {
        console.warn('Error with playback', error);
    }
}

export default permissions;