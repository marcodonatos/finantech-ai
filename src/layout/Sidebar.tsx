
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  ChartNoAxesCombined,
  BrainCircuit,
  Wallet,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Movimentações", icon: ArrowLeftRight },
  { label: "Planejamento", icon: Target },
  { label: "Investimentos", icon: ChartNoAxesCombined },
  { label: "Assistente IA", icon: BrainCircuit },
];

export default function Sidebar({
  activePage,
  onNavigate,
  open,
  onClose,
}: SidebarProps) {
  return (
    <>
      {open && (
        <button
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        
        <div className="w-full border-b border-slate-100 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Wallet size={21} strokeWidth={2.2} />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                FinanTech
              </h1>
              <p className="text-xs font-medium text-blue-600">
                AI Finance
              </p>
            </div>
          </div>
        </div>



        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 " style={{ margin: 0, paddingTop: "10px", paddingBottom: "10px" }}>
          Menu principal
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.label;

            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.label);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-blue-700">
            <BrainCircuit size={19} />
            <span className="text-sm font-semibold">FinanTech AI</span>
          </div>

          <p className="text-xs leading-5 text-slate-600">
            Organize suas finanças e tome decisões mais conscientes.
          </p>
        </div>
      </aside>
    </>
  );
}
