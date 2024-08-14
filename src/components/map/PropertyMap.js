import React, {useState, useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent, Typography } from "@mui/material";
import { fromAddress } from "react-geocode";
import PropertyCard from "../property/PropertyCard";
import axios from "axios";

// Fix default icon mismatch with React and Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const PropertyMap = () => {
    const [propertyList, setPropertyList] = useState([]);
    const center = [39, 37];


    useEffect(() => {
        axios.get("http://localhost:5041/api/Property/list")
        .then(response => {
            if (response.status === 200) setPropertyList(response.data);
        })
        .catch(error => {
            console.error(error);
        })

    }, []);

    return (
        <MapContainer center={center} zoom={5} style={{height: '500px', width: '100%'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {propertyList.map((property, index) => (
            <Marker key={index} position={[Math.random() * 4 + 37, Math.random() * 15 + 27]}>
                <Popup>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {property.name}
                            </Typography>
                            <Typography variant="body2">
                                {property.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${property.price}
                            </Typography>
                        </CardContent>
                    </Card>
                </Popup>
            </Marker>
            ))}
        </MapContainer>
        
    );

}

export default PropertyMap;