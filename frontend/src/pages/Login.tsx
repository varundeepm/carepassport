import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Tabs, Tab } from '@mui/material';
import bgImage from '../assets/doctor-bg.jpg';

const DoctorOrgLogin: React.FC = () => (
  <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField label="Organization/Doctor ID" variant="outlined" fullWidth required />
    <TextField label="Password" type="password" variant="outlined" fullWidth required />
    <Button variant="contained" color="primary" fullWidth>Login</Button>
  </Box>
);

const PatientLogin: React.FC = () => (
  <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField label="Patient ID" variant="outlined" fullWidth required />
    <TextField label="Password" type="password" variant="outlined" fullWidth required />
    <Button variant="contained" color="secondary" fullWidth>Login</Button>
  </Box>
);

const Login: React.FC = () => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%', m: 4, mr: '2cm', boxShadow: 5, backdropFilter: 'blur(2px)' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Login
          </Typography>
          <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 2 }}>
            <Tab label="Organization" />
            <Tab label="Patient" />
          </Tabs>
          {tab === 0 && <DoctorOrgLogin />}
          {tab === 1 && <PatientLogin />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login; 