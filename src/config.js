import { IconBox, IconFileAnalytics, IconHome, IconListDetails, IconSettings, IconShoppingBag, IconUsers, IconPackages, IconAlertOctagon, IconPackageExport, IconSend, IconCashRegister, IconShoppingCart, IconArrowDown, IconArrowUp } from "@tabler/icons-react";

const MODE = process.env.REACT_APP_MODE || "DEV";

export const REACT_VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY || ""

export const REACT_APP_API = MODE === "DEV"
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL_PROD;

export const SOCKET_URL = MODE === "DEV"
  ? process.env.REACT_APP_SOCKET_URL_DEV
  : process.env.REACT_APP_SOCKET_URL_PROD;

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
    { link: '/mermas', txt: 'Mermas', ico: <IconAlertOctagon/>, mobile: true },
    { link: '/config', txt: 'Configuración', ico: <IconSettings/>, mobile: false },
];

const TIENDA_MENU = [
    { link: '/', txt: 'Dashboard', ico: <IconHome/>, mobile: true },
    { link: '/pos', txt: 'Ventas', ico: <IconShoppingCart/>, mobile: true },
    { link: '/productos', txt: 'Productos', ico: <IconPackageExport/>, mobile: true },
    { link: '/pedidos', txt: 'Pedidos a almacén', ico: <IconSend/>, mobile: true },
    { link: '/caja', txt: 'Caja del día', ico: <IconCashRegister/>, mobile: true },
    { link: '/config', txt: 'Configuración', ico: <IconSettings/>, mobile: false },
];

export const MENUS = {
    ADMIN: ADMIN_MENU,
    ALMACEN: ALMACEN_MENU,
    TIENDA: TIENDA_MENU,
};

export const METHOD_PAYMENT = ['YAPE', 'TRANSFERENCIA', 'EFECTIVO', 'PLIN']