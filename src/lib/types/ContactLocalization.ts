// src/lib/types/ContactLocalization.ts
export type ContactLocalization = {
  title: string;        // "Kontakt"
  subtitle: string;     // "Napište mi"

  form: {
    placeholder: string;
    send: string;       // "Odeslat"
    clear: string;      // "Vymazat"
    sending: string;    // "Odesílám…"
    sent: string;       // "Odesláno"
  };

  cards: {
    office: {
      title: string;          // "Ordinace"
      preview: string;        // "Foto"
      imageSrc: string;       // např. "/ordinace.jpg"
      imageAlt: string;       // alt
    };
    address: {
      title: string;          // "Adresa"
      address: string;        // "Revoluční…"
      mapTitle: string;       // "Mapa"
    };
  };

  moreLabel: string; // "Více/More"
};
