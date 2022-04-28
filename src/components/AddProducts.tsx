import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import api from '../services/api'

export default function ButtonAdd() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = useState('')
  const [fabricated, setFabricated] = useState('')
  const [perisable, setPerisable] = useState('')
  const [validate, setValidated] = useState('')
  const [value, setValue] = useState('')

  const addProducts = async () => {
    const objetos = {
      name,
      fabricated,
      perisable,
      validate,
      preço: value
    }
    const response = await api.post('/products', objetos)
    console.log(response)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = async () => {
    setOpen(false)
    addProducts()

    console.log(name, fabricated, validate, value, perisable)
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleClickOpen}
        sx={{ backgroundColor: '#76BD7A' }}>
        Adicionar Produto
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de Produto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome do produto: "
            type="text"
            color="primary"
            focused
            fullWidth
            onChange={e => setName(e.target.value)}
            sx={{ marginBottom: '20px', marginTop: '20px' }}
          />

          <TextField
            label="Data de fabricação: "
            type="date"
            color="primary"
            focused
            fullWidth
            onChange={e => setFabricated(e.target.value)}
          />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ marginTop: '20px' }}>
              Produto é perecivel?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              onChange={e => setPerisable(e.target.value)}
              name="row-radio-buttons-group">
              <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
              <FormControlLabel
                value="Não"
                control={<Radio />}
                label="Não"
                sx={{ marginBottom: '20px', marginTop: '20px' }}
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Data de validade: "
            type="date"
            color="primary"
            focused
            fullWidth
            onChange={e => setValidated(e.target.value)}
          />

          <TextField
            label="Valor do produto:"
            type="number"
            color="primary"
            focused
            fullWidth
            onChange={e => setValue(e.target.value)}
            sx={{ marginBottom: '20px', marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
