export type ExperienceLocalization = {
  title: string;
  moreLabel: string;

  cards: {
    work: {
      title: string;
      preview: string;
      items: { title: string; meta?: string }[];
    };
    education: {
      title: string;
      preview: string;
      items: { title: string; meta?: string }[];
    };
    training: {
      title: string;
      tooltip: string;
      preview: string;
      items: { title: string; meta?: string }[];
    };
    courses: {
      title: string;
      tooltip: string;
      preview: string;
      items: { title: string; meta?: string }[];
    };
  };
};
