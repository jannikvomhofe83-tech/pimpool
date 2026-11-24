export type NavChild = { label: string; to: string; children?: NavChild[] };

export const COMPANY = {
  name: "pim POOL",
  full: "Pim Pool GmbH",
  street: "Sulding 18",
  zip: "84432",
  city: "Hohenpolding",
  region: "Oberbayern",
  phone: "08705 939951",
  phoneHref: "tel:+498705939951",
  email: "info@pim-pool.de",
  owner: "Pim van der Poel",
  vatId: "DE341248097",
  register: "HRB 264284",
  registerCourt: "Amtsgericht München",
  youtube: "https://www.youtube.com/",
  hours: [
    { d: "Mo bis Fr", h: "Nach Vereinbarung" },
    { d: "Sa", h: "Nach Vereinbarung" },
    { d: "So", h: "Geschlossen" },
  ],
};

export const NAV: NavChild[] = [
  { label: "Startseite", to: "/" },
  { label: "Salzwasser-Pools", to: "/poolabdeckungen" },
  { label: "Aufbau", to: "/aufbau-unserer-pools" },
  { label: "Pool-Konfigurator", to: "/pool-konfigurator" },
  { label: "Kontakt", to: "/kontakt" },
];
