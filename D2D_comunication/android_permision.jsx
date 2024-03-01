import { PermissionsAndroid } from 'react-native';
import {
    initialize,
    startDiscoveringPeers,
    stopDiscoveringPeers,
    subscribeOnConnectionInfoUpdates,
    subscribeOnThisDeviceChanged,
    subscribeOnPeersUpdates,
    connect,
    cancelConnect,
    createGroup,
    removeGroup,
    getAvailablePeers,
    sendFile,
    receiveFile,
    getConnectionInfo,
    getGroupInfo,
    receiveMessage,
    sendMessage,
} from 'react-native-wifi-p2p';

PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
        'title': 'Access to read',
        'message': 'READ_EXTERNAL_STORAGE'
    }
)
    .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the storage")
        } else {
            console.log("Storage permission denied")
        }
    })
    .then(() => {
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Access to write',
                'message': 'WRITE_EXTERNAL_STORAGE'
            }
        )
    })
    // .then(() => {
    //     return receiveFile('/storage/emulated/0/Music/', 'BFMV:Letting You Go.mp3')
    //         .then(() => console.log('File received successfully'))
    //         .catch(err => console.log('Error while file receiving', err))
    // })
    .then(() => {
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
                'title': 'Access to wi-fi P2P mode',
                'message': 'ACCESS_COARSE_LOCATION'
            }
        )
            .then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the p2p mode")
                } else {
                    console.log("Permission denied: p2p mode will not work")
                }
            })
    })
    .catch(err => console.log(err));

    