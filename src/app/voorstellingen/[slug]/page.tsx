import { Content } from "./../../components/Content/Content";
import { Metadata } from "next";
import { Shows } from "app/components/Shows/Shows";
import { fetchShow } from "utils/lib/Show/fetchShow";
import { fetchShows } from "utils/lib/Shows/fetchShows";

export async function generateStaticParams() {
  const entries = await fetchShows({});

  return entries.map((page) => ({
    slug: page.slug.replace("/voorstellingen/", ""),
  }));
}
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const entry = await fetchShow(slug);

  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const entry = await fetchShow(slug);

  return (
    <>
      <Content
        title={entry.title}
        content={entry.content}
        image={entry.image}
        id={entry.id}
      />
      <Shows excludeId={entry.id} />
    </>
  );
}
