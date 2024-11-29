import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Collapse,
  ListItemText,
  styled,
} from '@mui/material';
import { useToggle } from '../hooks/useToggle';

import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CableRoundedIcon from '@mui/icons-material/CableRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NavLink = styled(RouterNavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

const nav_width = 230;

const nav_list = [
  { path: '/user/demo', label: 'Demo', icon: <AppsRoundedIcon /> },
  {
    path: '/user/description/frontend',
    default: '/user/description',
    label: 'Description',
    icon: <MenuRoundedIcon />,
    children: [
      { path: '/user/description/frontend', label: 'Frontend' },
      { path: '/user/description/backend', label: 'Backend' },
    ],
  },
  {
    path: '/user/journal',
    label: 'Joirnal',
    icon: <WarningAmberRoundedIcon />,
  },
  { path: '/user/api', label: 'API', icon: <CableRoundedIcon /> },
];

export const Navigation = () => {
  const { pathname } = useLocation();
  const [expanded, toggle] = useToggle();

  const [isHidden, setIsHidden] = useToggle();

  return (
    <Box borderColor="gray" borderRight={1}>
      <Collapse in={!isHidden} orientation="horizontal" collapsedSize={54}>
        <Box
          height={60}
          width={nav_width}
          borderBottom={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingLeft={isHidden ? 1 : 2}
          paddingRight={1}
        >
          {!isHidden && (
            <img src="/main.svg" width={40} alt="logo" title="logo" />
          )}

          <IconButton onClick={() => setIsHidden()}>
            {isHidden ? (
              <ChevronRightRoundedIcon />
            ) : (
              <ChevronLeftRoundedIcon />
            )}
          </IconButton>
        </Box>

        <List component="nav">
          {nav_list?.map((item) => {
            const has_child = !!item.children;
            const is_active_parent =
              has_child && pathname.startsWith(item?.default);

            return (
              <React.Fragment key={item.path}>
                <NavLink
                  to={item.path}
                  sx={{
                    color: is_active_parent ? 'primary.main' : '',
                  }}
                >
                  <ListItemButton
                    onClick={() => has_child && toggle()}
                    style={{ gap: 15, padding: '0 15px' }}
                  >
                    {item.icon}

                    <ListItemText primary={item.label} />
                    {item.children &&
                      (expanded ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </NavLink>
                {has_child && (
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children?.map((child) => {
                        return (
                          <NavLink key={child.path} to={child.path}>
                            <ListItemButton
                              sx={{ padding: isHidden ? '0 25px' : '0 40px' }}
                            >
                              <ListItemText
                                primary={
                                  isHidden ? child.label[0] : child.label
                                }
                              />
                            </ListItemButton>
                          </NavLink>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};
