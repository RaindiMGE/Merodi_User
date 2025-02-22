'use client';

import React from 'react';
import styles from './tabs.module.scss';
import Link from 'next/link';

interface Tab {
  id: number;
  label: string;
  href: string;
  activeId: number;
  onClick: () => void;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={`${tab.href}`} 
          className={`${styles.tab} ${tab.activeId == tab.id ? styles.activeTab : styles.defaultTab}`}
          onClick={tab.onClick}
          role="button"
          tabIndex={0}
        >
          {tab.label}
        </Link>
      ))}
      
    </div>
    
  );
};

export default Tabs;