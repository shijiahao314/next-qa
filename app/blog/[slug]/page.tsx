export default function Page({
  params
}: {
  params: {
    slug: string;
  };
}) {
  // 可以从数据库查询
  return <h1>Slug Page, params.slug={params.slug}</h1>;
}
