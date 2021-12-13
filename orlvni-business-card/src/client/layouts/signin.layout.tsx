import styles from '../styles/signin.module.scss';

export default function SigninLayout({ children, title }) {
  return (
    <>
      <head>
        <title>{title} | Avito на минималках</title>
        <meta charSet="utf-8" />
      </head>
      <nav></nav>
      <main>
        <div className={styles.modal}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </main>
    </>
  );
}
