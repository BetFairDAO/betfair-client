/**
 * table.js
 * 
 * This defines a react component containing all roulette table graphics & features.
 */

import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Wheel } from "react-custom-roulette";
import { ROULETTE_WHEEL, ROULETTE_WHEEL_COLOURS } from "../utils/roulette_config";
import Chat from "./chat";

function RouletteTable(props) {
    let wheelData = [];
    for (let num of ROULETTE_WHEEL) {
        wheelData.push({
            option: `${num}`,
            style: {backgroundColor: ROULETTE_WHEEL_COLOURS[num]}
        });
    }

    let bettingButtons = [];
    for (let num = 1; num <= ROULETTE_WHEEL.length; num += 3) {
        let buttons = [];
        for (let j = 0; j < 3; j++) {
            let currNum = num + j;
            buttons.push(
                <Box 
                    sx={{
                        width: 75,
                        height: 75,
                        backgroundColor: ROULETTE_WHEEL_COLOURS[currNum],
                    }}
                    className="roulette-number-box"
                >{currNum}</Box>
            )
        }
        bettingButtons.push(
            <div className="roulette-button-group">{buttons}</div>
        );
    }
    return (
        <Grid container>
            <Grid item xs={9}>
                <div className="roulette-table">
                    <div id="wheel-placeholder">
                        <Wheel
                            mustStartSpinning={true}
                            prizeNumber={3}
                            data={wheelData}
                            textColors={['#ffffff']}
                            innerRadius={50}
                            textDistance={75}
                            outerBorderWidth={2}
                        />
                    </div>
                    <div id="betting-zone">
                        <div id="roulette-numbers">
                            {bettingButtons}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={3}>
                <Chat />
            </Grid>
        </Grid>
    )
}

export default RouletteTable;