import Link from 'next/link';
import { AppBar, Toolbar, Button, Box, styled, Typography } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AddIcon from '@mui/icons-material/Add';

const StyledLink = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
  }
`;

const StickyAppBar = styled(AppBar)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 63px;
  z-index: 1000;
  background-color: #f0f4ff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const FloatingButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #181c44;
  border-radius: 12px;
  width: 56px;
  height: 56px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

export default function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <StickyAppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} px={0}>
            <StyledLink href="/dashboard" passHref>
              <Button color="inherit" sx={{ mx: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ mt: 1, color: 'black', textTransform: 'none' }}>
                    <HomeRoundedIcon fontSize="medium" />
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'black', textTransform: 'none' }}>
                    Home
                  </Typography>
                </Box>
              </Button>
            </StyledLink>

            <StyledLink href="/dashboard/forecasts" passHref>
              <Button color="inherit" sx={{ mx: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ mt: 1, color: 'black', textTransform: 'none' }}>
                    <ThermostatIcon fontSize="medium" />
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'black', textTransform: 'none' }}>
                    Weather
                  </Typography>
                </Box>
              </Button>
            </StyledLink>
          </Box>

          <StyledLink href="/dashboard/task" passHref>
            <FloatingButton>
              <AddIcon fontSize="large" sx={{ color: 'white' }} />
            </FloatingButton>
          </StyledLink>
        </Toolbar>
      </StickyAppBar>
    </>
  );
}
