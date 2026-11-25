import { ArrowDownLeft, ArrowUpRight, Package, Boxes } from "lucide-react";

interface Movimiento {
  cantidad_productos: number;
  cantidad_unidades: number;
  total: number;
  fecha: string;
}

interface UltimosMovimientosProps {
  ultimasEntradas: Movimiento[];
  ultimasSalidas: Movimiento[];
}

export default function UltimosMovimientos({
  ultimasEntradas,
  ultimasSalidas,
}: UltimosMovimientosProps) {

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* ÚLTIMAS ENTRADAS */}
      <div className="border border-sara-line bg-white">

        {/* Encabezado */}
        <div className="flex items-center gap-3 border-b border-sara-line px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center bg-sara-sand">
            <ArrowDownLeft size={21} className="text-sara-brown" />
          </div>

          <div>
            <h2 className="text-xl">Últimas Entradas</h2>
            <p className="mt-1 text-xs text-sara-stone">
              Productos ingresados al inventario
            </p>
          </div>
        </div>

        {/* Lista */}
        <div className="divide-y divide-sara-line">

          {ultimasEntradas.length > 0 ? (
            ultimasEntradas.map((ue, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 px-6 py-5 transition hover:bg-sara-cream/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Package size={19} className="text-green-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-sara-ink">
                      {ue.cantidad_productos} productos
                    </p>
                    <p className="mt-1 text-xs text-sara-stone">
                      {ue.cantidad_unidades} unidades ingresadas
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-semibold text-sara-brown">
                    S/ {Number(ue.total).toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-sara-stone">
                    {ue.fecha}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <Package
                size={34}
                className="mx-auto text-sara-stone"
              />
              <h3 className="mt-3 font-medium text-sara-ink">
                Sin entradas recientes
              </h3>
              <p className="mt-1 text-sm text-sara-stone">
                Aquí aparecerán los productos ingresados al inventario.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ÚLTIMAS SALIDAS */}
      <div className="border border-sara-line bg-white">

        {/* Encabezado */}
        <div className="flex items-center gap-3 border-b border-sara-line px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center bg-sara-sand">
            <ArrowUpRight size={21} className="text-sara-brown" />
          </div>

          <div>
            <h2 className="text-xl">Últimas Salidas</h2>
            <p className="mt-1 text-xs text-sara-stone">
              Productos retirados del inventario
            </p>
          </div>
        </div>

        {/* Lista */}
        <div className="divide-y divide-sara-line">

          {ultimasSalidas.length > 0 ? (
            ultimasSalidas.map((us, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 px-6 py-5 transition hover:bg-sara-cream/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <Boxes size={19} className="text-red-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-sara-ink">
                      {us.cantidad_productos} productos
                    </p>
                    <p className="mt-1 text-xs text-sara-stone">
                      {us.cantidad_unidades} unidades retiradas
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-semibold text-sara-brown">
                    S/ {Number(us.total).toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-sara-stone">
                    {us.fecha}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <Boxes
                size={34}
                className="mx-auto text-sara-stone"
              />
              <h3 className="mt-3 font-medium text-sara-ink">
                Sin salidas recientes
              </h3>
              <p className="mt-1 text-sm text-sara-stone">
                Aquí aparecerán los productos retirados del inventario.
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}