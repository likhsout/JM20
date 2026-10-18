import "./globals.css";

export const metadata = {
  title: "JM 2K20 Science — Iftar Fund OS v2",
  description: "Purbadhala J.M. Govt Pilot High School • Batch 2020 Science • Simple, transparent, together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-black/10 flex justify-around items-center h-[64px] z-50 pb-[env(safe-area-inset-bottom)]">
          <a href="/" className="flex flex-col items-center gap-1 text-ink text-[11px] font-semibold px-3 py-1 rounded-xl"><span className="text-[18px]">🏠</span>Home</a>
          <a href="/members" className="flex flex-col items-center gap-1 text-muted text-[11px] px-3 py-1"><span className="text-[18px]">👥</span>Members</a>
          <a href="/pay" className="flex flex-col items-center gap-1 bg-gold text-ink font-bold px-4 py-2 rounded-full -mt-2 shadow-elevated"><span className="text-[18px]">💳</span>Pay</a>
          <a href="/ledger" className="flex flex-col items-center gap-1 text-muted text-[11px] px-3 py-1"><span className="text-[18px]">📒</span>Ledger</a>
          <a href="/admin" className="flex flex-col items-center gap-1 text-muted text-[11px] px-3 py-1 relative"><span className="text-[18px]">🛡️</span>Admin<span className="absolute -top-1 -right-1 bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">●</span></a>
        </nav>
      </body>
    </html>
  );
}
