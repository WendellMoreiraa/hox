import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import DialogTitle from '@mui/material/DialogTitle'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import * as productsActions from '../store/actions/products'

import api from '../services/api'

interface productsFormProps {
  open: boolean
  id: number | undefined
  onClose: () => void
}
export default function ProductForm({ open, id, onClose }: productsFormProps) {
  const dispach = useDispatch()
  const [name, setName] = useState('')
  const [fabricated, setFabricated] = useState('')
  const [perishable, setPerishable] = useState(true)
  const [validate, setValidated] = useState('')
  const [value, setValue] = useState('')
  const [errorValidade, setErrorValidade] = useState(false)
  const [legend, setLegend] = useState('')

  const addProducts = async () => {
    const objetos = {
      name,
      fabricated,
      perishable,
      validate,
      price: value
    }

    await api.post('/products', objetos)
    dispach(productsActions.setRefresh(true))
  }
  const editProducts = async () => {
    const objetos = {
      name,
      fabricated,
      perishable,
      validate,
      price: value
    }
    await api.put(`/products/${id}`, objetos)
    dispach(productsActions.setRefresh(true))
  }

  const handleClose = async () => {
    onClose()
  }
  const handleSubmit = () => {
    if (perishable && validate < fabricated) {
      setErrorValidade(true)
      setLegend('A data de validade está errada')
      return
    }
    setErrorValidade(false)
    setLegend('')

    if (id !== undefined) {
      editProducts()
      onClose()
      return
    }

    addProducts()
    onClose()
  }

  return (
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
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => setFabricated(e.target.value)}
        />

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label" sx={{ marginTop: '20px' }}>
            Produto é perecivel?
          </FormLabel>
          <RadioGroup
            defaultValue="true"
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            onChange={e => {
              if (e.target.value === 'true') setPerishable(true)
              else setPerishable(false)
            }}
            name="row-radio-buttons-group">
            <FormControlLabel value="true" control={<Radio />} label="Sim" />
            <FormControlLabel
              value="false"
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
          error={errorValidade}
          disabled={!perishable}
          focused
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => {
            setValidated(e.target.value)
          }}
          helperText={legend}
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
        <Button onClick={handleSubmit}>{id !== undefined ? 'Editar' : 'Adicionar'}</Button>
      </DialogActions>
    </Dialog>
  )
}
