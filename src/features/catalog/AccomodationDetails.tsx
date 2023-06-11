import { useParams } from "react-router-dom"
import { Accomodation } from "../../app/models/Accomodation"
import { AccomodationGrade } from "../../app/models/AccomodationGrade"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { useAppSelector } from "../../app/store/configureStore"
import agent from "../../app/api/agent"
import { toast } from "react-toastify"

const AccomodationDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [accomodation, setAccomodation] = useState<Accomodation | null>(null)
  const [isChangeDate, setIsChangeDate] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [isChangePrice, setIsChangePrice] = useState<boolean>(false)
  const [availableFromDate, setAvailableFromDate] = useState(new Date())
  const [availableToDate, setAvailableToDate] = useState(new Date())
  const [grades, setGrades] = useState<AccomodationGrade[]>([])
  const [averageGrade, setAverageGrade] = useState<number>(0)
  const [canGrade, setCanGrade] = useState<boolean>(false)
  const [selectedGrade, setSelectedGrade] = useState<number>(0)
  const [userGrade, setUserGrade] = useState<AccomodationGrade>()
  const { user } = useAppSelector((state) => state.acount)

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/Accomodation/${id}`)
      .then((response) => setAccomodation(response.data))
      .catch((error) => console.log(error))

    agent.AccomodationGrade.getByAccomodationId(id)
      .then((response) => {
        setGrades(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  useEffect(() => {
    agent.Reservation.canGuestGradeAccomodation(user?.username!, id)
      .then((response) => {
        setCanGrade(response)
      })
      .catch((error) => {
        console.log(error)
      })

    agent.AccomodationGrade.getByGuestAndAccomodation(user?.username!, id)
      .then((response) => {
        setUserGrade(response[0])
        setSelectedGrade(response[0].value)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [user])

  useEffect(() => {
    let sum = 0
    grades.forEach(grade => sum += grade.value)
    setAverageGrade(sum/grades.length)
  }, [grades])

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
      .put("http://localhost:8001/api/Accomodation", changeDateDto)
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
        "http://localhost:8001/api/Accomodation/change-price",
        changePriceDto
      )
      .then((result) => alert("PRICE CHANGED"))
      .catch((error) => console.log(error))
  }

  const createOrUpdateGrade = () => {
    if (!canGrade){
      return
    }

    let grade = userGrade
    if (userGrade == null) {
      grade = {
        accomodationId: id!,
        guestUsername: user?.username!,
        value: selectedGrade,
        created: new Date()
      }
      agent.AccomodationGrade.createGrade(grade)
        .then((response) => {
          toast.success("Your rating has been saved!")
        })
        .catch((error) => {
          console.log(error)
        })
    }else {
      grade!.value = selectedGrade
      agent.AccomodationGrade.updateGrade(userGrade.id, grade)
        .then((response) => {
          toast.success("Your rating has been updated!")
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
                <TableCell>Rating</TableCell>
                <TableCell><Rating readOnly value={averageGrade} precision={0.5}></Rating></TableCell>
              </TableRow>
              {canGrade && 
                <TableRow>
                  <TableCell>My rating</TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="left"
                    >
                      <Rating value={selectedGrade} onChange={(event, newValue) => {setSelectedGrade(newValue!);}}></Rating>
                      <IconButton size="small" color="success" disabled={selectedGrade == 0} onClick={createOrUpdateGrade}><CheckIcon/></IconButton>
                      <IconButton size="small" color="error" disabled={selectedGrade == 0} onClick={() => setSelectedGrade(0)}><CloseIcon/></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              }
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

              {user?.userRole.toUpperCase() === "HOST" && (
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
              )}
              {user?.userRole.toUpperCase() === "HOST" && (
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
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {isChangeDate && user?.userRole.toUpperCase() === "HOST" && (
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
        {isChangePrice && user?.userRole.toUpperCase() === "HOST" && (
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
