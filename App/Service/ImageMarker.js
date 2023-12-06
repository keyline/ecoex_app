import Marker, { Position, TextBackgroundStyle,TextBackgroundType } from 'react-native-image-marker';


export const ImageMarker = async (uri, lat, lng) => {
    try {
        let response = await Marker.markText({
            backgroundImage: {
                src: { uri: uri },
                scale: 1
            },
            watermarkTexts: [{
                text: `Latitude:${lat} \nLongtitude:${lng}`,
                positionOptions: {
                    position: Position.bottomLeft,
                },
                style: {
                    color: '#000000',
                    fontSize: 4,
                    fontName: 'Arial',
                    shadowStyle: {
                        dx: 10,
                        dy: 10,
                        radius: 10,
                        color: '#008F6D',
                    },
                    textBackgroundStyle: {
                        padding: '1% 1%',
                        type: TextBackgroundType.none,
                        // color: '#0FFF00',
                    },
                },
            }],
            scale: 1,
            quality: 100,
        })
        return response;
    } catch (error) {
        if (__DEV__) {
            console.log(error)
        }
        return error;
    }
}