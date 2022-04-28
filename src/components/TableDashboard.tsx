/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import BuildIcon from '@mui/icons-material/Build'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@mui/styles'
import { TableFooter } from '@mui/material'
import { ProductProps } from '../Helpers/types/products'

import api from '../services/api'
import Pagination from './Pagination'

const useStyles = makeStyles({
  tableCell: {
    backgroundColor: 'rgba(118, 189, 122, 1)'
  },
  tableHead: {
    backgroundColor: 'rgba(166, 229, 169, 0.3)'
  }
})

export default function TableData(products: ProductProps[]) {
  const table = useStyles()

  const handleProductDelete = async (id: number) => {
    try {
      const response = await api.delete(`/products/${id}`)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 100 }}
        size="small"
        aria-label="a dense table"
        className={table.tableHead}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ffff' }} className={table.tableCell}>
              Nome:
            </TableCell>
            <TableCell sx={{ color: '#ffff' }} className={table.tableCell} align="right">
              Data de fabricação:
            </TableCell>
            <TableCell sx={{ color: '#ffff' }} className={table.tableCell} align="right">
              Perecivel:
            </TableCell>
            <TableCell sx={{ color: '#ffff' }} className={table.tableCell} align="right">
              Validade:
            </TableCell>
            <TableCell sx={{ color: '#ffff' }} className={table.tableCell} align="right">
              Preço:
            </TableCell>
            <TableCell sx={{ color: '#ffff' }} className={table.tableCell} align="center">
              Edit:
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map(product => (
            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ fontWeight: '520' }} component="th">
                {product.name}
              </TableCell>
              <TableCell sx={{ fontWeight: '520' }} align="right">
                {product.fabricated}{' '}
              </TableCell>
              <TableCell sx={{ fontWeight: '520' }} align="right">
                {product.perishable ? 'Sim' : 'Não'}
              </TableCell>
              <TableCell sx={{ fontWeight: '520' }} align="right">
                {product.validate}{' '}
              </TableCell>
              <TableCell sx={{ fontWeight: '520' }} align="right">
                R$ {product.preço}{' '}
              </TableCell>
              <TableCell sx={{ fontWeight: '520' }} align="center">
                <div>
                  <Tooltip title="Edit">
                    <IconButton>
                      <BuildIcon
                        sx={{
                          color: 'rgba(118, 189, 122, 1)',

                          cursor: 'pointer'
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleProductDelete(product.id)}>
                      <DeleteIcon
                        sx={{
                          color: 'rgba(80, 8, 20,0.7)',
                          cursor: 'pointer'
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <Pagination />
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
