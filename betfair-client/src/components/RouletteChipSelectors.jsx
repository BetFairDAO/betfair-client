import { useState } from "react";
import { ROULETTE_CHIPS } from "../utils/roulette_config";
import RouletteChip from "./RouletteChip";

export default function RouletteChipSelectors(props) {

    let chipSelectors = [];
    let index = 0;
    for (const [num, color] of Object.entries(ROULETTE_CHIPS)) {
        chipSelectors.push(<RouletteChip key={index++} value={num} color={color} selected={props.selected} setSelected={props.setSelected}>{num}</RouletteChip>)
    }
    

    return (
        <div className="d-flex flex-row justify-content-center mt-3">
            {chipSelectors}
        </div>
    )
}