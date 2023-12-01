export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return <h1>Catch-All Segments, params.slug={params.slug}</h1>;
}
