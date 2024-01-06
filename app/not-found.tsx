import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Link href="/">Back</Link>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}
