import { Switch } from "@mantine/core"
import { Button, Paper, TextField, Typography } from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export const CreateAccomodation = () => {
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [pricePerGuest, setPricePerGuest] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [minCapacity, setMinCapacity] = useState<number>(0)
  const [maxCapacity, setMaxCapacity] = useState<number>(0)

  //address
  const [city, setCity] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [streetNumber, setStreetNumber] = useState<string>("")

  const [pictureUrl, setPictureUrl] = useState<string>("")
  const [availableFromDate, setAvailableFromDate] = useState(new Date())
  const [availableToDate, setAvailableToDate] = useState(new Date())

  const [isAutomaticConfirm, setIsAutomaticConfirm] = useState<boolean>(false)

  const handleAvailableFromDateChange = (value: any) => {
    setAvailableFromDate(value)
  }

  const handleAvailableToDateChange = (value: any) => {
    setAvailableToDate(value)
  }

  const handleSubmmit = (event: any) => {
    event.preventDefault()
    let newAccomodation = {
      name: name,
      description: description,
      pricePerGuest: pricePerGuest,
      price: price,
      minCapacity: minCapacity,
      maxCapacity: maxCapacity,
      street: street,
      streetNumber: streetNumber,
      city: city,
      country: country,
      pictureUrl: "probaa",
      availableFromDate: availableFromDate,
      availableToDate: availableToDate,
      isAutomaticConfirm: isAutomaticConfirm,
    }
    console.log(newAccomodation)
  }
  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Typography gutterBottom variant="h2">
        Create a new accomodation
      </Typography>
      <form onSubmit={handleSubmmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <Switch
          label="Price per guest"
          checked={pricePerGuest}
          onChange={(e) => setPricePerGuest(!pricePerGuest)}
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          margin="normal"
          InputProps={{ inputProps: { min: 0 } }}
          fullWidth
          required
        />
        <TextField
          label="Min capacity"
          value={minCapacity}
          onChange={(e) => setMinCapacity(parseInt(e.target.value))}
          margin="normal"
          fullWidth
          InputProps={{ inputProps: { min: 0 } }}
          required
        />
        <TextField
          label="Max capacity"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
          margin="normal"
          fullWidth
          InputProps={{ inputProps: { min: 0 } }}
          required
        />
        <TextField
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Street number"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Available from date"
            value={availableFromDate}
            minDate={new Date()}
            onChange={handleAvailableFromDateChange}
            slotProps={{
              textField: { fullWidth: true, margin: "normal", required: true },
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Available to date"
            value={availableToDate}
            minDate={new Date()}
            onChange={handleAvailableToDateChange}
            slotProps={{
              textField: { fullWidth: true, margin: "normal", required: true },
            }}
          />
        </LocalizationProvider>
        <Switch
          label="Is automatic confirm"
          checked={isAutomaticConfirm}
          onChange={(e) => setIsAutomaticConfirm(!pricePerGuest)}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          size="large"
          sx={{ mb: 2, mt: 2 }}
          fullWidth
        >
          Create
        </Button>
        <Button
          component={NavLink}
          to="/catalog"
          variant="contained"
          color="error"
          size="large"
          sx={{ mb: 2 }}
          fullWidth
        >
          Cancel
        </Button>
      </form>
    </Paper>
  )
}
