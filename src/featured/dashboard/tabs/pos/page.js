import { getSocket } from "@/socket/connection";
import { useState } from "react";
import { toast } from "sonner";
import { serviceNewSale } from "@/services/sales.service";
import { METHOD_PAYMENT } from "@/config";
import { IconPlus } from "@tabler/icons-react";
import { useDB } from "@/context/DBContext";
import './page.css'
import { useAuth } from "@/context/AuthContext";
import moment from "moment";

export default function POSPage () {

    const { user } = useAuth();
    const { products } = useDB();
    const { list, syncStockAfterSale } = products;
    const [sale, setSale] = useState({
        payment: "",
        note: "",
        products: [{ code: '', name: "", price: 0, quantity: 1, subtotal: 0 }]
    });
    const [ loading, setLoading ] = useState(false);

    const updateSale = (field, value) => {
        setSale(prev => ({ ...prev, [field]: value }));
    };

    const handleSelectProduct = (index, productCode) => {
        const product = list.find(p => p.code === productCode);
        if (!product) return;

        const products = [...sale.products];

        const quantity = products[index].quantity || 1;
        const price = Number(product.price);

        products[index] = {
            ...products[index],
            code: product.code,
            name: product.name,
            price,
            quantity,
            subtotal: quantity * price
        };

        setSale(prev => ({ ...prev, products }));
    };

    const handleQuantityChange = (index, quantity) => {
        const products = [...sale.products];
        const price = products[index].price || 0;

        products[index] = {
            ...products[index],
            quantity,
            subtotal: quantity * price
        };

        setSale(prev => ({ ...prev, products }));
    };

    const addProduct = () => {
        setSale(prev => ({
            ...prev,
            products: [
                ...prev.products,
                {
                    code: "",
                    name: "",
                    price: 0,
                    quantity: 1,
                    subtotal: 0
                }
            ]
        }));
    };

    const isSaleValid = (sale) => {
        if (!sale.payment) return "Selecciona la forma de pago";

        if (!Array.isArray(sale.products) || sale.products.length === 0) {
            return "Agrega al menos un producto";
        }

        for (let i = 0; i < sale.products.length; i++) {
            const p = sale.products[i];

            if (!p.code || !p.name) {
                return `Producto #${i + 1}: producto no válido`;
            }

            if (Number(p.quantity) <= 0) {
                return `Producto #${i + 1}: cantidad inválida`;
            }

            if (Number(p.price) <= 0) {
                return `Producto #${i + 1}: precio inválido`;
            }

            if (Number(p.subtotal) <= 0) {
                return `Producto #${i + 1}: subtotal inválido`;
            }
        }

        return null; // ✅ todo OK
    };

    const registrarVenta = async () => {
        try {
            const socket = getSocket();

            if (!socket) {
                toast.error('Error', {description: 'Socket no inicializado'})
                console.error("❌ Socket no inicializado");
                return;
            }

            const validationError = isSaleValid(sale);
            if (validationError) {
                return toast.warning("Alerta", {
                    description: validationError
                });
            }

            setLoading(true)

            const date = moment().format();

            const ventaMock = {
                store: user.code,
                payment: sale.payment,
                note: sale.note,
                date: date,
                products: sale.products
            }

            const data = await serviceNewSale(ventaMock);
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                syncStockAfterSale(ventaMock.products)
                socket.emit("venta:nueva", data.data);
                setSale({
                    payment: "",
                    note: "",
                    products: [{ code: '', name: "", price: 0, quantity: 1, subtotal: 0 }]
                })
                toast.success('Éxito', { description: 'Venta registrada' })
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    };

    return (

        <>

            <div className="--form-sale">
                <div className="--form-sale-group">
                    <label>Producto</label>
                    <div className="--form-sale-control flex">
                        {sale.products.map((product, index) => (
                            <div key={index} className="--form-sale-flex">
                                <select value={product.code} onChange={e => handleSelectProduct(index, e.target.value)}>
                                    <option value={''} selected hidden>Seleccionar el producto</option>
                                    {list.map((p) => (
                                        <option key={p.id} value={p.code}>{p.name} - s/. {p.price}</option>
                                    ))}
                                </select>
                                <input type="number" pattern="[0-9]" inputMode="numeric" min={1} placeholder="Ingresa la cantidad" value={product.quantity} onChange={e => handleQuantityChange(index, Number(e.target.value))} />
                            </div>
                        ))}
                        <button className="--form-btn-add" onClick={addProduct}>Añadir producto<IconPlus/></button>
                    </div>
                </div>
                <div className="--form-sale-group">
                    <label>Forma de pago</label>
                    <div className="--form-sale-control">
                        <select value={sale.payment} onChange={e => updateSale("payment", e.target.value)}>
                            <option value={''} selected hidden>Forma de pago</option>
                            {METHOD_PAYMENT.map((mp, i) => (
                                <option key={i} value={mp}>{mp}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="--form-sale-group">
                    <label>Notas</label>
                    <div className="--form-sale-control">
                        <textarea value={sale.note} placeholder="Ingresa notas de la venta" onChange={e => updateSale("note", e.target.value)} />
                    </div>
                </div>
                <div className="--form-sale-group">
                    <button className="__btn __btn_primary" onClick={registrarVenta}>{loading ? 'Registrando...' : 'Registrar nueva venta'}</button>
                </div>
            </div>

        </>

    )

}