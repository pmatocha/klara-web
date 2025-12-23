import type { Lang } from "./i18n";

type T = (key: string) => string;

export function buildHomeNav(t: T) {
  return [
    { href: "#o-mne", label: t("nav.about") },
    { href: "#sluzby", label: t("nav.services") },
    { href: "#vzdelani", label: t("nav.experience") },
    { href: "#kontakt", label: t("nav.contact") },
    { href: "#rezervace", label: t("nav.booking") },
  ];
}

export function buildLocalization(t: T) {
    const header = {
        name: t("header.name"),
    };

  const hero = {
    name: t("hero.name"),
    kicker: t("hero.kicker"),
    lead1: t("hero.lead1"),
    lead2: t("hero.lead2"),
    ctaPrimary: t("hero.ctaPrimary"),
    ctaSecondary: t("hero.ctaSecondary"),
    card1Title: t("hero.card1.title"),
    card1Text: t("hero.card1.text"),
    card2Title: t("hero.card2.title"),
    card2Text: t("hero.card2.text"),
    photoAlt: t("hero.photoAlt"),
    whereAddress: t("hero.whereAddress"),
    moreLabel: t("hero.moreLabel"),
    };
    
    const about = {
       body: t("about.body"),
       title: t("about.title"),
    }

  const services = {
    title: t("services.title"),
    bullets: {
      individual: t("services.bullets.individual"),
      teens: t("services.bullets.teens"),
    },
    paymentLabel: t("services.paymentLabel"),
    paymentText: t("services.paymentText"),
    priceCard: {
      title: t("services.priceCard.title"),
      line: t("services.priceCard.line"),
      expanded: {
        col1Title: t("services.priceCard.expanded.col1Title"),
        col2Title: t("services.priceCard.expanded.col2Title"),
        mode: t("services.priceCard.expanded.mode"),
        duration: t("services.priceCard.expanded.duration"),
        price: t("services.priceCard.expanded.price"),
      },
    },
    cancelCard: {
      title: t("services.cancelCard.title"),
      preview: t("services.cancelCard.preview"),
      expanded: t("services.cancelCard.expanded"),
    },
    moreLabel: t("hero.moreLabel"),
    };
    
    const experience = {
  title: t("experience.title"),
  moreLabel: t("hero.moreLabel"),
  cards: {
    work: {
      title: t("experience.cards.work.title"),
      preview: t("experience.cards.work.preview"),
      items: [
        { title: t("experience.cards.work.items.item1.title"), meta: t("experience.cards.work.items.item1.meta") },
      ],
    },
    education: {
      title: t("experience.cards.education.title"),
      preview: t("experience.cards.education.preview"),
      items: [{ title: t("experience.cards.education.items.item1.title") }],
    },
    training: {
      title: t("experience.cards.training.title"),
      tooltip: t("experience.cards.training.tooltip"),
      preview: t("experience.cards.training.preview"),
      items: [{ title: t("experience.cards.training.items.item1.title") }],
    },
    courses: {
      title: t("experience.cards.courses.title"),
      tooltip: t("experience.cards.courses.tooltip"),
      preview: t("experience.cards.courses.preview"),
      items: [
        { title: t("experience.cards.courses.items.item1.title") },
        { title: t("experience.cards.courses.items.item2.title") },
        { title: t("experience.cards.courses.items.item3.title") },
      ],
    },
  },
};

const contact = {
  title: t("contact.title"),
  subtitle: t("contact.subtitle"),
  form: {
    placeholder: t("contact.form.placeholder"),
    send: t("contact.form.send"),
    clear: t("contact.form.clear"),
    sending: t("contact.form.sending"),
    sent: t("contact.form.sent"),
  },
  cards: {
    office: {
      title: t("contact.cards.office.title"),
      preview: t("contact.cards.office.preview"),
      imageSrc: "/ordinace.jpeg",
      imageAlt: t("contact.cards.office.imageAlt"),
    },
    address: {
      title: t("contact.cards.address.title"),
      address: t("contact.cards.address.address"),
      mapTitle: t("contact.cards.address.mapTitle"),
    },
  },
  moreLabel: t("hero.moreLabel"),
    };
    
  return { header, hero, about, services, experience, contact };
}
