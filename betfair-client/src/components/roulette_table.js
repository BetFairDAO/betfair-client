/**
 * table.js
 * 
 * This defines a react component containing all roulette table graphics & features.
 */

import { Grid, Button, autocompleteClasses } from "@mui/material";
import { Box } from "@mui/system";
import { Wheel } from "react-custom-roulette";
import { ROULETTE_WHEEL, ROULETTE_WHEEL_COLOURS } from "../utils/roulette_config";
import Chat from "./chat";

function RouletteTable(props) {
    // Used as input for the react-custom-roulette wheel component
    let wheelData = [];
    for (let num of ROULETTE_WHEEL) {
        wheelData.push({
            option: `${num}`,
            style: {backgroundColor: ROULETTE_WHEEL_COLOURS[num]}
        });
    }

    // Generate an array of vertically-arrange 3-button groups
    let bettingButtons = [];
    for (let num = 1; num <= ROULETTE_WHEEL.length; num += 3) {
        let buttons = [];
        for (let j = 0; j < 3; j++) {
            let currNum = num + j;
            buttons.push(
                <Box 
                    sx={{
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

    // Add 3 button group to end of betting buttons array containing row bets
    bettingButtons.push(
        <div className="roulette-button-group wide">
            <Box key="first-row" sx={{height: 75, backgroundColor: "#808080"}}className="roulette-number-box">2:1</Box>
            <Box key="second-row" sx={{height: 75, backgroundColor: "#808080"}}className="roulette-number-box">2:1</Box>
            <Box key="third-row" sx={{height: 75, backgroundColor: "#808080"}}className="roulette-number-box">2:1</Box>
        </div>
    );

    // Add additional betting buttons below numbers and row selectors
    let numRangeSelectors = [
        <Box sx={{width: "30%", height: 50, backgroundColor: "#808080"}}className="roulette-number-box">1st 12</Box>,
        <Box sx={{width: "30%", height: 50, backgroundColor: "#808080"}}className="roulette-number-box">2nd 12</Box>,
        <Box sx={{width: "30%", height: 50, backgroundColor: "#808080"}}className="roulette-number-box">3rd 12</Box>
    ];

    let evenSelectors = [
        <Box sx={{height: 50, backgroundColor: "#808080"}}className="roulette-number-box even-selector">0-18</Box>,
        <Box sx={{height: 50, backgroundColor: "#808080"}}className="roulette-number-box even-selector">Even</Box>,
        <Box sx={{height: 50, backgroundColor: "#DAA520"}}className="roulette-number-box even-selector">Gold</Box>,
        <Box sx={{height: 50, backgroundColor: "#000000"}}className="roulette-number-box even-selector">Black</Box>,
        <Box sx={{height: 50, backgroundColor: "#808080"}}className="roulette-number-box even-selector">Odd</Box>,
        <Box sx={{height: 50, backgroundColor: "#808080"}}className="roulette-number-box even-selector">19-36</Box>
    ]
    let bettingZone = (
        <div id="betting-zone">
            <div id="roulette-numbers">
                {bettingButtons}
            </div>
            <div className="d-flex flex-row">
                {numRangeSelectors}
            </div>
            <div className="d-flex flex-row">
                {evenSelectors}
            </div>
        </div>

    );

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
                    {bettingZone}
                </div>
            </Grid>
            <Grid item xs={3}>
                <Chat />
            </Grid>
        </Grid>
    )
}

export default RouletteTable;