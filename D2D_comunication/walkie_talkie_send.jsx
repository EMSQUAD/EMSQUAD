import { } from 'react-native-wifi-p2p';

const send_walkie_talkie = async () => {
    try {
        // First we must initialize the wifi p2p module
        await initialize()
            .then((isInitializedSuccessfully) => console.log('isInitializedSuccessfully: ', isInitializedSuccessfully))
            .catch((err) => console.log('initialization was failed. Err: ', err));
        // Then we can start discovering peers
        startDiscoveringPeers()
            .then(status => console.log('startDiscoveringPeers status: ', status))
            .catch(err => console.error('startDiscoveringPeers failed. Err: ', err));

        sendFile('path/to/file')
            .then((metaInfo) => console.log('File sent successfully:', metaInfo))
            .catch(err => console.log('Error while file sending', err));
}
    catch (err) {
    console.log(err);
}
};