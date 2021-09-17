import { ISuccessResponse } from '../../../interfaces/success-response';
import { IAttribute } from '../../../interfaces/admin/attribute-maintenance/attribute-list/get-all-attribute';
import { IError } from '../../../interfaces/error-response';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';
import {
    getAllAttributesAPI,
    editAttributeAPI,
} from '../../../end-points/admin/attribute-maintenance/attribute-maintenance';
import { getAllAttributesSuccessAction } from '../../../modules/admin/attribute-maintenance/attribute-maintenance';
import { AnyAction } from 'redux';
import { getDataTypeSuccessAction } from '../../../modules/admin/attribute-maintenance/datatype-view';
import { IDataType } from '../../../interfaces/admin/attribute-maintenance/attribute-list/get-datatype';
import { getDataTypeViewAPI } from '../../../end-points/admin/attribute-maintenance/attribute-maintenance';
import { IValueSet } from '../../../interfaces/admin/attribute-maintenance/data-type-list/value-set';

export function* getAllAttributeSaga() {
    try {
        const getAttributes: ISuccessResponse<IAttribute[]> = yield call(getAllAttributesAPI);
        convertGetAttributeItemType(getAttributes.data);
        yield put(getAllAttributesSuccessAction(getAttributes.data));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

export function* editAttributeSaga(action: AnyAction) {
    try {
        action.value.itemType =
            action.value.itemMock.length > 1 ? 'Both Produce and Floral' : action.value.itemMock.toString();
        yield call(editAttributeAPI, action.value);
        const getAttributes: ISuccessResponse<IAttribute[]> = yield call(getAllAttributesAPI);
        convertGetAttributeItemType(getAttributes.data);
        yield put(getAllAttributesSuccessAction(getAttributes.data));
        toast.success('Item updated successfully');
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}
export function* getDataTypeSaga(action: AnyAction) {
    try {
        const getDataTypeView: ISuccessResponse<IDataType> = yield call(getDataTypeViewAPI, action.value);
        const modifiedValueSet: IValueSet[] = getDataTypeView?.data?.valueSetList?.filter(
            (item, i) => (item.seqNbr = i + 1)
        );
        const modifiedDataType: IDataType = { ...getDataTypeView.data, valueSetList: modifiedValueSet };
        yield put(getDataTypeSuccessAction(modifiedDataType));
    } catch (error) {
        error.errors.forEach((error: IError) => {
            toast.error(error.message);
        });
    }
}

const convertGetAttributeItemType = (getAttributes: IAttribute[]) => {
    for (const i in getAttributes) {
        const newArr = [];
        getAttributes[i].itemType === 'Produce' || getAttributes[i].itemType === 'Floral'
            ? newArr.push(getAttributes[i].itemType)
            : newArr.push('Produce', 'Floral');
        getAttributes[i].itemMock = newArr;
    }
};
