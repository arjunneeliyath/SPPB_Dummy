import { lazy } from 'react';

export const routePath = {
    demo: {
        index: '/demo',
    },
    error: {
        index: '/Error',
    },
    qir: {
        index: '/Quality Inspection Record',
    },
    home: {
        index: '/Home',
    },
    admin: {
        index: '/Admin',
    },
    emailGroups: {
        index: '/Email Groups',
    },
    nonRejectable: {
        index: '/Admin/Non Rejection Reason List',
    },
    rejectableReason: {
        index: '/Admin/Rejection Reason List',
    },
    locationList: {
        index: '/Admin/Location List',
    },
    dispositionList: {
        index: '/Admin/Disposition List',
    },
    attributeMaintenance: {
        index: '/Admin/Attribute Maintenance',
    },
    attributeList: {
        index: '/Admin/Attribute Maintenance/Attribute List',
    },
    dataTypeList: {
        index: '/Admin/Attribute Maintenance/Data Type List',
    },
    defectCategoryList: {
        index: '/Admin/Defect Category List',
    },
    emailGroupMaintenance: {
        index: '/Email Groups/Email Group Maintenance',
    },
    ccListMaintenance: {
        index: '/Email Groups/CC List Maintenance',
    },
    qaInspectionRecord: {
        index: '/Quality Inspection Record/Add a New QA Inspection Record',
    },
    editQaInspectionRecord: {
        index: '/Quality Inspection Record/Edit a QA Inspection Record',
    },
    lop: {
        index: '/List of Pos',
    },
    dws: {
        index: '/Done with selection',
    },
    updateRecord: {
        index: '/Update_Records',
    },
    viewAll: {
        index: '/Home/Add a New QA Inspection Record',
    },
};

const routes = [
    {
        label: 'Error',
        path: routePath.error.index,
        component: lazy(() => import('../components/error-boundary/error')),
        exact: true,
    },
    {
        id: 1,
        label: 'Home',
        path: routePath.home.index,
        component: lazy(() => import('../pages/home/home')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 2,
        label: 'Quality Inspection Record',
        path: routePath.qir.index,
        component: lazy(() => import('../pages/quality-inspection-record/quality-inspection-record')),
        exact: true,
    },
    {
        id: 3,
        label: 'Admin',
        path: routePath.admin.index,
        component: lazy(() => import('../pages/admin/admin')),
        exact: true,
    },
    {
        id: 4,
        label: 'Email Groups',
        path: routePath.emailGroups.index,
        component: lazy(() => import('../pages/email-groups/email-groups')),
        exact: true,
    },
    {
        id: 5,
        label: 'Location Maintanace',
        path: routePath.locationList.index,
        component: lazy(() => import('../pages/admin/location-list/location-list')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 6,
        label: 'Disposition Maintanace',
        path: routePath.dispositionList.index,
        component: lazy(() => import('../pages/admin/disposition-list/disposition-list')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 7,
        label: 'Non Rejection Reason List',
        path: routePath.nonRejectable.index,
        component: lazy(() => import('../pages/admin/non-rejectable/non-rejectable')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 8,
        label: 'Rejection Reason List',
        path: routePath.rejectableReason.index,
        component: lazy(() => import('../pages/admin/rejectable-reason/rejectable-reason')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 9,
        label: 'Attribute Maintenance',
        path: routePath.attributeMaintenance.index,
        component: lazy(() => import('../pages/admin/attribute-maintenance/attribute-maintenance')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 10,
        label: 'Attribute List',
        path: routePath.attributeList.index,
        component: lazy(() => import('../pages/admin/attribute-maintenance/attribute-list/attribute-list')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 11,
        label: 'DataType List',
        path: routePath.dataTypeList.index,
        component: lazy(() => import('../pages/admin/attribute-maintenance/data-type-list/data-type-list')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 12,
        label: 'Defect Category List',
        path: routePath.defectCategoryList.index,
        component: lazy(() => import('../pages/admin/defect-category/defect-category')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 13,
        label: 'Email Group Maintenance',
        path: routePath.emailGroupMaintenance.index,
        component: lazy(() => import('../pages/email-groups/email-group-maintenance/email-group-maintenance')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 14,
        label: 'CC List Maintenance',
        path: routePath.ccListMaintenance.index,
        component: lazy(() => import('../pages/email-groups/cc-list-maintenance/cc-list-maintenance')),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 15,
        label: 'Qa Inspection Record',
        path: routePath.qaInspectionRecord.index,
        component: lazy(
            () =>
                import(
                    '../pages/quality-inspection-record/add-a-new-qa-inspection-record/add-a-new-qa-inspection-record'
                )
        ),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 16,
        label: 'View All PO List',
        path: routePath.viewAll.index,
        component: lazy(
            () =>
                import(
                    '../pages/quality-inspection-record/add-a-new-qa-inspection-record/add-a-new-qa-inspection-record'
                )
        ),
        exact: true,
        isSubRoute: true,
    },
    {
        id: 17,
        label: 'Qa Inspection Record',
        path: routePath.editQaInspectionRecord.index,
        component: lazy(() => import('../pages/quality-inspection-record/edit-a-qa-inspection-record/edit-inspection')),
        exact: true,
        isSubRoute: true,
    },
];

export default routes;
