export default function Page({
  params
}: {
  params: {
    slug: string;
  };
}) {
  return <h1>Optional Catch-All Segments, params.slug={params.slug}</h1>;
}
