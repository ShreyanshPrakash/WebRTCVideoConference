import React, { useState, useEffect } from 'react';


function useGetUserMedia(mediaConstraints, stopOnNavigate){

    const [userMediaStream, setUserMediaStream] = useState("");

    // need to handle permission denied and other cases.
    useEffect( () => {
        if( !userMediaStream ){
            window.navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then( stream => {
                setUserMediaStream(stream);
            })
        }

        return () => {
            if( userMediaStream && stopOnNavigate){
                userMediaStream.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
        }
    }, [userMediaStream])

    return userMediaStream;

}

export {
    useGetUserMedia,
}