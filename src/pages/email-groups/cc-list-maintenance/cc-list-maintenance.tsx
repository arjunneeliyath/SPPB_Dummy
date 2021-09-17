import React, { Dispatch, useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { IReduxState } from '../../../modules/store';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Grid, Box } from '@material-ui/core';
import { useStyles } from './styles';
import MultiCheckboxTable from '../../../components/muti-checkbox-table/multi-checkbox-table';
import _ from 'lodash';
import {
    getAllCcMailAddressMaintenanceList,
    updateCcMailAddress,
} from '../../../modules/email-groups/cc-list-maintenance/cc-list-maintenance';
import { ICcListMailMaintenance } from '../../../interfaces/email-groups/cc-list-maintenance/cc-list-maintenance';
import { useHistory } from 'react-router-dom';
import CircularIndeterminate from '../../../components/busy-indicator/busy-indicator';
interface IUpdateProps {
    ccMailAddressList: ICcListMailMaintenance[];
    updateCcMailAddress: (ccMailAddress: ICcListMailMaintenance[]) => void;
    getCcMailAddressMaintenanceList: () => void;
}

export interface ISelectedNum {
    numSelected: number;
    prop: string;
}

interface ITitles {
    prop: string;
    name: string;
    isRequired?: boolean;
    type?: string;
    checkDuplicate?: boolean;
    width?: string;
}

const titles: ITitles[] = [
    { prop: 'doRemove', name: 'Remove', width: '10%' },
    {
        prop: 'emailAddress',
        name: 'CC Mail Address',
        isRequired: true,
        type: 'email',
        checkDuplicate: true,
        width: '80%',
    },
    { prop: 'doValidate', name: 'Validate', width: '10%' },
];

const ccListMaintenance = (props: IUpdateProps) => {
    const { updateCcMailAddress, getCcMailAddressMaintenanceList, ccMailAddressList } = props;

    const [emailAddresses, setEmailAddresses] = useState<ICcListMailMaintenance[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [renderOn, setRenderOn] = useState(-1);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getCcMailAddressMaintenanceList();
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (isLoading) {
            setEmailAddresses(ccMailAddressList);
            setIsLoading(false);
        }
    }, [ccMailAddressList]);

    useEffect(() => {
        if (emailAddresses?.length > 0) {
            setDuplicateName('emailAddress');
        }
    }, [renderOn]);

    useEffect(() => {
        if (emailAddresses?.length > 0) {
            // Compare the 'old emailAddresses' array and the 'new emailAddresses' array,
            // (If any changes are made in the table cells and
            // the length of both arrays are equal) and if the arrays are
            // not equal, return the distinct array object.
            const strippedEmailAdrsProps = stripRows(ccMailAddressList);
            const strippedEmailAdrsState = stripRows(emailAddresses);
            if (_.differenceWith(strippedEmailAdrsProps, strippedEmailAdrsState, _.isEqual)?.length > 0) {
                setIsModified(true);
                // If the length of both arrays are not equal, find the distinct array
                // object and check whether the distict objects are not empty.
            } else if (strippedEmailAdrsProps.length !== strippedEmailAdrsState.length) {
                const results = strippedEmailAdrsProps.filter(
                    ({ id: id1 }) => !strippedEmailAdrsState.some(({ id: id2 }) => id2 === id1)
                );
                setIsModified(!results.some((row) => row.emailAddress === ''));
            } else {
                setIsModified(false);
            }
        }
    }, [emailAddresses]);

    const addRows = () => {
        const row: ICcListMailMaintenance = {
            id: emailAddresses?.length + 1,
            emailAddress: '',
            doRemove: false,
            doValidate: false,
        };

        const rows = [...emailAddresses, row];
        setEmailAddresses(rows);
    };

    const stripRows = (data: ICcListMailMaintenance[]) => {
        return _.map(data, (row) => {
            return _.omit(row, [
                'isMailDuplicate',
                'isNameDuplicate',
                'doValidate',
                !row.doRemove ? 'doRemove' : '',
                'isSafewayMail',
            ]);
        });
    };

    const handleRowInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        name: string,
        index: number
    ) => {
        const { value } = event.target;
        if (name === 'emailAddress') {
            if (emailAddresses[index].doValidate) {
                isSafewayMailId(value, index);
            } else {
                isMailId(value, index);
            }
        }
        reRenderEmailAddress(index, name, value);
        setRenderOn(Date.now());
    };

    const resetTable = () => {
        const initialValues = ccMailAddressList?.map((email) => ({
            ...email,
            ['doRemove']: false,
            ['doValidate']: false,
        }));
        setEmailAddresses(initialValues);
    };

    const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, name: string, index: number) => {
        const { checked } = event.target;
        if (checked) {
            isSafewayMailId(emailAddresses[index].emailAddress, index);
        } else {
            isMailId(emailAddresses[index].emailAddress, index);
        }
        reRenderEmailAddress(index, name, checked);
    };

    const isSafewayMailId = (email: string, index: number) => {
        let domain = '';
        if (email !== null || email !== '') {
            domain = email.indexOf('@') !== -1 ? email.substring(email.indexOf('@') + 1, email.length).trim() : '';
            reRenderEmailAddress(index, 'isSafewayMail', domain.includes('safeway.com'));
        }
    };

    const isMailId = (email: string, index: number) => {
        const atposition = email.indexOf('@');
        const dotposition = email.lastIndexOf('.');
        const isValid = !(atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length);
        if (email !== null || email !== '') {
            reRenderEmailAddress(index, 'isValidMail', isValid);
        }
    };

    const reRenderEmailAddress = (index: number, name: string, value: any) => {
        setEmailAddresses((state) => state.map((row, j) => (j === index ? { ...row, [name]: value } : row)));
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, name: any) => {
        const { checked } = event.target;
        const selectAll = emailAddresses.map((row) => ({
            ...row,
            [name.prop]: checked,
            ['isSafewayMail']: (row.emailAddress.indexOf('@') !== -1
                ? row.emailAddress.substring(row.emailAddress.indexOf('@') + 1, row.emailAddress.length).trim()
                : ''
            ).includes('safeway.com'),
        }));
        setEmailAddresses([...selectAll]);
    };

    const onUpdateCcMailClick = () => {
        const idStripedRows = _.map(emailAddresses, (row) => {
            return _.omit(row, ['id']);
        });
        updateCcMailAddress(idStripedRows);
        setIsLoading(true);
    };

    const setDuplicateName = (name: string) => {
        const valueArr = emailAddresses.map((item: any, i: number) => {
            return { [name]: item[name], index: i };
        });
        setEmailAddresses((state) =>
            state.map((row) => ({
                ...row,
                ['isMailDuplicate']:
                    valueArr.filter((item) => {
                        return (
                            row.emailAddress?.trim() !== '' &&
                            item[name].trim()?.toLowerCase() === row.emailAddress?.trim()?.toLowerCase()
                        );
                    }).length > 1,
            }))
        );
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box className={classes.boxStyle}>
                    <Grid container>
                        <Grid item xs={12} className={classes.rowContainer}>
                            <Grid container direction="column">
                                {isLoading ? (
                                    <CircularIndeterminate />
                                ) : (
                                    <Grid className={classes.gridContainer}>
                                        <MultiCheckboxTable
                                            addButton={
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={addRows}
                                                    className={classes.addButton}
                                                >
                                                    Add CC Mail Address
                                                </Button>
                                            }
                                            renderBackButton={false}
                                            handleChange={handleRowInputChange}
                                            data={emailAddresses}
                                            header={titles}
                                            handleSelectAllClick={handleSelectAllClick}
                                            handleCheckboxClick={handleCheckboxClick}
                                            fromCC={true}
                                            onBlur={() => setRenderOn(Date.now())}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} className={classes.buttonItem}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className={classes.buttonSubmit}
                                                disabled={
                                                    !isModified ||
                                                    isLoading ||
                                                    emailAddresses?.length === 0 ||
                                                    emailAddresses?.some((row) =>
                                                        !row.doRemove
                                                            ? row.emailAddress === '' ||
                                                              row.isMailDuplicate ||
                                                              !row.isValidMail ||
                                                              (row.doValidate && !row.isSafewayMail)
                                                            : false
                                                    )
                                                }
                                                onClick={() => onUpdateCcMailClick()}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                type="reset"
                                                disableRipple
                                                className={classes.button}
                                                onClick={resetTable}
                                                color="primary"
                                                variant="outlined"
                                                disabled={isLoading}
                                            >
                                                Reset
                                            </Button>
                                            <Button
                                                disableRipple
                                                className={classes.button}
                                                onClick={() => history.goBack()}
                                                color="primary"
                                                variant="outlined"
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
const mapStateToProps = (state: IReduxState) => ({
    ccMailAddressList: state.ccMailAddressMaintenance.ccMailAddressList,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getCcMailAddressMaintenanceList: () => dispatch(getAllCcMailAddressMaintenanceList()),
    updateCcMailAddress: (ccMailAddress: ICcListMailMaintenance[]) => dispatch(updateCcMailAddress(ccMailAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ccListMaintenance);
