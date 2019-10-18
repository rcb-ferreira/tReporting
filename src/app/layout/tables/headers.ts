import { Header } from './header';

export const HEADERS: Header[] = [
    {
        'title': 'Date',
        'type': 'datetime',
        'data': 'dialed_at',
        'sortable': true
    },
    {
        'title': 'Trail',
        'data': 'trailref',
        'sortable': true
    },
    {
        'title': 'Contact',
        'data': 'contactref',
        'sortable': true
    },
    {
        'title': 'Extension',
        'data': 'extension',
        'sortable': true
    },
    {
        'title': 'Number',
        'data': 'number',
        'sortable': true
    },
    {
        'title': 'Country',
        'data': 'country',
        'visible': false,
        'sortable': true
    },
    {
        'title': 'Direction',
        'data': 'call_type',
        'sortable': true
    },
    {
        'title': 'End Reason',
        'data': 'end_reason',
        'sortable': true
    },
    {
        'title': 'ISDN Code',
        'data': 'end_code',
        'visible': false,
        'sortable': true
    },
    {
        'title': 'Call Time',
        'type': 'time',
        'data': 'calltime',
        'sortable': true
    },
    {
        'title': 'Hold Time',
        'type': 'time',
        'data': 'holdtime',
        'sortable': true
    },
    {
        'title': 'Wait Time',
        'type': 'time',
        'data': 'waittime',
        'sortable': true
    },
    {
        'title': 'App',
        'data': 'application',
        'visible': false,
        'sortable': true
    },
    {
        'title': 'App Version',
        'data': 'app_version',
        'visible': false,
        'sortable': true
    }
];
