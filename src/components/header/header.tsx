import React from 'react';
import { Avatar, Grid, Menu, MenuItem, Typography, Hidden, Container, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { logo } from '../../assets/icons';
import { getUsernameLogo } from '../../utils/getUsername';
import routes from '../../constants/routes';
import { styles } from './styles';
import Tabs from '../tab/tab';
import Notification from '../../assets/icons/Notification.svg';
import { useHistory } from 'react-router-dom';
import { routePath } from '../../constants/routes';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Drawer from '../drawer/drawer';
import Modal from '../modal/modal';
import Preference from '../../pages/home/preference-modal';
import { authProvider } from '../../utils/authProvider';

const Header = () => {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const [expanded, setExpanded] = React.useState(false);
    const [preferenceModal, setPreferenceModal] = React.useState(false);
    const auth = authProvider();
    const history = useHistory();
    const username = getUsernameLogo(auth.name);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        auth.logout();
    };

    const redirectToHome = () => {
        history.push(routePath.home.index);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.header} role="header">
            <Container maxWidth="lg">
                <Grid container justify="space-between">
                    <Grid item md={2} sm={3} className={classes.logoHeaderContainer}>
                        <img src={logo} className={classes.logoContainer} onClick={() => redirectToHome()} />
                        <Typography gutterBottom variant="subtitle1" className={classes.logoSubTitle1} noWrap>
                            Produce Quality Control
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" className={classes.logoSubTitle2} noWrap>
                            Reporting (QCR)
                        </Typography>
                    </Grid>
                    <Grid item md={7} sm={2}>
                        <Hidden smDown>
                            <Tabs tabClassName={classes.tabs} list={routes} variant="scrollable" />
                        </Hidden>
                    </Grid>
                    <Grid item md={1} sm={2}>
                        <img src={Notification} className={classes.notify} />
                    </Grid>
                    <Grid item md={2} sm={5} onClick={handleClick}>
                        <Avatar className={classes.avatar}>{username?.logo}</Avatar>
                        <div className={classes.username}>{username?.name}</div>
                        <div className={classes.role}>Admin</div>
                    </Grid>
                    <Grid item xs={12}>
                        <Hidden mdUp>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <DehazeIcon />
                            </IconButton>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Drawer routes={routes}></Drawer>
                            </Collapse>
                        </Hidden>
                    </Grid>
                </Grid>
            </Container>
            <Menu
                classes={{ paper: classes.menuWrapper }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Tooltip
                    title={
                        history.location.pathname !== '/Home' ? 'To set a division please navigate to home screen ' : ''
                    }
                >
                    <span>
                        <MenuItem
                            disabled={history.location.pathname !== '/Home'}
                            onClick={() => setPreferenceModal(true)}
                        >
                            Preference
                        </MenuItem>
                    </span>
                </Tooltip>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <Modal
                maxWidth={'sm'}
                title="Preferences"
                content={<Preference setModalStatus={setPreferenceModal} />}
                modalStatus={preferenceModal}
                setModalStatus={setPreferenceModal}
            />
        </div>
    );
};
export default Header;
