import React, { Component, useEffect, useState } from 'react';
import { Header, HeaderName, HeaderNavigation, Content, Button, Search, ComboBox, FileUploaderDropContainer, FormItem, Tile, Link } from '@carbon/react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Toggletip, ToggletipButton, ToggletipContent
} from '@carbon/react';

import { Information } from '@carbon/react/icons';
import { Grid, Column } from '@carbon/react';

import axios from 'axios';

const headers = [
  {
    key: 'firewall',
    header: 'Firewall',
  },
  {
    key: 'id',
    header: 'IP',
  },
  {
    key: 'subnet',
    header: 'Subnet',
  },
];

const items = [{
  id: 'option-0',
  text: 'An example option that is really long to show what should be done to handle long text'
}, {
  id: 'option-1',
  text: 'Option 1'
}, {
  id: 'option-2',
  text: 'Option 2'
}, {
  id: 'option-3',
  text: 'Option 3 - a disabled item',
  disabled: true
}, {
  id: 'option-4',
  text: 'Option 4'
}, {
  id: 'option-5',
  text: 'Option 5'
}];


const bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTY3MDc0OSwianRpIjoiZjZiZTY0YmItMWQ1Mi00ZWM3LWFlOGItMWQyNTIzNDIzNWZiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzA5NjcwNzQ5LCJjc3JmIjoiODcwY2I5MzEtY2VkNi00OWM2LWIwNmItZThjNmQwMGVkMzQ0IiwiZXhwIjoxNzA5Njc0MzQ5fQ.K-NKtlSkG0eQwwjhRSYsff6K0OwHyUsf6EthRG0bDuQ';
 

function App() {


  //get locations

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const headers = {
          'accept': ' application/json', 
          'Authorization': 'Bearer ' + bearer,
        };
        const response = await axios.get('https://firewallvalidation.onrender.com/location', { headers });
        console.log(response.data);
        const objLoweCase = response.data.map(obj => convertKeysToLowercase(obj));
        setLocations(objLoweCase);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getLocations();
  }, []); 






  //Main search

  function convertKeysToLowercase(originalObject) {
    const newObject = {};
    for (const key in originalObject) {
      newObject[key.toLowerCase()] = originalObject[key];
    }
    return newObject;
  }


  const [rows, setRows] = useState([]);
  const [IP, setIP] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

 
  const buscarPorIp = async (IP) => {
    try {
      const headers = {
        'Authorization': 'Bearer '+ bearer,
        'accept': ' application/json',
      };
      const response = await axios.get('https://firewallvalidation.onrender.com/location/'+selectedLocation.id + '/search/'+IP, { headers });
      const objLoweCase = response.data.map(obj => convertKeysToLowercase(obj));
      setRows(objLoweCase);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    buscarPorIp(IP);

  }, [ IP]);


  const handleInputChange = (event) => {
    setIP(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedLocation(event.selectedItem);
  };

//
 


  return (
    <div>
      <Header >
        <HeaderName href="#" prefix="IBM"> Firewall </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
        </HeaderNavigation>
      </Header>

      <Content id='main-content'>

        <Grid>
          <Column lg={4}>
            <div
              style={{
                width: 300
              }}
            >
              <Search
                closeButtonLabelText="Clear search input"
                defaultValue="1.1.1.1"
                id="search-playground-1"
                labelText="Label text"
                placeholder="Type you IP here"
                playgroundWidth={300}
                role="searchbox"
                size="md"
                type="text"
                value={IP}
                onChange={handleInputChange}
              />
            </div>
          </Column>
          <Column lg={4}>
            <div style={{
              width: 300
            }}>
              <ComboBox onChange={handleDropdownChange} id="carbon-combobox" items={locations} downshiftProps={{
              }} itemToString={item => item ? item.name : ''} helperText="Combobox helper text" />
            </div >
          </Column>
          <Column lg={4}>
            <Toggletip>
              <ToggletipButton label="Additional information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>Custom content here</p>
              </ToggletipContent>
            </Toggletip>
          </Column>
          <Column lg={4}>
            <FormItem>
              <p className="cds--file--label">
                Upload files
              </p>
              <p className="cds--label-description">
                Max file size is 500kb. Supported file types are .jpg and .png.
              </p>
              <FileUploaderDropContainer
                accept={[
                  'image/jpeg',
                  'image/png'
                ]}
                innerRef={{
                  current: '[Circular]'
                }}
                labelText="Drag and drop files here or click to upload"
                multiple
                name=""
                onAddFiles={function noRefCheck() { }}
                onChange={function noRefCheck() { }}
                tabIndex={0}
              />
              <div className="cds--file-container cds--file-container--drop" />
            </FormItem>
          </Column>
        </Grid>



        <Tile id="tile-1">
          SLA agreement would be shown here
          <br />
          <br />
        </Tile>

        <br />
        <br />

        <DataTable rows={rows} headers={headers}>
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow  {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={index}>
                        {cell.id === cell.value+':id' ? (
                          IP
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      </Content>

    </div>
  );
}

export default App;


