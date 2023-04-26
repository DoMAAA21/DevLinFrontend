import React, { useState } from 'react';
import { styled   } from '@mui/material/styles';
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import {TextField, Button,Box,Grid,Paper,Typography,MenuItem} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const notifyerror = (message = "") =>
toast.error(message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});

const Root = styled('div')({
    flexGrow: 1,
  });
const StyledPaper = styled(Paper)({
    padding: '16px',
    textAlign: 'center',
    color: '#333',
  });
  
  const StyledTextField = styled(TextField)({
    margin: '8px',
    
  });
  
  const StyledButton = styled(Button)({
    marginTop: '16px',
  });
  
  const processors = [
    {
      value: 'Intel Core i5',
      label: 'Intel Core i5',
    },
    {
      value: 'Intel Core i7',
      label: 'Intel Core i7',
    },
    {
      value: 'Intel Core i9',
      label: 'Intel Core i9',
    },
    {
        value: 'Ryzen 3',
        label: 'Ryzen 3',
    },
    {
        value: 'Ryzen 5',
        label: 'Ryzen 5',
    },
    {
        value: 'Ryzen 7',
        label: 'Ryzen 7',
    },
  ];
  
  const graphicsCards = [
    {
      value: 'Nvidia GTX 1060',
      label: 'Nvidia GTX 1060',
    },
    {
      value: 'Nvidia RTX 2060',
      label: 'Nvidia RTX 2060',
    },
    {
      value: 'Nvidia RTX 3080',
      label: 'Nvidia RTX 3080',
    },
  ];
  
  const ramOptions = [
    {
      value: '8gb',
      label: '8GB',
    },
    {
      value: '16gb',
      label: '16GB',
    },
    {
      value: '32gb',
      label: '32GB',
    },
  ];
  
  const motherboardOptions = [
    {
      value: 'Asus',
      label: 'Asus',
    },
    {
      value: 'MSI',
      label: 'MSI',
    },
    {
      value: 'Gigabyte',
      label: 'Gigabyte',
    },
  ];
  
  const memoryOptions = [
    {
      value: '240 SSD',
      label: '240 SSD',
    },
    {
      value: '512GB HDD',
      label: '512GB HDD',
    },
  ];
  
  const fanOptions = [
    {
      value: 'Air',
      label: 'Air',
    },
    {
      value: 'Liquid',
      label: 'Liquid',
    },
  ];
  
  function PcBuilder() {
    const [selectedProcessor, setSelectedProcessor] = useState('');
    const [selectedGraphicsCard, setSelectedGraphicsCard] = useState('');
    const [selectedRam, setSelectedRam] = useState('');
    const [selectedMotherboard, setSelectedMotherboard] = useState('');
    const [selectedMemory, setSelectedMemory] = useState('');
    const [selectedFan, setSelectedFan] = useState('');
  
    const handleProcessorChange = (event) => {
      setSelectedProcessor(event.target.value);
    };
  
    const handleGraphicsCardChange = (event) => {
      setSelectedGraphicsCard(event.target.value);
    };
  
    const handleRamChange = (event) => {
      setSelectedRam(event.target.value);
    };
  
    const handleMotherboardChange = (event) => {
      setSelectedMotherboard(event.target.value);
    };
  
    const handleMemoryChange = (event) => {
      setSelectedMemory(event.target.value);
    };
  
    const handleFanChange = (event) => {
      setSelectedFan(event.target.value);
    };
  
    const navigate = useNavigate();
    const handleBuildClick = () => {
        if(!selectedProcessor)
        {
            notifyerror('Please Select Processor')
        }
        else if(!selectedGraphicsCard)
        {
            notifyerror('Please Select Graphics Card')
        }
        else if(!selectedRam)
        {
            notifyerror('Please Select Ram')
        }
        else if(!selectedMotherboard)
        {
            notifyerror('Please Select MotherBoard')
        }
        else if(!selectedMemory)
        {
            notifyerror('Please Select Memory')
        }
        else if(!selectedFan)
        {
            notifyerror('Please Select Cooling')
        }
        
        else{



Swal.fire({
  title: 'Are you sure?',
  text: "Might Change your mind!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Build it!'
}).then((result) => {
  if (result.isConfirmed) {
    const pcbuild = {
        processor : selectedProcessor,
        gcard : selectedGraphicsCard,
        ram : selectedRam,
        motherboard : selectedMotherboard,
        memory :selectedMemory,
        Fan: selectedFan


    }
    localStorage.setItem('pcbuild',JSON.stringify(pcbuild))
   navigate('/build-success')
  }
})
        }
};

return (
    <Root>
    <Grid container spacing={2}>
    <Grid item xs={12}>
    <StyledPaper>
    <Typography variant="h4">PC Builder by DevLin</Typography>
    <Typography variant="subtitle1">Select components to build your dream PC</Typography>
    </StyledPaper>
    </Grid>
    <Grid item xs={12}>
    <StyledPaper>
    <StyledTextField
               select
               label="Select Processor"
               value={selectedProcessor}
               onChange={handleProcessorChange}
               variant="outlined"
               fullWidth
               required
             >
    {processors.map((option) => (
    <MenuItem key={option.value} value={option.value}>
    {option.label}
    </MenuItem>
    ))}
    </StyledTextField>
    <StyledTextField
               select
               label="Select Graphics Card"
               value={selectedGraphicsCard}
               onChange={handleGraphicsCardChange}
               variant="outlined"
               fullWidth
             >
    {graphicsCards.map((option) => (
    <MenuItem key={option.value} value={option.value}>
    {option.label}
    </MenuItem>
    ))}
    </StyledTextField>
    <StyledTextField
               select
               label="Select RAM"
               value={selectedRam}
               onChange={handleRamChange}
               variant="outlined"
               fullWidth
             >
    {ramOptions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
    {option.label}
    </MenuItem>
    ))}
    </StyledTextField>
    <StyledTextField
               select
               label="Select Motherboard"
               value={selectedMotherboard}
               onChange={handleMotherboardChange}
               variant="outlined"
               fullWidth
             >
    {motherboardOptions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
    {option.label}
    </MenuItem>
    ))}
    </StyledTextField>
    <StyledTextField
               select
               label="Select Memory"
               value={selectedMemory}
               onChange={handleMemoryChange}
               variant="outlined"
               fullWidth
             >
    {memoryOptions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
    {option.label}
    </MenuItem>
    ))}
    </StyledTextField>
    <StyledTextField
               select
               label="Select Fan"
               value={selectedFan}
               onChange={handleFanChange}
               variant="outlined"
               fullWidth
             >
    {fanOptions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
    {option.label}
    </MenuItem>
    ))}
    </StyledTextField>
    <StyledButton variant="contained" color="primary" onClick={handleBuildClick}>
    Build
    </StyledButton>
    </StyledPaper>
    </Grid>
    </Grid>
    </Root>
    );
    }
    
    export default PcBuilder;