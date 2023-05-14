import { useParams } from "react-router-dom"
import { Accomodation } from "../../app/models/Accomodation"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"

const AccomodationDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [accomodation, setAccomodation] = useState<Accomodation | null>(null)
  const [isChangeDate, setIsChangeDate] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [isChangePrice, setIsChangePrice] = useState<boolean>(false)
  const [availableFromDate, setAvailableFromDate] = useState(new Date())
  const [availableToDate, setAvailableToDate] = useState(new Date())

  useEffect(() => {
    axios
      .get(`http://localhost:5176/api/Accomodation/${id}`)
      .then((response) => setAccomodation(response.data))
      .catch((error) => console.log(error))
  }, [id])

  if (!accomodation) return <h3>Accomodation not found!</h3>
  const handleAvailableFromDateChange = (value: any) => {
    setAvailableFromDate(value)
  }

  const handleAvailableToDateChange = (value: any) => {
    setAvailableToDate(value)
  }

  const handleChangeDate = (event: any) => {
    let changeDateDto = {
      id: accomodation.id,
      availableFromDate: availableFromDate,
      availableToDate: availableToDate,
    }
    axios
      .put("http://localhost:5176/api/Accomodation", changeDateDto)
      .then((result) => alert("DATE CHANGED"))
      .catch((error) => console.log(error))
  }

  const handleChangePrice = (event: any) => {
    let changePriceDto = {
      id: accomodation.id,
      price: price,
    }
    axios
      .put(
        "http://localhost:5176/api/Accomodation/change-price",
        changePriceDto
      )
      .then((result) => alert("PRICE CHANGED"))
      .catch((error) => console.log(error))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src="http://picsum.photos/500"
          alt={accomodation?.pictureUrl}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{accomodation.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        {accomodation.pricePerGuest ? (
          <Typography variant="h4" color="secondary">
            ${accomodation.price} per guest
          </Typography>
        ) : (
          <Typography variant="h4" color="secondary">
            ${accomodation.price} per accomodation unit
          </Typography>
        )}
        <TableContainer>
          <Table>
            <TableBody sx={{ fontSize: "1.1em" }}>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{accomodation.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Min capacity</TableCell>
                <TableCell>{accomodation.minCapacity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Max capacity</TableCell>
                <TableCell>{accomodation.maxCapacity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>
                  {accomodation.address.street}{" "}
                  {accomodation.address.streetNumber},{" "}
                  {accomodation.address.city}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available from date</TableCell>
                <TableCell>
                  {new Date(
                    accomodation.availableFromDate
                  ).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available to date</TableCell>
                <TableCell>
                  {new Date(accomodation.availableToDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    justifyContent="center"
                    marginTop="auto"
                  >
                    <Button size="large" variant="contained">
                      Purchase
                    </Button>
                  </Box>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    justifyContent="center"
                    marginTop="auto"
                  >
                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => setIsChangeDate(!isChangeDate)}
                    >
                      Change available date
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    justifyContent="center"
                    marginTop="auto"
                  >
                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => setIsChangePrice(!isChangePrice)}
                    >
                      Change price
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {isChangeDate && (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Available from date"
                value={availableFromDate}
                minDate={new Date()}
                onChange={handleAvailableFromDateChange}
                slotProps={{
                  textField: {
                    margin: "normal",
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Available to date"
                value={availableFromDate}
                minDate={new Date()}
                onChange={handleAvailableToDateChange}
                slotProps={{
                  textField: {
                    margin: "normal",
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>
            <Button size="large" variant="contained" onClick={handleChangeDate}>
              confirm
            </Button>
          </>
        )}
        {isChangePrice && (
          <>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              margin="normal"
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Button
              size="large"
              variant="contained"
              onClick={handleChangePrice}
            >
              confirm
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  )
}
export default AccomodationDetails
