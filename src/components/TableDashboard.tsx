import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@mui/styles'
import { Button, CircularProgress, TableFooter } from '@mui/material'
import { useState, MouseEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductProps } from '../Helpers/types/products'
import { StatesProps } from '../Helpers/types/states'
import api from '../services/api'
import ProductForm from './ProductForm'
import * as productsActions from '../store/actions/products'

const useStyles = makeStyles({
  tableCell: {
    backgroundColor: 'rgba(118, 189, 122, 1)'
  },
  tableHead: {
    backgroundColor: 'rgba(166, 229, 169, 0.3)'
  },
  addProducts: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  },
  loadingTable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh  ',
    width: '100%'
  }
})

interface TableDataProps {
  products: ProductProps[]
}
export default function TableData({ products }: TableDataProps) {
  const { loading } = useSelector((state: StatesProps) => state.products)
  const dispach = useDispatch()
  const [productId, setProductId] = useState<number | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const table = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleAdd = () => {
    setOpen(true)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClose = () => {
    setOpen(false)
    setProductId(undefined)
  }

  const handleEdit = (id: number) => {
    setProductId(id)
    setOpen(true)
  }

  const handleProductDelete = async (id: number) => {
    await api.delete(`/products/${id}`)

    dispach(productsActions.setRefresh(true))
  }

  return (
    <>
      <div className={table.addProducts}>
        <Button
          variant="contained"
          onClick={handleAdd}
          color="success"
          sx={{ backgroundColor: '#76BD7A' }}>
          Adicionar Produto
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 100 }}
          size="small"
          aria-label="a dense table"
          className={table.tableHead}>
          {loading ? (
            <div className={table.loadingTable}>
              <CircularProgress color="success" style={{ width: '80px', height: '80px' }} />
            </div>
          ) : (
            <>
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
                    Ajustes:
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ id, name, fabricated, perishable, validate, price }) => {
                      const formatedFabricated = new Date(fabricated)
                      const formatedValidate = new Date(validate)
                      return (
                        <TableRow
                          key={id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell sx={{ fontWeight: '520' }} component="th">
                            {name}
                          </TableCell>
                          <TableCell sx={{ fontWeight: '520' }} align="right">
                            {formatedFabricated.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}{' '}
                          </TableCell>
                          <TableCell sx={{ fontWeight: '520' }} align="right">
                            {perishable ? 'Sim' : 'Não'}
                          </TableCell>
                          <TableCell sx={{ fontWeight: '520' }} align="right">
                            {validate === ''
                              ? 'Não perecivel'
                              : formatedValidate.toLocaleDateString('pt-BR', {
                                  timeZone: 'UTC'
                                })}{' '}
                          </TableCell>
                          <TableCell sx={{ fontWeight: '520' }} align="right">
                            R$ {price}{' '}
                          </TableCell>
                          <TableCell sx={{ fontWeight: '520' }} align="center">
                            <div>
                              <Tooltip title="editar">
                                <IconButton onClick={() => handleEdit(id)}>
                                  <EditIcon
                                    sx={{
                                      color: 'rgba(118, 189, 122, 1)',
                                      cursor: 'pointer'
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Delete">
                                <IconButton onClick={() => handleProductDelete(id)}>
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
                      )
                    })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'Produtos por pag:'
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </>
          )}
        </Table>
      </TableContainer>
      <ProductForm
        open={open}
        id={productId}
        onClose={() => {
          handleClose()
        }}
      />
    </>
  )
}
