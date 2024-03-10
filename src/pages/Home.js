import * as React from 'react';
import { Box, Button, FilledInput, FormControl, InputLabel, Typography } from '@mui/material';

import style from './modules/styles/styles';
import withRoot from './modules/styles/withRoot';

import * as web3 from '@solana/web3.js';

function Home() {
    const css = style();
    const [balance, setBalance] = React.useState(0);
    const [address, setAddress] = React.useState('');
    const handleAddress = (event) => {
        setAddress(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        addressSubmittedHander(address);
    }
    const addressSubmittedHander = (address) => {
        try {
            const key = new web3.PublicKey(address)
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
            connection.getBalance(key).then(balance => {
              setBalance(balance / web3.LAMPORTS_PER_SOL)
            })
          } catch (error) {
            setBalance(0)
            alert(error)
          }
    }
    return (
        <>
            <Box sx={{...css.homeBody}}>
                <Box sx={{...css.solCheckerContainer}}>
                    <Typography variant='h1' sx={{mb: 2}}>
                        Solana Balance Checker
                    </Typography>
                    <Typography variant='h2' sx={{whiteSpace: 'nowrap', mb: 2}}>
                        Provide Address:
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl variant='filled' fullWidth>
                            <InputLabel>
                                e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp
                            </InputLabel>
                            <FilledInput onChange={handleAddress} value={address}/>
                        </FormControl>     
                        <Button type='submit' fullWidth sx={{my: 2}}>
                            Check Sol Balance
                        </Button>
                    </form>
                    <Typography variant='h4'>
                        {`Balance: ${balance} SOL`}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default withRoot(Home);