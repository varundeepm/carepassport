import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Avatar,
  Divider,
  Paper,
  Fab,
  Modal,
  TextField,
  Backdrop,
  Fade,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import {
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Folder as FolderIcon,
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Patient Dashboard Component
const PatientDashboard: React.FC = () => {
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-01-15', time: '10:00 AM', type: 'Check-up' },
    { id: 2, doctor: 'Dr. Michael Chen', date: '2024-01-20', time: '2:30 PM', type: 'Consultation' }
  ];

  const recentRecords = [
    { id: 1, title: 'Blood Test Results', date: '2024-01-10', status: 'Available' },
    { id: 2, title: 'X-Ray Report', date: '2024-01-08', status: 'Available' },
    { id: 3, title: 'Prescription Update', date: '2024-01-05', status: 'Pending' }
  ];

  const visitedHospitals = [
    { id: 1, name: 'City Hospital', lastVisit: '2024-01-10', address: '123 Main St', doctors: ['Dr. Sarah Johnson', 'Dr. Lee Wong'] },
    { id: 2, name: 'Green Valley Clinic', lastVisit: '2023-12-22', address: '456 Oak Ave', doctors: ['Dr. Michael Chen'] },
    { id: 3, name: 'Sunrise Medical Center', lastVisit: '2023-11-15', address: '789 Sunrise Blvd', doctors: ['Dr. Priya Patel'] }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Patient Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" startIcon={<ScheduleIcon />}>
                  Book Appointment
                </Button>
                <Button variant="outlined" startIcon={<FolderIcon />}>
                  View Medical Records
                </Button>
                <Button variant="outlined" startIcon={<NotificationsIcon />}>
                  Request Prescription
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointments
              </Typography>
              <List>
                {upcomingAppointments.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={appointment.doctor}
                        secondary={`${appointment.date} at ${appointment.time} - ${appointment.type}`}
                      />
                      <Chip label={appointment.type} color="primary" size="small" />
                    </ListItem>
                    {index < upcomingAppointments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Medical Records */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Medical Records
              </Typography>
              <Grid container spacing={2}>
                {recentRecords.map((record) => (
                  <Grid item xs={12} sm={6} md={4} key={record.id}>
                    <Paper sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <FolderIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">{record.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {record.date}
                      </Typography>
                      <Chip 
                        label={record.status} 
                        color={record.status === 'Available' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Visited Hospitals */}
        <Grid item xs={12}>
          {visitedHospitals.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Visited Hospitals
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No hospital visits yet. Your visits will appear here after your doctor or organization creates a patient card for you.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Visited Hospitals
                </Typography>
                <Grid container spacing={2}>
                  {visitedHospitals.map((hospital) => (
                    <Grid item xs={12} sm={6} md={4} key={hospital.id}>
                      <Paper sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <HospitalIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="subtitle2">{hospital.name}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Last visit: {hospital.lastVisit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Address: {hospital.address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Doctors seen:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                          {hospital.doctors.map((doc, idx) => (
                            <li key={idx} style={{ fontSize: '0.95em' }}>{doc}</li>
                          ))}
                        </ul>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

// Doctor/Organization Dashboard Component
const DoctorOrgDashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [patientCards, setPatientCards] = React.useState<any[]>([]);
  const [form, setForm] = React.useState({
    patientId: '',
    name: '',
    file: null as File | null,
    prescription: '',
    suggestion: '',
    appointment: '',
    hospital: 'City Hospital',
    date: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, file: e.target.files ? e.target.files[0] : null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientCards([...patientCards, { ...form }]);
    setForm({ patientId: '', name: '', file: null, prescription: '', suggestion: '', appointment: '', hospital: 'City Hospital', date: '' });
    handleClose();
  };

  const todayAppointments = [
    { id: 1, patient: 'John Doe', time: '9:00 AM', type: 'Check-up', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation', status: 'Confirmed' },
    { id: 3, patient: 'Mike Johnson', time: '2:00 PM', type: 'Follow-up', status: 'Pending' }
  ];

  const recentPatients = [
    { id: 1, name: 'Alice Brown', lastVisit: '2024-01-10', status: 'Active' },
    { id: 2, name: 'Bob Wilson', lastVisit: '2024-01-08', status: 'Active' },
    { id: 3, name: 'Carol Davis', lastVisit: '2024-01-05', status: 'Inactive' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Review lab results', priority: 'High', dueDate: '2024-01-12' },
    { id: 2, task: 'Update patient records', priority: 'Medium', dueDate: '2024-01-15' },
    { id: 3, task: 'Schedule follow-up calls', priority: 'Low', dueDate: '2024-01-18' }
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Doctor/Organization Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">24</Typography>
                  <Typography variant="body2" color="text.secondary">Total Patients</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">8</Typography>
                  <Typography variant="body2" color="text.secondary">Today's Appointments</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">12</Typography>
                  <Typography variant="body2" color="text.secondary">Pending Tasks</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4">85%</Typography>
                  <Typography variant="body2" color="text.secondary">Satisfaction Rate</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Appointments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Appointments
              </Typography>
              <List>
                {todayAppointments.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={appointment.patient}
                        secondary={`${appointment.time} - ${appointment.type}`}
                      />
                      <Chip 
                        label={appointment.status} 
                        color={appointment.status === 'Confirmed' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </ListItem>
                    {index < todayAppointments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Tasks
              </Typography>
              <List>
                {pendingTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.task}
                        secondary={`Due: ${task.dueDate}`}
                      />
                      <Chip 
                        label={task.priority} 
                        color={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'default'} 
                        size="small" 
                      />
                    </ListItem>
                    {index < pendingTasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Patients
              </Typography>
              <Grid container spacing={2}>
                {recentPatients.map((patient) => (
                  <Grid item xs={12} sm={6} md={4} key={patient.id}>
                    <Paper sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ mr: 2 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{patient.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last visit: {patient.lastVisit}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={patient.status} 
                        color={patient.status === 'Active' ? 'success' : 'default'} 
                        size="small" 
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Floating Action Button */}
      <Fab color="primary" aria-label="add" onClick={handleOpen} sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
        <AddIcon />
      </Fab>
      {/* Modal for Patient Card Creation */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box component="form" onSubmit={handleSubmit} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" align="center">Create Patient Card</Typography>
            <TextField label="Patient ID" name="patientId" value={form.patientId} onChange={handleChange} required fullWidth />
            <TextField label="Patient Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField label="Appointment Details" name="appointment" value={form.appointment} onChange={handleChange} required fullWidth />
            <TextField label="Prescription" name="prescription" value={form.prescription} onChange={handleChange} multiline rows={2} fullWidth />
            <TextField label="Suggestion" name="suggestion" value={form.suggestion} onChange={handleChange} multiline rows={2} fullWidth />
            <TextField label="Date" name="date" type="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required fullWidth />
            <FormControl fullWidth>
              <InputLabel>Hospital/Organization</InputLabel>
              <Select name="hospital" value={form.hospital} label="Hospital/Organization" onChange={e => setForm({ ...form, hospital: e.target.value })}>
                <MenuItem value="City Hospital">City Hospital</MenuItem>
                <MenuItem value="Green Valley Clinic">Green Valley Clinic</MenuItem>
                <MenuItem value="Sunrise Medical Center">Sunrise Medical Center</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" component="label">
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {form.file && <Typography variant="body2">Selected: {form.file.name}</Typography>}
            <Button type="submit" variant="contained" color="primary">Create</Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

// Main Dashboard Component with Tabs
const Dashboard: React.FC = () => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          CarePassport Dashboard
        </Typography>
        
        <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }}>
          <Tab label="Patient View" icon={<PersonIcon />} iconPosition="start" />
          <Tab label="Doctor/Organization View" icon={<HospitalIcon />} iconPosition="start" />
        </Tabs>
        
        {tab === 0 && <PatientDashboard />}
        {tab === 1 && <DoctorOrgDashboard />}
      </Box>
    </Container>
  );
};

export default Dashboard; 