import { Box } from "@mui/system";

/**
 * React component to render a single betting box with multiple click zones for various betting types
 * @param props 
 * @returns 
 */
export default function RouletteBox(props) {

    /**
     * Callback function to set selected zone state property to the most recent value
     * @param el 
     */
    function handleClick(el) {
        let target = el.target;
        let horizontal = "center";
        switch (target.className) {
            case "click-zone-left":
                horizontal = "left";
                break;
            case "click-zone-right":
                horizontal = "right";
                break;
        }
        let vertical = "mid";
        switch (target.parentElement.className) {
            case "inner-box-upper":
                vertical = "upper";
                break;
            case "inner-box-lower":
                vertical = "lower";
                break;
        }
        
        props.handleZoneClick(props.x, props.y, `${vertical}-${horizontal}`, props.num);
    }
    const id = `${props.x}-${props.y}`; // ID to store coordinates of current square
    return (
        <Box id={id} value={props.num} sx={{height: 75, backgroundColor: props.color}} className="roulette-number-box">
            <div className="inner-box-wrap">
                <div className="inner-box-upper">
                    <div onClick={handleClick} className="click-zone-left" />
                    <div onClick={handleClick} className="click-zone-center" />
                    <div onClick={handleClick} className="click-zone-right" />
                </div>
                <div className="inner-box-mid">
                <div onClick={handleClick} className="click-zone-left" />
                    <div onClick={handleClick} className="click-zone-center">
                        {props.num}
                    </div>
                    <div onClick={handleClick} className="click-zone-right" />
                </div>
                <div className="inner-box-lower">
                    <div onClick={handleClick} className="click-zone-left" />
                    <div onClick={handleClick} className="click-zone-center" />
                    <div onClick={handleClick} className="click-zone-right" />
                </div>
            </div>
        </Box>
    )
}