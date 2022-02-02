import './InputForm.css';
import { TextField, Box, Grid } from '@mui/material';
import * as React from 'react'

export default function DisplayForm() {
    const [format, setFormat] = React.useState("Mod note: Time starts at <start> and ends at <end>, at <framerate> fps.\nRetimed using https://nick-ncsu.github.io/retime/");
    const [modifier, setModifier] = React.useState(0);
    const [framerate, setFramerate] = React.useState(0);
    const [start, setStart] = React.useState("");
    const [end, setEnd] = React.useState("");
    const [startTime, setStartTime] = React.useState("0:0:0:000");
    const [endTime, setEndTime] = React.useState("0:0:0:000");
    const [elapsedTime, setElapsedTime] = React.useState("0:0:0:000");
    const [comment, setComment] = React.useState("");
    const [startms, setStartms] = React.useState(0);
    const [endms, setEndms] = React.useState(0);

    const updateFormat = (event) => {
        setFormat(event.target.value);
    };

    const updateModifier = (event) => {
        setModifier(event.target.value);
    };

    const updateFramerate = (event) => {
        setFramerate(event.target.value);
    };

    const updateStart = (event) => {
        setStart(event.target.value);
    };

    const updateEnd = (event) => {
        setEnd(event.target.value);
    };

    React.useEffect(() => {
        if (start) {
            let temp = JSON.parse(start).cmt;
            if (framerate && temp.length) {
                setStartms((temp - (temp % (1 / framerate))).toFixed(3) * 1000);
                setStartTime(new Date(startms - (modifier * 1000)).toISOString().slice(11, -1));
            }
        }
        if (end) {
            let temp = JSON.parse(end).cmt;
            if (framerate && temp.length) {
                setEndms((temp - (temp % (1 / framerate))).toFixed(3) * 1000);
                setEndTime(new Date(endms).toISOString().slice(11, -1));
            }
        }
        if (framerate && startms && endms) {
            setElapsedTime(new Date(endms + (modifier * 1000) - startms).toISOString().slice(11, -1));
            setComment(format.replace(/<start>/g, startTime).replace(/<end>/g, endTime).replace(/<framerate>/g, framerate));
        }
    }, [start, end, framerate, startms, endms, modifier, endTime, format, startTime]);

    return (
        <div className='form'>
            <Box
                sx={{
                    border: '1px solid grey', p: 2
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="stretch"
                    columnSpacing={3}
                >
                    <Grid container direction="column" justifyContent="space-between" spacing={3} item xl={6}>
                        <Grid item>
                            <TextField
                                id="framerate"
                                label="Framerate"
                                type="number"
                                value={framerate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateFramerate}
                                required
                                fullWidth
                                margin='55px'
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="modifier"
                                label="Modifier"
                                type="number"
                                value={modifier}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateModifier}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="sFrame"
                                label="Start Frame"
                                value={start}
                                onChange={updateStart}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="eFrame"
                                label="End Frame"
                                value={end}
                                onChange={updateEnd}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="format"
                                label="Format"
                                multiline
                                rows={8}
                                value={format}
                                onChange={updateFormat}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justifyContent="space-between" item xl={6}>
                        <Grid item>
                            <Box display="flex" justifyContent="flex-end">
                                <img src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="YouTube Banner Logo" style={{ height: "3em" }} />
                                <img src="https://connect.elo.io/blob/BRcfB9CUanCYKNp2iahVh2sYhX9VBtcYhVcS5a-7K2sOK+QNi1D3i1hsi+cGva0E?q=70" alt="Speedrun.com Logo" style={{ height: "3em" }} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="start"
                                label="Start Time"
                                value={startTime}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="end"
                                label="End Time"
                                value={endTime}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="time"
                                label="Elapsed Time"
                                value={elapsedTime}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="comment"
                                label="Mod Comment"
                                multiline
                                rows={8}
                                value={comment}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <footer style={{ textAlign: "center" }}>
                <p>
                    Made by:
                    <a href="https://nick-ncsu.github.io/">Nick-NCSU</a>
                    | <a href="https://github.com/Nick-NCSU/retime">View Source</a>
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt='GitHub Logo' style={{ height: "2em" }} />
                </p>
            </footer>
        </div>
    );
}