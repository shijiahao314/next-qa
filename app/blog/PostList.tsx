import Link from "next/link";

interface Post {
  id: number;
  slug: string;
  title: string;
}

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
