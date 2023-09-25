import React from 'react';
import Header from '../containers/navs/Header';
import Footer from '../containers/navs/Footer';
import styles from '../assets/css/AppLayout.module.css';

function AppLayout({ children }) {
  return (
    <div className={styles.appLayout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}

export default AppLayout;