import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJournal } from '../../services';
import { DatePicker } from '../../components/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { IJournalField } from '../../types/api';

export default function Journal() {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const [search, setSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(search);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState<IJournalField[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['journal', page, rowsPerPage, from, to, debouncedValue],
    queryFn: () =>
      getJournal({
        skip: page * rowsPerPage,
        take: rowsPerPage,
        filter: {
          from,
          to,
          search: debouncedValue,
        },
      }),
  });

  useEffect(() => {
    if (isLoading) return;
    if (data?.items) setRows(data.items);
  }, [isLoading, data]);

  return (
    <Box position="relative">
      {isLoading && (
        <Box
          position="absolute"
          zIndex={1}
          bgcolor="#33333338"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={10}
          sx={{ top: -16, right: -16, bottom: 0, left: -16 }}
        >
          <CircularProgress sx={{}} />
        </Box>
      )}

      <Box
        display="flex"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        gap={2}
        mb={2}
      >
        <DatePicker
          label="From"
          value={from ? dayjs(from) : null}
          onChange={(newDate: Dayjs | null) => {
            if (newDate) setFrom(newDate.format());
          }}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
        <DatePicker
          label="To"
          value={to ? dayjs(to) : null}
          onChange={(newDate: Dayjs | null) => {
            if (newDate) setTo(newDate.format());
          }}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          fullWidth
        />
      </Box>

      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ p: 1.5 }}>
                  ID
                </TableCell>
                <TableCell align="right" sx={{ p: 1.5 }}>
                  Event Id
                </TableCell>
                <TableCell align="right" sx={{ p: 1.5 }}>
                  Created At
                </TableCell>
                <TableCell align="right" sx={{ p: 1.5 }}>
                  Options
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right" sx={{ p: '5px 10px' }}>
                    {row.id}
                  </TableCell>
                  <TableCell align="right" sx={{ p: '5px 10px' }}>
                    {row.eventId}
                  </TableCell>
                  <TableCell align="right" sx={{ p: '5px 10px' }}>
                    {row.createdAt}
                  </TableCell>
                  <TableCell align="right" sx={{ p: '5px 10px' }}>
                    <Link to={`${row.id}`}>
                      <MoreVertIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={data?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
}
