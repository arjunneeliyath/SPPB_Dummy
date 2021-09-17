import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

interface AdminCard {
    name: string;
    imageurl: string;
    url?: string;
}
export const Cards: React.FC<AdminCard> = (props: AdminCard) => {
    const { imageurl, name } = props;
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.image}>
                        <img src={imageurl} />
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.title}>
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default Cards;
