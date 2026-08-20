import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import {
  ADDRESS,
  ADDRESS_CITY,
  HOURS,
  INSTAGRAM,
  t,
  type Lang,
} from "@/lib/eleven-i18n";

type Props = {
  lang: Lang;
};

export function Footer({ lang }: Props) {
  const L = t(lang);

  return (
    <footer className="mx-auto w-[92%] max-w-6xl border-t border-border pt-12 pb-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Link
            to="/"
            className="font-display text-5xl tracking-[0.2em] transition hover:opacity-80 inline-block"
          >
            ELEVEN
          </Link>
          <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
            {lang === "uz"
              ? "Samarqanddagi premium barbershop. Mukammal uslub va professional parvarish."
              : "Премиум барбершоп в Самарканде. Безупречный стиль и профессиональный мужской уход."}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="transition hover:text-foreground">
            {L.home}
          </Link>
          <Link to="/services" className="transition hover:text-foreground">
            {L.services}
          </Link>
          <Link to="/team" className="transition hover:text-foreground">
            {L.team}
          </Link>
          <Link to="/lookbook" className="transition hover:text-foreground">
            {L.lookbook}
          </Link>
          <Link to="/contacts" className="transition hover:text-foreground">
            {L.contacts}
          </Link>
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-xs text-muted-foreground md:text-right">
          <p>
            {ADDRESS_CITY[lang]}, {ADDRESS[lang]}
          </p>
          <p>{HOURS[lang]}</p>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground/90 transition hover:text-foreground"
          >
            <Instagram className="size-3.5" />
            @eleven_uzb
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground/60 gap-2">
        <span>© {new Date().getFullYear()} ELEVEN Barbershop. All rights reserved.</span>
        <span>Samarkand, Uzbekistan</span>
      </div>
    </footer>
  );
}
