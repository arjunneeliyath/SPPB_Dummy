import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { IReduxState } from '../../modules/store';
import { AnyAction } from 'redux';
import { Grid, FormLabel, Button } from '@material-ui/core';
import { useStyles } from './style';
import { getAllPreferenceDropdownList, addApplyPreferenceDropdownList } from '../../modules/home/preference-dropdown';
import MultiSelectCheckboxDropdown from '../../components/multi-select-checkbox-dropdown/multi-select-checkbox';
import { IPreferenceApply } from '../../interfaces/home/preference-dropdown';
import { authProvider } from '../../utils/authProvider';

interface IPreferenceProps {
    getAllPreferenceDropdownList: () => void;
    preferenceDropDownList: any;
    addApplyPreferenceDropdownList: (data: IPreferenceApply) => void;
    setModalStatus: (modalStatus: boolean) => void;
}

const Preference = (props: IPreferenceProps) => {
    const { getAllPreferenceDropdownList, preferenceDropDownList, addApplyPreferenceDropdownList, setModalStatus } =
        props;
    const classes = useStyles();
    const [selected, setSelected] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string>('');

    const auth = authProvider();

    const handleSelectionChange = (event: any) => {
        setError('');
        const value = event.target.value;
        if (value[value.length - 1] === 'all') {
            const preferenceList = [...new Set(preferenceDropDownList.map((option: any) => option.division))];
            setSelected(
                selected.length === preferenceList.length
                    ? []
                    : [...new Set(preferenceDropDownList.map((option: any) => option.division))]
            );
            return;
        }
        setSelected(value);
    };

    const onApplyClick = (data: any) => {
        const userEmail = auth?.decodedIdToken?.preferred_username;
        const ind = userEmail.indexOf('@');
        const uId = userEmail.slice(0, ind);
        setError('');
        const dropdownOptions = [...new Set(preferenceDropDownList.map((option: any) => option.division))];
        let allData: string;
        if (data.length === 1) {
            allData = data.toString();
            addApplyPreferenceDropdownList({ userDiv: allData, userId: uId });
            setModalStatus(false);
        } else if (data.length === dropdownOptions.length) {
            allData = 'All';
            addApplyPreferenceDropdownList({ userDiv: allData, userId: '1' });
            setModalStatus(false);
        } else if (data.length > 1) {
            setError('Division/Facility choosen should be unique');
        }
    };

    const isAllSelected =
        preferenceDropDownList.length > 0 &&
        selected.length === [...new Set(preferenceDropDownList.map((option: any) => option.division))].length;

    useEffect(() => {
        getAllPreferenceDropdownList();
    }, []);

    useEffect(() => {
        if (preferenceDropDownList.length > 0) {
            setSelected([
                ...new Set(
                    preferenceDropDownList
                        .filter((option: any) => option.selected === true)
                        .map((val: any) => val.division)
                ),
            ]);
        }
    }, [preferenceDropDownList]);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    {error ? <FormLabel className={classes.errorMessage}>{error}</FormLabel> : null}
                </Grid>
                <Grid item xs={12}>
                    <FormLabel className={classes.heading}> Select a preferred Division / Facility</FormLabel>
                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <MultiSelectCheckboxDropdown
                        data={preferenceDropDownList}
                        handleChange={(event) => handleSelectionChange(event)}
                        isAllSelected={isAllSelected}
                        selected={selected}
                        displayValue="division"
                        concatDisplay={true}
                        placeholder="All Divisions / Facilities"
                        concatDisplayName1="facilityName"
                        concatDisplayName2="facilityNo"
                        seperator="-"
                    />
                    <Grid item md={6} sm={12} xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.buttonSubmit}
                            onClick={() => onApplyClick(selected)}
                        >
                            Apply
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
const mapStateToProps = (state: IReduxState) => ({
    preferenceDropDownList: state.home.preferenceDropDownOptions,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    getAllPreferenceDropdownList: () => dispatch(getAllPreferenceDropdownList()),
    addApplyPreferenceDropdownList: (data: IPreferenceApply) => dispatch(addApplyPreferenceDropdownList(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Preference);
