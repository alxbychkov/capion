export const MODAL_TYPES = {
    DEPOSIT: {
        title: 'Balanced Addition',
        'header-1': 'Assets',
        'header-2': 'Portfolio share',
        'header-3': 'Sum addition',
        action: 'Add'
    },
    WITHDRAW: {
        title: 'Balanced withdraw',
        'header-1': 'Assets',
        'header-2': 'General balance',
        'header-3': 'Withdraw sum',
        action: 'Withdraw'
    },
    REBALANCE: {
        title: 'Rebalance shares',
        'header-1': 'Assets',
        'header-2': 'Curent share',
        'header-3': 'New share (%)',
        action: 'Rebalance'
    },
    EMERGENT_WITHDRAW: {
        title: 'Emergent withdraw',
        'header-1': '',
        'header-2': '',
        'header-3': '',
        'text-1': 'Clicking “Withdraw” will remove all assets from the strategy completely!',
        action: 'Withdraw'
    }
}