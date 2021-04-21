// src/DisplayMapClass.js
import { Select } from "antd";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { actionSetFormValidation } from "../../reducers/order/actions";

const { Option } = Select

export default function DisplayMap() {
    const dispatch = useDispatch()
    const [map, setMap] = useState()
    const [suggestions, setSuggestions] = useState()
    const mapRef = useRef()
    const apiKey = "nsdfonaonasdoinfsaonf"
    const H = window.H;

    useEffect(() => {
        const platform = new H.service.Platform({
            apikey: apiKey
        });
        const defaultLayers = platform.createDefaultLayers();
        // `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=Ingm-jhZnyjMrNlWzKQZytzlHgKTIGilnfZ-s6ts9gs&at=44.18024025509375,11.950243014084728&limit=5&resultType=city&q=${searchString}&lang=en-US`
        const map = new H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 44.18632334075844, lng: 12.063476013258402 },
                zoom: 12,
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        // const ui = H.ui.UI.createDefault(map, defaultLayers);
        setMap(map);
        getDefaultLocation(map)
        return () => { map.dispose() };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [H.Map, H.service.Platform])
    // to get deafult location
    function getDefaultLocation(map) {
        var lat = 47.18632334075844;
        var lng = 17.063476013258402;
        var title = "Orto";
        addMarkerToMap(lat, lng, map, title);
    }
    const addMarkerToMap = (lat, lng, map, title = "Io", custom = true) => {
        map.removeObjects(map.getObjects())
        var selectedLocationMarker = custom ? customMarker(lat, lng, title) : new H.map.Marker({ lat, lng });
        map.addObject(selectedLocationMarker);
        map.setCenter({ lat, lng }, true);
    };

    const customMarker = (lat, lng, text = "Noi") => {
        let markup = `<svg xmlns="http://www.w3.org/2000/svg" width="38px" height="46px" viewBox="0 0 30 30"><path d="M 19 31 C 19 32.7 16.3 34 13 34 C 9.7 34 7 32.7 7 31 C 7 29.3 9.7 28 13 28 C 16.3 28 19 29.3 19 31 Z" fill="#000" fill-opacity=".2"/><path d="M 13 0 C 9.5 0 6.3 1.3 3.8 3.8 C 1.4 7.8 0 9.4 0 12.8 C 0 16.3 1.4 19.5 3.8 21.9 L 13 31 L 22.2 21.9 C 24.6 19.5 25.9 16.3 25.9 12.8 C 25.9 9.4 24.6 6.1 22.1 3.8 C 19.7 1.3 16.5 0 13 0 Z" fill="#fff"/><path d="M 13 2.2 C 6 2.2 2.3 7.2 2.1 12.8 C 2.1 16.1 3.1 18.4 5.2 20.5 L 13 28.2 L 20.8 20.5 C 22.9 18.4 23.8 16.2 23.8 12.8 C 23.6 7.07 20 2.2 13 2.2 Z" fill="#8d9"/><text x="13" y="19" font-size="8pt" font-weight="bold" text-anchor="middle" fill="#000">${text}</text></svg>`
        let icon = new H.map.Icon(markup)
        let marker = new H.map.Marker({ lat, lng }, { icon });
        return marker
    }

    const autosuggest = (e) => {
        if (e.metaKey) {
            return
        }
        let searchString = escape(e.target.value)
        if (searchString !== "") {
            fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${apiKey}&at=44.18024025509375,11.950243014084728&limit=5&resultType=city&q=${searchString}&lang=en-US`)
                .then(res => res.json())
                .then((json) => {
                    if (json.length !== 0) {
                        setSuggestions(json.items.map((item) => <Option value={`${item.position.lat};${item.position.lng};${item.title}`}>{item.title}</Option>));
                    }
                });
        } else {
            setSuggestions(<Option></Option>)
        }
    };

    return (<div>
        <div>
            <Select
                showSearch
                placeholder="Your address"
                onKeyUp={autosuggest}
                onChange={value => {
                    const [lat, lng, addr] = value.split(";")
                    dispatch(actionSetFormValidation({ location: { lat, lng, addr } }))
                    addMarkerToMap(lat, lng, map)
                }}
                filterOption={(input, option) => true} // trick per aggiornare i componenti dinamicamente
            >
                {suggestions}
            </Select>
        </div>
        <div ref={mapRef} style={{ height: "300px" }} />
    </div>)

}
