import Link from 'next/link';
import Layout from '../components/layout';

export default function Index() {
  return (
    <Layout>
      <h2>Index</h2>
      <Link href='/signup'>
        <a>Signup</a>
      </Link>
    </Layout>
  );
}
