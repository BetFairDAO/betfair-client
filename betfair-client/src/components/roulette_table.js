/**
 * roulette_table.js
 * 
 * This defines a react component containing all roulette table graphics & features.
 */

import { useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Wheel } from "react-custom-roulette";
import { ROULETTE_WHEEL, ROULETTE_WHEEL_COLOURS } from "../utils/roulette_config";
import Chat from "./chat";
import RouletteBox from "./RouletteBox";
import RouletteChipSelectors from "./RouletteChipSelectors";

function RouletteTable(props) {
    const [activeBets, setActiveBets] = useState([]); // State to maintain list of active bets
    const [selectedZone, setSelectedZone] = useState(); // State to hold details of zone clicked by user
    const [selectedChip, setSelectedChip] = useState();

    /**
     * Helper function to update activeBets state with newly created bet
     * @param {Array<Number>} nums 
     */
    function makeBet(nums) {
        if (selectedChip !== undefined) {
            let newBet = {
                nums: nums,
                betValue: selectedChip
            }
            console.log(newBet);
            let updatedActiveBets = [...activeBets, newBet];
            setActiveBets(updatedActiveBets);
        }
    }
    

    /**
     * Helper function to identify & place the appropriate bet based on the square & zone selected
     * @param {Number} x X-Coordinate of square that is clicked
     * @param {Number} y Y-Coordinate of square that was clicked
     * @param {String} zone Zone identieir (upper-left, upper-center, upper-right, mid-left, mid-center, mid-right, lower-left, lower-center, lower-right)
     * @param {Number} squareNum Number value of the square that was clicked
     */
    function handleZoneClick(x, y, zone, squareNum) {
        // If a betting zone has been clicked, make the bet
        if (zone === "upper-left") {
            // Check if square is a corner or edge
            if (x === 0) {
                // Left-hand-size column of numbers
                if (y === 2) {
                    makeBet([squareNum]);
                } else {
                    // Bet includes current square & above square
                    makeBet([squareNum, squareNum+1]);
                }
            } else {
                if (y === 2) {
                    // On top edge -> get value to the left
                    makeBet([squareNum, squareNum-3])
                } else {
                    // In the middle or at the bottom -> get upper, left, and upper-left
                    makeBet([squareNum, squareNum+1, squareNum-3, squareNum-2]);
                }
            }
        } else if (zone === "upper-center") {
            if (y === 2) {
                makeBet([squareNum]);
            } else {
                makeBet([squareNum, squareNum+1]);
            }
        } else if (zone === "upper-right") {
            if (x === 11) {
                if (y === 2) {
                    makeBet([squareNum]);
                } else {
                    makeBet([squareNum, squareNum+1]);
                }
            } else {
                if (y === 2) {
                    makeBet([squareNum, squareNum+3]);
                } else {
                    makeBet([squareNum, squareNum+1, squareNum+3, squareNum+4]);
                }
            }
        } else if (zone === "mid-left") {
            if (x === 0) {
                makeBet([squareNum]);
            } else {
                makeBet([squareNum, squareNum-3]);
            }
        } else if (zone === "mid-center") {
            makeBet([squareNum]);
        } else if (zone === "mid-right") {
            if (x === 11) {
                makeBet([squareNum]);
            } else {
                makeBet([squareNum, squareNum+3]);
            }
        } else if (zone === "lower-left") {
            if (x === 0) {
                if (y === 0) {
                    makeBet([squareNum]);
                } else {
                    makeBet([squareNum, squareNum-1]);
                }
            } else {
                if (y === 0) {
                    makeBet([squareNum, squareNum-3]);
                } else {
                    makeBet([squareNum, squareNum-1, squareNum-3, squareNum-4]);
                }
            }
        } else if (zone === "lower-center") {
            if (y === 0) {
                makeBet([squareNum]);
            } else {
                makeBet([squareNum, squareNum-1])
            }
        } else if (zone === "lower-right") {
            if (x === 11) {
                if (y === 0) {
                    makeBet([squareNum]);
                } else {
                    makeBet([squareNum, squareNum-1]);
                }
            } else {
                if (y === 0) {
                    makeBet([squareNum, squareNum-3]);
                } else {
                    makeBet([squareNum, squareNum-1, squareNum+3, squareNum+2]);
                }
            }
        }
    }

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
                <RouletteBox y={j} x={(num-1)/3} handleZoneClick={handleZoneClick} color={ROULETTE_WHEEL_COLOURS[currNum]} num={currNum} />
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
            <div className="d-flex flex-row justify-content-center mt-3">
                <RouletteChipSelectors selected={selectedChip} setSelected={setSelectedChip} />
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