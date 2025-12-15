export default function Rows ({ input }) {

    return (

        <div className="--rows">
            <span className="--span-col --span-col-2">{input.name}</span>
            <span className="--span-col --span-col-1">{input.category}</span>
            <span className="--span-col --span-col-1">{input.stock} {input.unit}</span>
            <span className="--span-col --span-col-1">{input.minStock}</span>
            <span className="--span-col --span-col-1">S/. {input.costUnit.toFixed(2)}</span>
            <span className="--span-col --span-col-1">{input.expiration ? new Date(input.expiration).toLocaleDateString() : '—'}</span>
            <span className="--span-col --span-col-1">{input.active ? 'Activo' : 'Inactivo'}</span>
        </div>

    )

}