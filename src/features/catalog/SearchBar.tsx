import { useState } from "react";
import agent from "../../app/api/agent";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { RestartAlt, Search } from "@mui/icons-material";
import { Flex } from "@mantine/core";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default function SearchBar({setFilteredFlights, setTickets} : any) {
    
    const [searchCapacity, setSearchCapacity] = useState("0");
    const [searchDateIn, setSearchDateIn] = useState(new Date());
    const [searchDateOut, setSearchDateOut] = useState(new Date());
    const [searchPrice, setSearchPrice] = useState("0");
    const [searchPlace, setSearchPlace] = useState("");
    const [searchAmenities, setSearchAmenities] = useState<string[]>([]);
    const [searchHost, setSearchHost] = useState("");
  
    const handleSearchCapacityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchCapacity(event.target.value);
    };

    const handleSearchDateInInputChange = (value : any) => {
      setSearchDateIn(value);
    };

    const handleSearchDateOutInputChange = (value : any) => {
        setSearchDateOut(value);
      };

    const handleSearchFromInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPrice(event.target.value);
    };

    const handleSearchToInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPlace(event.target.value);
    };
  
    const handleSearchClick = () => {
      agent.Accomodation.getAccomodationsBySearch(`?startDate=${new Date(searchDateIn).toDateString()}&endDate=${new Date(searchDateOut).toDateString()}&capacity=${Number(searchCapacity)}&price=${searchPrice}&place=${searchPlace}&amenities=${searchAmenities.join(",")}&host=${searchHost}`)
        .then(response => {
          setFilteredFlights(response)
          setTickets(searchCapacity)
        })
        .catch(error => console.log(error))
    };

    const handleResetClick = () => {
      resetFields()
      agent.Accomodation.getAccomodations()
            .then(response => {
              setFilteredFlights(response)
              setTickets(0)
            })
            .catch(error => console.log(error))
    };

    const resetFields = () => {
      setSearchCapacity('0')
      setSearchDateIn(new Date())
      setSearchDateOut(new Date())
      setSearchPrice('0')
      setSearchPlace('')
    }

    const handleSearchAmenitiesInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchAmenities(event.target.value.split(","));
    };

    const handleSearchHostInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchHost(event.target.value);
    };

    return (
      <Paper sx={{mb: 2, padding: 2}}>
          <Flex
            direction={{ base: "row", sm: "column" }}
            align="center"
          >
            <Typography variant="h5">
            Search and filters
            </Typography>
            <TextField
              type="number"
              label="Visitors"
              value={searchCapacity}
              InputProps={{ inputProps: { min: 0 } }}
              margin="normal"
              onChange={handleSearchCapacityInputChange}
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Check-in"
              defaultValue={new Date()}
              value={searchDateIn}
              onChange={handleSearchDateInInputChange}
              slotProps={{ textField: { fullWidth: true, margin: "normal"} }}
            />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Check-out"
              defaultValue={new Date()}
              value={searchDateOut}
              onChange={handleSearchDateOutInputChange}
              slotProps={{ textField: { fullWidth: true, margin: "normal"} }}
            />
            </LocalizationProvider>
            <TextField
              type="number"
              label="Price"
              value={searchPrice}
              InputProps={{ inputProps: { min: 0 } }}
              margin="normal"
              onChange={handleSearchFromInputChange}
              fullWidth
            />
            <TextField
              label="Place"
              value={searchPlace}
              margin="normal"
              onChange={handleSearchToInputChange}
              fullWidth
            />
            <TextField
              label="Amenities"
              value={searchAmenities}
              margin="normal"
              onChange={handleSearchAmenitiesInputChange}
              fullWidth
            />
            <TextField
              label="Host"
              value={searchHost}
              margin="normal"
              onChange={handleSearchHostInputChange}
              fullWidth
            />
            <Button
              size="medium"
              variant="contained"
              startIcon={<Search/>}
              sx={{mb: 2, mt: 2}}
              onClick={handleSearchClick}
              fullWidth
            >
              Search
            </Button>
            <Button
              size="medium"
              variant="contained"
              startIcon={<RestartAlt />}
              onClick={handleResetClick}
              fullWidth
            >
              Reset
            </Button>
          </Flex>
      </Paper>
    );
  };