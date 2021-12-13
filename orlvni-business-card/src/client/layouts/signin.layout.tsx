import styles from '../styles/signin.module.scss';
import Head from 'next/head';

export default function SigninLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title} | Avito на минималках</title>
        <meta charSet="utf-8" />
      </Head>
      <nav></nav>
      <main>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </main>
    </>
  );
}
