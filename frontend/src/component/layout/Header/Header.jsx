import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './Header.css';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Search', href: '/search' },
  { name: "login/Sign-up", href: '/login'}
];

const Header = () => {
  const [activeLink, setActiveLink] = React.useState(null);

  return (
    <header className="header">
      <motion.div
        className="header-background"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      ></motion.div>

      <nav className="nav">
        <ul className="nav-list">
          {links.map((link) => (
            <motion.li
              className="nav-item"
              key={link.href}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <a
                className={clsx(
                  'nav-link',
                  { active: activeLink === link.name }
                )}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
              >
                {link.name}
                {activeLink === link.name && (
                  <motion.span
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
