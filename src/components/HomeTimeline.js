import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {KeyboardIcon} from "@material-ui/pickers/_shared/icons/KeyboardIcon";
import {useMediaQuery} from "@material-ui/core";
import {getPosts, getUserById} from "../dataManager";
import {MusicNote, Videocam} from "@material-ui/icons";
import ReactAudioPlayer from "react-audio-player";
import {Player} from "video-react";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function HomeTimeline() {
    const posts = getPosts()

    const lg = useMediaQuery('(min-width:600px)')
    const classes = useStyles();
    return (
        <Timeline align={lg ? 'alternate' : 'left'}>
            {posts.map(post => <HomeItem post={post} />)}
            <TimelineItem>
                <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        10:00 am
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Code
                        </Typography>
                        <Typography>Because it&apos;s awesome!</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                        <HotelIcon />
                    </TimelineDot>
                    <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Sleep
                        </Typography>
                        <Typography>Because you need rest</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <RepeatIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                            Repeat
                        </Typography>
                        <Typography>Because this is the life you love!</Typography>
                    </Paper>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}


function HomeItem({post}){
    switch (post.type){
        case 'message':
            return(<HomeItemMessage post={post} />)
        case 'music':
            return(<HomeItemMusic post={post} />)
        case 'video':
            return(<HomeItemVideo post={post} />)
        default:
            return(<HomeItemMessage post={post} />)
    }
}
function HomeItemMessage({post}){
    const user = getUserById(post.createdBy)
    const classes = useStyles();
    return(
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {post.createdAt}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot>
                    <KeyboardIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                        {user.username}
                    </Typography>
                    <Typography>{post.message}</Typography>
                    <Typography><i className="fa fa-heart"></i> {post.likes} </Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}

function HomeItemMusic({post}){
    const classes = useStyles();
    const user = getUserById(post.createdBy)
    return(
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {post.createdAt}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color="primary">
                    <MusicNote />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                        {user.username}
                    </Typography>
                    <Typography>
                        {post.message}
                        <ReactAudioPlayer className="w-100" src={post.music_url} controls/>
                    </Typography>
                    <Typography><i className="fa fa-heart"></i> {post.likes} </Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}
function HomeItemVideo({post}){
    const classes = useStyles();
    const user = getUserById(post.createdBy)
    return(
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {post.createdAt}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color="outlinedPrimary">
                    <Videocam />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                        {user.username}
                    </Typography>
                    <Typography>
                        {post.message}
                        <div className="rounded overflow-hidden pb-3">
                            <Player playsInline  src={post.video_url}/>
                        </div>
                    </Typography>
                    <Typography><i className="fa fa-heart"></i> {post.likes} </Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}
