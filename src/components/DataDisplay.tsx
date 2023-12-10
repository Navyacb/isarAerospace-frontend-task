import { Typography } from "@mui/material"

export const DataDisplay = (props:any)=>{
    const {label,data} = props

    return(
        <div>
            <Typography variant="h6" gutterBottom>
                <b>{label}</b>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {data}
            </Typography>
        </div>
    )
}