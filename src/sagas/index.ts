import { all, takeLatest } from 'redux-saga/effects';
import { GET_STATUS, POST_DATA } from '../modules/status';
import {
    GET_NON_REJECTION_LIST,
    ADD_NON_REJECTION_REASON,
    EDIT_NON_REJECTION_REASON,
    DELETE_NON_REJECTION_REASON,
    GET_ALL_NON_REJECTION_REASON,
} from '../modules/admin/non-rejection-reason';
import {
    GET_LOCATION_LIST,
    ADD_LOCATION,
    EDIT_LOCATION,
    DELETE_LOCATION,
    GET_ALL_LOCATION,
} from '../modules/admin/location';
import {
    GET_DISPOSITION_LIST,
    ADD_DISPOSITION,
    EDIT_DISPOSITION,
    DELETE_DISPOSITION,
    GET_ALL_DISPOSITION,
} from '../modules/admin/disposition';
import {
    GET_REJECTION_LIST,
    ADD_REJECTION_REASON,
    EDIT_REJECTION_REASON,
    DELETE_REJECTION_REASON,
    GET_ALL_REJECTION_REASON,
} from '../modules/admin/rejection-reason';
import {
    GET_ALL_DATA_TYPE_LIST,
    CREATE_DATA_TYPE,
    EDIT_DATA_TYPE,
    DELETE_DATA_TYPE,
} from '../modules/admin/attribute-maintenance/data-type-list/data-type-list';
import {
    GET_ALL_ATTRIBUTES,
    EDIT_ATTRIBUTE_MAINTENANCE,
} from '../modules/admin/attribute-maintenance/attribute-maintenance';
import { getStatusSaga, postDataSaga } from './status';
import {
    getNonRejectionReasonSaga,
    addNonRejectionReasonSaga,
    editNonRejectionReasonSaga,
    deleteNonRejectionReasonSaga,
    getAllNonRejectionReasonSaga,
} from './admin/non-rejection-reason';
import {
    getDoneWithSelectionSaga,
    getMultiInspectionEditSaga,
    getPurchaseOrderListSaga,
    saveQaInspectionSaga,
} from './quality-inspection-record/qa-inspection-record/qa-inspection-record';
import {
    getAllLocationSaga,
    getLocationSaga,
    addLocationSaga,
    editLocationSaga,
    deleteLocationSaga,
} from './admin/location';
import {
    getAllDispositionSaga,
    getDispositionSaga,
    addDispositionSaga,
    editDispositionSaga,
    deleteDispositionSaga,
} from './admin/disposition';
import {
    getRejectionReasonSaga,
    addRejectionReasonSaga,
    editRejectionReasonSaga,
    deleteRejectionReasonSaga,
    getAllRejectionReasonSaga,
} from './admin/rejection-reason';
import { GET_DATA_TYPE } from '../modules/admin/attribute-maintenance/datatype-view';
import {
    getAllDataTypeSaga,
    createDataTypeSaga,
    editDataTypeSaga,
    deleteDataTypeSaga,
} from './admin/attribute-maintenance/data-type-list';
import { getDataTypeSaga } from './admin/attribute-maintenance/attribute-maintenance';
import { getAllAttributeSaga, editAttributeSaga } from './admin/attribute-maintenance/attribute-maintenance';
import {
    getDefectCategorySaga,
    getDefectCategoryDetailsSaga,
    editDefectCategoryDetailsSaga,
    deleteDefectCategorySaga,
    deleteDefectSaga,
    createDefectCategorySaga,
} from './admin/defect-category';
import {
    GET_ALL_DEFECT_CATEGORY,
    GET_DEFECT_CATEGORY_DETAILS,
    EDIT_DEFECT_CATEGORY,
    DELETE_DEFECT_CATEGORY,
    DELETE_DEFECT,
    CREATE_DEFECT_CATEGORY,
} from '../modules/admin/defect-category';
import {
    copyEmailGroupSaga,
    deleteEmailGroupSaga,
    getAllEmailGroupMaintenanceSaga,
    getEmailGroupSaga,
    saveEmailGroupSaga,
    updateEmailGroupSaga,
} from './email-groups/email-group-maintenance/email-group-maintenance';
import {
    COPY_EMAIL_GROUP,
    DELETE_EMAIL_GROUP,
    GET_ALL_EMAIL_GROUP_MAINTENANCE,
    GET_EMAIL_GROUP,
    SAVE_EMAIL_GROUP,
    UPDATE_EMAIL_GROUP,
} from '../modules/email-groups/email-group-maintenance/email-group-maintenance';
import {
    getAllCcMailAddressMaintenanceSaga,
    updateCcMailAddressSaga,
} from './email-groups/cc-list-maintenance/cc-list-maintenance';
import {
    GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE,
    UPDATE_CC_MAIL_ADDRESS,
} from '../modules/email-groups/cc-list-maintenance/cc-list-maintenance';
import {
    GET_DONE_WITH_SELECTION_DATA,
    GET_MULTI_INSPECTION_EDIT,
    GET_PURCHASE_ORDER_ACTION,
    GET_PURCHASE_ORDER_LIST,
    SAVE_INSPECTION_RECORD_ACTION,
} from '../modules/quality-inspection-record/qa-inspection-record/qa-inspection-record';
import { getPurchaseOrderSaga } from './quality-inspection-record/qa-inspection-record/qa-inspection-record';
import {
    GET_SEARCH_RESULT_LIST,
    GET_ALL_DROPDOWN_OPTIONS,
    DELETE_SEARCH_RESULT_ROW,
} from '../modules/quality-inspection-record/edit-qa-inspection-record/edit-qa-inspection-record';
import {
    getSearchResultListSaga,
    getAllDropdownOptionsSaga,
    deleteSearchResultRowSaga,
} from './quality-inspection-record/edit-qa-inspection-record/edit-qa-inspection-record';
import {
    GET_ALL_PREFERENCE_DROPDOWN_OPTIONS,
    GET_APPLY_PREFERENCE_DROPDOWN,
} from '../modules/home/preference-dropdown';
import { getAllPreferenceDropdownOptionsSaga, addApplyPreferenceDropdownOptionsSaga } from './home/preference-dropdown';

export function* rootSaga() {
    yield all([
        takeLatest(GET_STATUS, getStatusSaga),
        takeLatest(POST_DATA, postDataSaga),
        takeLatest(GET_REJECTION_LIST, getRejectionReasonSaga),
        takeLatest(ADD_REJECTION_REASON, addRejectionReasonSaga),
        takeLatest(EDIT_REJECTION_REASON, editRejectionReasonSaga),
        takeLatest(DELETE_REJECTION_REASON, deleteRejectionReasonSaga),
        takeLatest(GET_ALL_REJECTION_REASON, getAllRejectionReasonSaga),
        takeLatest(GET_NON_REJECTION_LIST, getNonRejectionReasonSaga),
        takeLatest(ADD_NON_REJECTION_REASON, addNonRejectionReasonSaga),
        takeLatest(EDIT_NON_REJECTION_REASON, editNonRejectionReasonSaga),
        takeLatest(DELETE_NON_REJECTION_REASON, deleteNonRejectionReasonSaga),
        takeLatest(GET_ALL_NON_REJECTION_REASON, getAllNonRejectionReasonSaga),
        takeLatest(GET_DISPOSITION_LIST, getDispositionSaga),
        takeLatest(ADD_DISPOSITION, addDispositionSaga),
        takeLatest(EDIT_DISPOSITION, editDispositionSaga),
        takeLatest(DELETE_DISPOSITION, deleteDispositionSaga),
        takeLatest(GET_ALL_DISPOSITION, getAllDispositionSaga),
        takeLatest(GET_LOCATION_LIST, getLocationSaga),
        takeLatest(ADD_LOCATION, addLocationSaga),
        takeLatest(EDIT_LOCATION, editLocationSaga),
        takeLatest(DELETE_LOCATION, deleteLocationSaga),
        takeLatest(GET_ALL_LOCATION, getAllLocationSaga),
        takeLatest(GET_ALL_ATTRIBUTES, getAllAttributeSaga),
        takeLatest(GET_DATA_TYPE, getDataTypeSaga),
        takeLatest(EDIT_ATTRIBUTE_MAINTENANCE, editAttributeSaga),
        takeLatest(GET_ALL_DATA_TYPE_LIST, getAllDataTypeSaga),
        takeLatest(GET_DEFECT_CATEGORY_DETAILS, getDefectCategoryDetailsSaga),
        takeLatest(GET_ALL_DEFECT_CATEGORY, getDefectCategorySaga),
        takeLatest(EDIT_DEFECT_CATEGORY, editDefectCategoryDetailsSaga),
        takeLatest(GET_EMAIL_GROUP, getEmailGroupSaga),
        takeLatest(GET_ALL_EMAIL_GROUP_MAINTENANCE, getAllEmailGroupMaintenanceSaga),
        takeLatest(SAVE_EMAIL_GROUP, saveEmailGroupSaga),
        takeLatest(UPDATE_EMAIL_GROUP, updateEmailGroupSaga),
        takeLatest(COPY_EMAIL_GROUP, copyEmailGroupSaga),
        takeLatest(DELETE_EMAIL_GROUP, deleteEmailGroupSaga),
        takeLatest(DELETE_DEFECT_CATEGORY, deleteDefectCategorySaga),
        takeLatest(DELETE_DEFECT, deleteDefectSaga),
        takeLatest(CREATE_DEFECT_CATEGORY, createDefectCategorySaga),
        takeLatest(CREATE_DATA_TYPE, createDataTypeSaga),
        takeLatest(EDIT_DATA_TYPE, editDataTypeSaga),
        takeLatest(DELETE_DATA_TYPE, deleteDataTypeSaga),
        takeLatest(GET_ALL_CC_MAIL_ADDRESS_MAINTENANCE, getAllCcMailAddressMaintenanceSaga),
        takeLatest(UPDATE_CC_MAIL_ADDRESS, updateCcMailAddressSaga),
        takeLatest(GET_PURCHASE_ORDER_LIST, getPurchaseOrderListSaga),
        takeLatest(GET_PURCHASE_ORDER_ACTION, getPurchaseOrderSaga),
        takeLatest(GET_DONE_WITH_SELECTION_DATA, getDoneWithSelectionSaga),
        takeLatest(SAVE_INSPECTION_RECORD_ACTION, saveQaInspectionSaga),
        takeLatest(GET_SEARCH_RESULT_LIST, getSearchResultListSaga),
        takeLatest(GET_MULTI_INSPECTION_EDIT, getMultiInspectionEditSaga),
        takeLatest(GET_ALL_DROPDOWN_OPTIONS, getAllDropdownOptionsSaga),
        takeLatest(DELETE_SEARCH_RESULT_ROW, deleteSearchResultRowSaga),
        takeLatest(GET_ALL_PREFERENCE_DROPDOWN_OPTIONS, getAllPreferenceDropdownOptionsSaga),
        takeLatest(GET_APPLY_PREFERENCE_DROPDOWN, addApplyPreferenceDropdownOptionsSaga),
    ]);
}
