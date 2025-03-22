import React from 'react';
import { TextField, Container, Typography, Box, Button } from '@mui/material';

const Lecturer = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Lecturer Management
                </Typography>
                
                <form>
                    <TextField fullWidth label="Lecturer ID" name="id" margin="normal" required />
                    <TextField fullWidth label="Lecturer Name" name="name" margin="normal" required />
                    <TextField fullWidth label="Lecturer Address" name="address" margin="normal" required />
                    <TextField fullWidth label="Phone Number" name="phone" margin="normal" required />
                    <TextField fullWidth label="Email" name="email" type="email" margin="normal" required />
                    <TextField fullWidth label="Description" name="description" margin="normal" multiline rows={4} required />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button variant="contained" color="primary">Submit</Button>
                    <Button variant="outlined" color="secondary">Clear Form</Button>
                </Box>

                </form>

            </Box>
        </Container>
    );
}

export default Lecturer;
