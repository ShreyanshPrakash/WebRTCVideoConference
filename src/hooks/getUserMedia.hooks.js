import React, { useState, useEffect } from 'react';


function useGetUserMedia(mediaConstraints){

    const [userMediaStream, setUserMediaStream] = useState("");

    // need to handle permission denied and other cases.
    useEffect( () => {
        window.navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then( stream => {
                setUserMediaStream(stream);
            })
    }, [])

    return userMediaStream;

}

export {
    useGetUserMedia,
}