export type ServicesLocalization = {
  title: string;

  bullets: {
    individual: string;
    teens: string;
  };

  paymentLabel: string;  // "Platba:"
  paymentText: string;   // "Hotově i převodem"

  priceCard: {
    title: string;         // "Ceník"
    line: string;          // "50 min – 1200 Kč"
    expanded: {
      col1Title: string;   // "Individuální terapie"
      col2Title: string;   // "Terapie dospívajících"
      mode: string;        // "Online i osobně"
      duration: string;    // "50 min"
      price: string;       // "1200 Kč s DPH"
    };
  };

  cancelCard: {
    title: string;        // "Storno podmínky"
    preview: string;      // "Při zrušení setkání..."
    expanded: string;     // celý text storna
  };

  moreLabel: string;      // "Více"/"More"
};