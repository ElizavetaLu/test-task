import { ButtonBase, ButtonBaseProps } from '@mui/material';

export const Button = ({ children, sx = {}, ...props }: ButtonBaseProps) => {
  return (
    <ButtonBase
      sx={{
        border: '1px solid #3f51b5', 
        borderRadius: 1,
        padding: '10px 30px',
        textTransform: 'capitalize',
        fontSize: '1rem',
        ...sx,
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};
