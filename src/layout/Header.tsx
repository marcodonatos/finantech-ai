
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function Header({
  title,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">
            {title}
          </h2>
          <p className="hidden text-xs text-slate-500 sm:block">
            Bem-vindo ao seu painel financeiro
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notificações"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
          M
        </div>
      </div>
    </header>
  );
}
