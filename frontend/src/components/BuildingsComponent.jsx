import React, { useEffect, useState } from 'react';
import TopBarComponet from './TopBarComponet';
import { checkAuth, fetchUserData } from '../redux/userSlice';
import { fetchBuildings, postBuildingData, updateBuildingData, deleteBuildingData } from '../redux/buildingSlice';
import { DataGrid } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';

function BuildingsComponent() {
    const dispatch = useDispatch();
    const { userData = [], isAuthenticated } = useSelector((state) => state.users);
    const { buildingData = [] } = useSelector((state) => state.buildings);

    const [buildingName, setBuildingName] = useState('');
    const [location, setLocation] = useState('');
    const [building_type, setBuildingType] = useState('');
    const [cons_no, setConsNo] = useState('');
    const [editingBuildingId, setEditingBuildingId] = useState(null);

    useEffect(() => {
        dispatch(checkAuth());
        if (isAuthenticated) {
            dispatch(fetchUserData());
            dispatch(fetchBuildings());
        }
    }, [dispatch, isAuthenticated]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'User', headerName: 'User name', width: 130 },
        { field: 'Building', headerName: 'Building Name', width: 150 },
        { field: 'Consumer_No', headerName: 'Consumer Number', width: 150 },
        { field: 'BuildingType', headerName: 'Building Type', width: 150 },
        { field: 'Location', headerName: 'Location', width: 150 },
        {
            field: 'Actions',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        },
    ];

    const rows = buildingData.map((building) => ({
        id: building.id,
        User: userData.find(user => user.id === building.user)?.username || 'Unknown',
        Building: building.name || 'Unknown',
        Consumer_No: building.cons_no || 'Unknown',
        BuildingType: building.building_type || 'Unknown',
        Location: building.location || 'Unknown',
    }));

    const handleBuildingTypeChange = (event) => {
        setBuildingType(event.target.value);
    };

    const handleEdit = (id) => {
        const buildingToEdit = buildingData.find(building => building.id === id);
        if (buildingToEdit) {
            setBuildingName(buildingToEdit.name);
            setLocation(buildingToEdit.location);
            setBuildingType(buildingToEdit.building_type);
            setConsNo(buildingToEdit.cons_no);
            setEditingBuildingId(id);
        }
    };   
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBuilding = {
            user: userData[0]?.id,
            name: buildingName,
            location: location,
            building_type: building_type,
            cons_no: cons_no
        };

        if (editingBuildingId) {
            dispatch(updateBuildingData({ id: editingBuildingId, updatedBuilding: newBuilding }))
                .unwrap()
                .then(() => {
                    toast.success('Building updated successfully!');
                    resetForm();
                    dispatch(fetchBuildings());
                })
                .catch((error) => {
                    console.log(error);
                    
                    toast.error(error);
                });
        } else {
            dispatch(postBuildingData(newBuilding))
                .unwrap()
                .then(() => {
                    toast.success('Building added successfully!');
                    resetForm();
                    dispatch(fetchBuildings());
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const resetForm = () => {
        setBuildingName('');
        setLocation('');
        setBuildingType('');
        setConsNo('');
        setEditingBuildingId(null);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteBuildingData(id)).unwrap();
            toast.success('Building deleted successfully!');
            dispatch(fetchBuildings());
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <TopBarComponet />
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ mt: 3 }} >
                    <Grid container spacing={3} justifyContent="center" component="form" noValidate autoComplete="off">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="user-name"
                                label="User Name"
                                InputProps={{ readOnly: true, disabled: true }}
                                value={userData[0]?.username || 'Default Username'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="building-name"
                                label="Building Name"
                                variant="outlined"
                                value={buildingName}
                                onChange={e => setBuildingName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="building-type-label">Building Type</InputLabel>
                                <Select
                                    labelId="building-type-label"
                                    id="building-type"
                                    value={building_type}
                                    onChange={handleBuildingTypeChange}
                                    label="Building Type"
                                >
                                    <MenuItem value="DOMESTIC">DOMESTIC</MenuItem>
                                    <MenuItem value="AGRICULTURE">AGRICULTURE</MenuItem>
                                    <MenuItem value="COMMERCIAL">COMMERCIAL</MenuItem>
                                    <MenuItem value="INDUSTRIAL">INDUSTRIAL</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="cons_no"
                                label="Consumer Number"
                                value={cons_no}
                                variant="outlined"
                                onChange={e => setConsNo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="location"
                                label="Location"
                                variant="outlined"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                            <Button type="submit" variant="outlined" size='medium' onClick={handleSubmit}>
                                {editingBuildingId ? 'Update' : 'Add'}
                            </Button>
                        </Grid>
                    </Grid>
                    <Box mt={4} sx={{ width: '100%' }}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <Box sx={{ overflowX: 'auto' }}>
                                    <DataGrid
                                        autoHeight
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        sx={{
                                            minWidth: '500px',
                                            '& .MuiDataGrid-columnHeader': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                            '& .MuiDataGrid-cell': {
                                                textAlign: 'center',
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default BuildingsComponent;
