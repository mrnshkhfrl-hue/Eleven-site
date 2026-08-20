import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Clock, Phone, Instagram, Navigation, Compass } from "lucide-react";

import { BARBERS, type Barber } from "@/lib/eleven-data";
import { Navbar } from "@/components/eleven/Navbar";
import { Footer } from "@/components/eleven/Footer";
import { MasterModal } from "@/components/eleven/MasterModal";
import {
  ADDRESS,
  ADDRESS_CITY,
  HOURS,
  INSTAGRAM,
  PHONE as PHONE_NUM,
  PHONE_HREF,
  t,
  type Lang,
} from "@/lib/eleven-i18n";

export const Route = createFileRoute("/contacts")({
  component: ContactsPage,
  head: () => ({
    meta: [
      { title: "Контакты и адрес — ELEVEN Барбершоп Самарканд" },
      {
        name: "description",
        content:
          "Контакты премиум барбершопа ELEVEN в Самарканде. Адрес: ул. Амира Тимура, 224 (ТРЦ «Атлас»). Время работы: 10:00 - 21:00. Телефон: +998 (66) 233-11-11.",
      },
      { property: "og:title", content: "Контакты — ELEVEN Барбершоп" },
      {
        property: "og:description",
        content: "Как нас найти, телефон, Instagram @eleven_uzb и онлайн-запись.",
      },
    ],
  }),
});

function ContactsPage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [master, setMaster] = useState<Barber | null>(null);
  const L = t(lang);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-foreground pt-28 pb-20">
      {/* Sticky Navbar */}
      <Navbar lang={lang} setLang={setLang} onBookClick={() => setMaster(BARBERS[0])} />

      {/* Hero Header */}
      <div className="mx-auto w-[92%] max-w-6xl pt-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-medium tracking-[0.3em] uppercase glass mb-4">
            <Compass className="size-3 text-muted-foreground" />
            <span>LOCATION & CONTACTS</span>
          </div>
          <h1 className="font-display text-4xl tracking-tight sm:text-6xl md:text-7xl">
            {L.contactsTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {L.contactsSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Content Grid */}
      <div className="mx-auto w-[92%] max-w-6xl pb-24">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Info Cards */}
          <div className="space-y-4 lg:col-span-5">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-6 glass hover:bg-white/[0.08] transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-white/[0.06] text-foreground/80">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase block">
                    {L.address}
                  </span>
                  <span className="text-xs text-muted-foreground">{ADDRESS_CITY[lang]}</span>
                </div>
              </div>
              <p className="text-base font-semibold leading-relaxed">
                {ADDRESS[lang]}
              </p>
              <a
                href="https://yandex.uz/maps/10334/samarkand/?ll=66.923681%2C39.646072&mode=routes&rtext=39.646337%2C66.923655~39.646232%2C66.924297&z=19.06"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                <Navigation className="size-3.5" />
                {L.getDirections}
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-3xl p-6 glass hover:bg-white/[0.08] transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-white/[0.06] text-foreground/80">
                  <Clock className="size-5" />
                </div>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {L.workHours}
                </span>
              </div>
              <p className="text-base font-semibold">10:00 — 21:00</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lang === "uz" ? "Har kuni, dam olish kunlarisiz" : "Ежедневно, без выходных"}
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl p-6 glass hover:bg-white/[0.08] transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-white/[0.06] text-foreground/80">
                  <Phone className="size-5" />
                </div>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {L.phone}
                </span>
              </div>
              <a
                href={PHONE_HREF}
                className="text-lg font-bold transition hover:text-muted-foreground"
              >
                {PHONE_NUM}
              </a>
            </motion.div>

            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-3xl p-6 glass hover:bg-white/[0.08] transition"
            >
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-base font-semibold transition hover:text-muted-foreground"
              >
                <div className="grid size-11 place-items-center rounded-2xl bg-white/[0.06] text-foreground/80">
                  <Instagram className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase block">
                    Instagram
                  </span>
                  <span>@eleven_uzb</span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] bg-white/5 lg:col-span-7 h-[480px] lg:h-[580px]"
          >
            <a
              href="https://yandex.uz/maps/10334/samarkand/?utm_medium=mapframe&utm_source=maps"
              className="absolute top-0 text-xs text-[#eee] opacity-0 pointer-events-none"
            >
              Самарканд
            </a>
            <a
              href="https://yandex.uz/maps/10334/samarkand/?from=mapframe&ll=66.923681%2C39.646072&mode=routes&rtext=39.646337%2C66.923655~39.646232%2C66.924297&rtt=auto&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D242105212925~ymapsbm1%3A%2F%2Forg%3Foid%3D93382537025&utm_medium=mapframe&utm_source=maps&z=19.06"
              className="absolute top-3.5 text-xs text-[#eee] opacity-0 pointer-events-none"
            >
              Atlas: как доехать на автомобиле, общественным транспортом или пешком – Яндекс Карты
            </a>
            <iframe
              src="https://yandex.uz/map-widget/v1/?from=mapframe&ll=66.923681%2C39.646072&mode=routes&rtext=39.646337%2C66.923655~39.646232%2C66.924297&rtt=auto&ruri=ymapsbm1%3A%2F%2Forg%3Foid%3D242105212925~ymapsbm1%3A%2F%2Forg%3Foid%3D93382537025&z=19.06"
              title={L.mapTitle}
              className="size-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Shared Footer */}
      <Footer lang={lang} />

      {/* Master Modal */}
      <MasterModal master={master} onClose={() => setMaster(null)} lang={lang} />
    </main>
  );
}
