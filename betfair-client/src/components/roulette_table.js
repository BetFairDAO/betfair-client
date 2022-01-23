/**
 * table.js
 * 
 * This defines a react component containing all roulette table graphics & features.
 */

import { Grid, Button } from "@mui/material";
import { Wheel } from "react-custom-roulette";

function RouletteTable(props) {
    const wheelData = [
        { option: '32', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '15', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '19', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '4', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '21', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '2', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '25', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '17', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '34', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '6', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '27', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '13', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '36', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '11', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '30', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '8', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '23', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '10', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '5', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '25', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '16', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '33', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '1', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '20', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '14', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '31', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '9', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '22', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '18', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '29', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '7', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '28', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '12', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '35', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: '3', style: { backgroundColor: 'red', textColor: 'white' } },
        { option: '26', style: { backgroundColor: 'black', textColor: 'white' } },
    ];

    let bettingButtons = [];
    for (let i = 1; i <= 36; i++) {
        bettingButtons.push(
            <Grid item xs={6} md={1}>
                <Button variant="outlined">{i}</Button>
            </Grid>
        )
    }
    return (
        <div className="roulette-table">
            <div id="wheel-placeholder">
                <Wheel
                    mustStartSpinning={true}
                    prizeNumber={3}
                    data={wheelData}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']}
                    innerRadius={50}
                    textDistance={75}
                />
            </div>
            <div id="betting-zone-placeholder">
                <Grid container spacing={2}>
                    {bettingButtons}
                </Grid>
            </div>
        </div>
    )
}

export default RouletteTable;