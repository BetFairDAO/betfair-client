import { useState } from "react";
import { Box } from "@mui/system";

/**
 * Component for a single chip selector
 * @param props 
 * @returns 
 */
export default function RouletteChip(props) {
    function handleClick() {
        if (props.value !== props.selected) {
            props.setSelected(props.value);
        }
    }

    let className = "chip-placeholder";
    if (props.value === props.selected) {
        className = className + " selected";
    }

    return (
        <Box sx={{height: 75, backgroundColor: '#ffffff', borderColor: props.color}} onClick={handleClick} className={className}>{props.value}</Box>
    )
}