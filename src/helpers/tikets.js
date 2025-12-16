import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";

export const generateTiketSale = async (venta) => {

    // 1️⃣ HTML del ticket (PLANO)
    const html = `
        <div class="--ticket">
            <div class="--ticket-content">
                <div class="--ticket-row">
                    <img class="--logo" src="/LOGO-TICKET.png" />
                </div>

                <div class="--ticket-row --ticket-row-2">
                    <h2>NOTA DE VENTA</h2>
                </div>

                <div class="--ticket-row --ticket-row-3">
                    <h2>${venta.id}</h2>
                    <p>JR. JUNÍN NRO. 840, JAUJA, JUNÍN</p>
                </div>

                <div class="--ticket-row --ticket-row-4">
                    <p class="--p-flx">
                        <span>FECHA: ${moment(venta.fecha).format("DD/MM/YYYY")}</span>
                        <span>HORA: ${moment(venta.fecha).format("HH:mm A")}</span>
                    </p>
                    <p>TIENDA: ${venta.store}</p>
                    <p>CLIENTE: ${venta.client || "---"}</p>
                </div>

                <div class="--ticket-row --ticket-row-5">
                    <div class="--table-head">
                        <span>CANT</span>
                        <span>PRODUCTO</span>
                        <span>PREC UNIT</span>
                        <span>TOTAL</span>
                    </div>

                    ${venta.products.map(p => `
                        <div class="--table-body">
                            <span>${p.quantity}</span>
                            <span>${p.name}</span>
                            <span>S/. ${(p.subtotal / p.quantity).toFixed(2)}</span>
                            <span>S/. ${p.subtotal.toFixed(2)}</span>
                        </div>
                    `).join("")}
                </div>

                <div class="--ticket-row --ticket-row-6">
                    <p>IMPORTE TOTAL:</p>
                    <p class="--p-value">S/. ${venta.total.toFixed(2)}</p>
                </div>

                <div class="--ticket-row --ticket-row-7">
                    <p>¡Gracias por comprar en nuestra tienda, te esperamos pronto!</p>
                </div>
            </div>
        </div>
    `;

    // 2️⃣ Contenedor temporal (OFFSCREEN)
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-10000px";
    container.style.left = "-10000px";
    container.innerHTML = html;
    document.body.appendChild(container);

    // 3️⃣ Esperar render real
    await new Promise(r => requestAnimationFrame(r));

    const ticketElement = container.querySelector(".--ticket");

    // 4️⃣ Captura HTML → Canvas
    const canvas = await html2canvas(ticketElement, {
        scale: 2,
        backgroundColor: "#ffffff"
    });

    // 5️⃣ Canvas → PDF dinámico
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const imgWidth = 90; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [imgWidth, imgHeight]
    });

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    // 6️⃣ RESULTADO FINAL
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);

    // 7️⃣ Limpieza DOM
    document.body.removeChild(container);

    // 8️⃣ Retorno profesional
    return {
        blob,
        url
    };
};