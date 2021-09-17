import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Dispatch, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/index';
import statusReducer, { IStatusReducer } from './status';
import nonRejectionReasonReducer, { INonRejectionReasonReducer } from './admin/non-rejection-reason';
import dispositionReducer, { IDispositionReducer } from './admin/disposition';
import locationReducer, { ILocationReducer } from './admin/location';
import { commonReducer, ICommonReducer } from './common';
import rejectableReasonReducer, { IRejectionReasonReducer } from './admin/rejection-reason';
import attributeMaintenance, { IAttributeReducer } from './admin/attribute-maintenance/attribute-maintenance';
import dataTypeReducer, { IDataTypeReducer } from './admin/attribute-maintenance/datatype-view';
import dataTypeListReducer, { IDataTypeListReducer } from './admin/attribute-maintenance/data-type-list/data-type-list';
import defectReducer, { IDefectReducer } from './admin/defect-category';
import emailGroupMaintenanceReducer, {
    IEmailGroupMaintenanceReducer,
} from './email-groups/email-group-maintenance/email-group-maintenance';
import ccMailAddressMaintenanceReducer, {
    ICcMailAddressReducer,
} from './email-groups/cc-list-maintenance/cc-list-maintenance';
import purchaseOrderReducer, {
    IPurchaseOrderReducer,
} from './quality-inspection-record/qa-inspection-record/qa-inspection-record';
import searchResultReducer, {
    ISearchResultReducer,
} from './quality-inspection-record/edit-qa-inspection-record/edit-qa-inspection-record';
import homeReducer, { IHomeReducer } from './home/preference-dropdown';

export interface IReduxState {
    status: IStatusReducer;
    common: ICommonReducer;
    rejectableReason: IRejectionReasonReducer;
    nonRejectionReason: INonRejectionReasonReducer;
    location: ILocationReducer;
    disposition: IDispositionReducer;
    attributeMaintenance: IAttributeReducer;
    dataType: IDataTypeReducer;
    dataTypeList: IDataTypeListReducer;
    defectCategoryList: IDefectReducer;
    emailGroupMaintenanceList: IEmailGroupMaintenanceReducer;
    ccMailAddressMaintenance: ICcMailAddressReducer;
    purchaseOrderData: IPurchaseOrderReducer;
    searchResultData: ISearchResultReducer;
    home: IHomeReducer;
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const preloadState = composeEnhancers(applyMiddleware(sagaMiddleware));
const store: Store<IReduxState, AnyAction> & {
    dispatch: Dispatch;
} = createStore(
    combineReducers({
        status: statusReducer,
        common: commonReducer,
        rejectableReason: rejectableReasonReducer,
        nonRejectionReason: nonRejectionReasonReducer,
        disposition: dispositionReducer,
        location: locationReducer,
        attributeMaintenance: attributeMaintenance,
        dataType: dataTypeReducer,
        dataTypeList: dataTypeListReducer,
        defectCategoryList: defectReducer,
        emailGroupMaintenanceList: emailGroupMaintenanceReducer,
        ccMailAddressMaintenance: ccMailAddressMaintenanceReducer,
        purchaseOrderData: purchaseOrderReducer,
        searchResultData: searchResultReducer,
        home: homeReducer,
    }),
    preloadState
);
sagaMiddleware.run(rootSaga);

export default store;
