import { useDB } from "@/context/DBContext"
import { useEffect, useMemo } from "react";
import Row from "./Row";

import './styles/table.css'

export default function Table ({ search = "", selected = "" }) {

    const { products } = useDB();
    const { list, loading, error, fetchProducts } = products;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredList = useMemo(() => {
        return list.filter(item => {
            const matchSearch =
                !search ||
                item.name.toLowerCase().includes(search.toLowerCase());

            const matchCategory =
                !selected ||
                item.category === selected;

            return matchSearch && matchCategory;
        });
    }, [list, search, selected]);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="--products-table">
            <div className="--products-table-head">
                <span className="--col --col-1"></span>
                <span className="--col --col-2">Nombre</span>
                <span className="--col --col-3">Categoria</span>
                <span className="--col --col-4">Precio</span>
                <span className="--col --col-5">Precio x Docena</span>
                <span className="--col --col-6"></span>
            </div>

            <div className="--products-table-body">
                {filteredList.map(item => (
                    <Row key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}