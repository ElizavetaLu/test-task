import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePickerProps,
  DatePicker as MUIDatePicker,
} from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export const DatePicker = (props: DatePickerProps<Dayjs>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker {...props} />
    </LocalizationProvider>
  );
};
