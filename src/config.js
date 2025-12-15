import { IconBox, IconFileAnalytics, IconHome, IconListDetails, IconSettings, IconShoppingBag, IconUsers, IconPackages, IconAlertOctagon, IconPackageExport, IconSend, IconCashRegister, IconShoppingCart, IconArrowDown, IconArrowUp } from "@tabler/icons-react";

export const REACT_APP_API = 'http://192.168.18.12:4000/api/v1'
export const SOCKET_URL = 'http://192.168.18.12:4000';

const ADMIN_MENU = [
    { link: '/', txt: 'Dashboard', ico: <IconHome/>, mobile: true },
    { link: '/ventas', txt: 'Ventas', ico: <IconShoppingBag/>, mobile: true },
    { link: '/productos', txt: 'Productos', ico: <IconListDetails/>, mobile: true },
    { link: '/insumos', txt: 'Insumos', ico: <IconBox/>, mobile: true },
    { link: '/usuarios', txt: 'Usuarios', ico: <IconUsers/>, mobile: false },
    { link: '/reportes', txt: 'Reportes', ico: <IconFileAnalytics/>, mobile: false },
    { link: '/config', txt: 'Configuración', ico: <IconSettings/>, mobile: false },
];

const ALMACEN_MENU = [
    { link: '/', txt: 'Dashboard', ico: <IconHome/>, mobile: true },
    { link: '/almacen', txt: 'Stock', ico: <IconPackages/>, mobile: true },
    { link: '/ingresos', txt: 'Ingresos', ico: <IconArrowDown/>, mobile: true },
    { link: '/salidas', txt: 'Salidas', ico: <IconArrowUp/>, mobile: true },
    { link: '/mermas', txt: 'Mermas', ico: <IconAlertOctagon/>, mobile: true }
];

const TIENDA_MENU = [
    { link: '/', txt: 'Dashboard', ico: <IconHome/>, mobile: true },
    { link: '/pos', txt: 'Ventas', ico: <IconShoppingCart/>, mobile: true },
    { link: '/productos', txt: 'Productos', ico: <IconPackageExport/>, mobile: true },
    { link: '/pedidos', txt: 'Pedidos a almacén', ico: <IconSend/>, mobile: true },
    { link: '/caja', txt: 'Caja del día', ico: <IconCashRegister/>, mobile: true },
];

export const MENUS = {
    ADMIN: ADMIN_MENU,
    ALMACEN: ALMACEN_MENU,
    TIENDA: TIENDA_MENU,
};