/**
 * roulette_table.js
 * 
 * This defines a react component containing all roulette table graphics & features.
 */

import { useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Wheel } from "react-custom-roulette";
import { ROULETTE_COLOURS, ROULETTE_WHEEL, ROULETTE_WHEEL_COLOURS } from "../utils/roulette_config";
import Chat from "./chat";
import RouletteBox from "./RouletteBox";
import RouletteSingleBox from "./RouletteSingleBox";
import RouletteChipSelectors from "./RouletteChipSelectors";

function BetIndicator(props) {
    return (
        <div className="bet-indicator">
            <Grid container>
                <Grid item xs={2}>
                    {props.id}
                </Grid>
                <Grid item xs={3}>
                    {props.nums.join(", ")}
                </Grid>
                <Grid item xs={2}>
                    {props.betValue} ODC
                </Grid>
                <Grid item xs={2}>
                    2:1
                </Grid>
                <Grid item xs={3}>
                    200 ODC
                </Grid>
            </Grid>
        </div>
    )
}

/**
 * Main game component to hold all game states & render wheel + betting zone
 * @param props 
 * @returns 
 */
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

    function handleRowSelectorClick(y) {
        if (y === 2) {
            makeBet([3,6,9,12,15,18,21,24,27,30,33,36]);
        } else if (y === 1) {
            makeBet([2,5,8,11,14,17,20,23,26,29,32,35]);
        } else if (y === 0) {
            makeBet([1,4,7,10,13,16,19,22,25,28,31,34]);
        }
    }

    // Add 3 button group to end of betting buttons array containing row bets
    bettingButtons.push(
        <div className="roulette-button-group wide">
            <RouletteSingleBox key={2} height={75} handleClick={() => {handleRowSelectorClick(2)}} label="2:1" />
            <RouletteSingleBox key={1} height={75} handleClick={() => {handleRowSelectorClick(1)}} label="2:1" />
            <RouletteSingleBox key={0} height={75} handleClick={() => {handleRowSelectorClick(0)}} label="2:1" />
        </div>
    );

    function handleColumnSelectorClick(x) {
        if (x === 0) {
            makeBet([1,2,3,4,5,6,7,8,9,10,11,12]);
        } else if (x === 1) {
            makeBet([13,14,15,16,17,18,19,20,21,22,23,24]);
        } else if (x === 2) {
            makeBet([25,26,27,28,29,30,31,32,33,34,35,36]);
        }
    }

    // Add additional betting buttons below numbers and row selectors
    let numRangeSelectors = [
        <RouletteSingleBox key={0} height={50} width="30%" handleClick={() => {handleColumnSelectorClick(0)}} label="1st 12" />,
        <RouletteSingleBox key={1} height={50} width="30%" handleClick={() => {handleColumnSelectorClick(1)}} label="2nd 12" />,
        <RouletteSingleBox key={2} height={50} width="30%" handleClick={() => {handleColumnSelectorClick(2)}} label="3rd 12" />
    ];

    const _0_18 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    const _19_36 = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
    const _EVEN = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
    const _ODD = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
    const _BLACK = [];
    const _GOLD = []

    // Read ROULETTE_WHEEL_COLOURS object and populate arrays
    for (let [num, colour] of Object.entries(ROULETTE_WHEEL_COLOURS)) {
        if (colour == ROULETTE_COLOURS.BLACK) {
            _BLACK.push(num);
        } else {
            _GOLD.push(num);
        }
    }

    let evenSelectors = [
        <RouletteSingleBox key={0} height={50} width="15%" handleClick={() => {makeBet(_0_18)}} label="1st 12" />,
        <RouletteSingleBox key={0} height={50} width="15%" handleClick={() => {makeBet(_EVEN)}} label="Even" />,
        <RouletteSingleBox key={0} height={50} width="15%" backgroundColor="#DAA520" handleClick={() => {makeBet(_GOLD)}} label="Gold" />,
        <RouletteSingleBox key={0} height={50} width="15%" backgroundColor="#000000" handleClick={() => {makeBet(_BLACK)}} label="Black" />,
        <RouletteSingleBox key={0} height={50} width="15%" handleClick={() => {makeBet(_ODD)}} label="Odd" />,
        <RouletteSingleBox key={0} height={50} width="15%" handleClick={() => {makeBet(_19_36)}} label="19-36" />
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

    let activeBetComponents = [];
    for (let i = 0; i < activeBets.length; i++) {
        let bet = activeBets[i];
        activeBetComponents.push(<BetIndicator id={i+1} betValue={bet.betValue} nums={bet.nums} key={i}/>)
    }

    return (
        <Grid container>
            <Grid item xs={9}>
                <div className="roulette-table">
                    <div className="upper-segment-wrapper">
                        <div className="active-bet-frame">
                            <h1 className="heading">Active Bets</h1>
                            <Grid container>
                            <Grid item xs={2}><span className="table-heading">Bet #</span></Grid>
                            <Grid item xs={3}><span className="table-heading">Bet Name</span></Grid>
                            <Grid item xs={2}><span className="table-heading">Amount</span></Grid>
                            <Grid item xs={2}><span className="table-heading">Odds</span></Grid>
                            <Grid item xs={3}><span className="table-heading">Max Payout</span></Grid>
                            </Grid>
                            {activeBetComponents}
                        </div>
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