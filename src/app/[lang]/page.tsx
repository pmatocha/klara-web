import { notFound } from "next/navigation";
import { createT, type Lang } from "../../lib/i18n";
import { HomeShell } from "../../components/layout/HomeShell";
import { buildLocalization, buildHomeNav } from "../../lib/localizationHelper";

type Params = Promise<{ lang: string }>;

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params;

  if (lang !== "cs" && lang !== "en") notFound();
  const t = createT(lang as Lang);

  const nav = buildHomeNav(t);
  const localization = buildLocalization(t);

  return <HomeShell lang={lang as Lang} nav={nav} localization={localization} />;
}
