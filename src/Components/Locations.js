import ListLocations from "./ListLocations"
import React, { Component, useEffect, useState } from 'react';
import { Button, Search, ComboBox, FileUploaderDropContainer, FormItem, Tile, HeaderMenuItem } from '@carbon/react';

function Locations() {



    return (


        <div>

            <Button > Add a Location</Button>
            <ListLocations> </ListLocations>

        </div>



    )

}

export default Locations