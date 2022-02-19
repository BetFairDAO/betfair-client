import { Box } from "@mui/material";

export default function RouletteSingleBox(props) {
    return (
        <Box sx={{height: props.height, width: props.width || "auto", backgroundColor: props.backgroundColor || "#808080"}}className="roulette-number-box">
            <div onClick={props.handleClick} className="inner-box-wrap">
                {props.label}
            </div>
        </Box>
    )
}