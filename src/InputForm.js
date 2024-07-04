import './InputForm.css';
import { TextField, Box, Grid } from '@mui/material';
import * as React from 'react'
import { IconButton } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ReactGA from 'react-ga4';

export default function DisplayForm() {
    const [format, setFormat] = React.useState("Mod note: Time starts at <start> and ends at <end>, at <framerate> fps.\nRetimed using https://nick-ncsu.github.io/retime/");
    const [modifier, setModifier] = React.useState(0);
    const [alignment, setAlignment] = React.useState("60");
    const [framerate, setFramerate] = React.useState(60);
    const [framerateDisabled, setFramerateDisabled] = React.useState(true);
    const [start, setStart] = React.useState("");
    const [validStart, setValidStart] = React.useState(true);
    const [end, setEnd] = React.useState("");
    const [validEnd, setValidEnd] = React.useState(true);
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

    const changeFramerate = (event, newAlignment) => {
        setAlignment(newAlignment);
        if(!isNaN(+event.target.value)) {
            setFramerateDisabled(true);
            setFramerate(+event.target.value);
        } else {
            setFramerateDisabled(false);
        }
    };

    React.useEffect(() => {
        if (start) {
            let startInfo;
            try {
                startInfo = JSON.parse(start).cmt;
                setValidStart(true);
            } catch (err) {
                startInfo = "";
                setValidStart(false);
            }
            if (framerate && startInfo.length) {
                setStartms((startInfo - (startInfo % (1 / framerate))) * 1000);
                setStartTime(new Date(Math.round(startms) - (modifier * 1000)).toISOString().slice(11, -1));
            }
        }
        if (end) {
            let endInfo;
            try {
                endInfo = JSON.parse(end).cmt;
                setValidEnd(true);
            } catch (err) {
                endInfo = "";
                setValidEnd(false);
            }
            if (framerate && endInfo.length) {
                setEndms((endInfo - (endInfo % (1 / framerate))) * 1000);
                setEndTime(new Date(Math.round(endms)).toISOString().slice(11, -1));
            }
        }
        if (framerate && startms && endms) {
            setElapsedTime(new Date(Math.round(endms + (modifier * 1000) - startms)).toISOString().slice(11, -1));
            setComment(format.replace(/<start>/g, startTime).replace(/<end>/g, endTime)
                .replace(/<framerate>/g, framerate).replace(/<total>/g, elapsedTime));
        }
    }, [start, end, framerate, startms, endms, modifier, endTime, format, startTime, elapsedTime]);

    ReactGA.initialize('G-1E2WKQ764W');
    ReactGA.send({
      hitType: 'pageview',
      page: '/retime',
      title: 'Retime',
    });

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
                        <Grid container direction="row" spacing={3} item>
                            <Grid item>
                                <ToggleButtonGroup
                                    color="standard"
                                    value={alignment}
                                    exclusive
                                    onChange={changeFramerate}
                                    style={{height:'100%'}}
                                >
                                    <ToggleButton value="25">25</ToggleButton>
                                    <ToggleButton value="30">30</ToggleButton>
                                    <ToggleButton value="60">60</ToggleButton>
                                    <ToggleButton value="Custom">Custom</ToggleButton>

                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="framerate"
                                    label="Framerate"
                                    type="number"
                                    value={framerate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={updateFramerate}
                                    disabled={framerateDisabled}
                                    required
                                    fullWidth
                                />
                            </Grid>
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
                        <Grid container direction="row" item>
                            <Grid item xs={11}>
                                <TextField
                                    id="sFrame"
                                    label="Start Frame"
                                    value={start}
                                    onChange={updateStart}
                                    error={!validStart}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={async () => {
                                    setStart(await navigator.clipboard.readText());
                                }}>
                                    <ContentPasteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" item>
                            <Grid item xs={11}>
                                <TextField
                                    id="eFrame"
                                    label="End Frame"
                                    value={end}
                                    onChange={updateEnd}
                                    error={!validEnd}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={async () => {
                                    setEnd(await navigator.clipboard.readText());
                                }}>
                                    <ContentPasteIcon />
                                </IconButton>
                            </Grid>
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
                            <Box flexDirection="row" display="flex" justifyContent="flex-end">
                                <img src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="YouTube Banner Logo" style={{ height: "3em" }} />
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