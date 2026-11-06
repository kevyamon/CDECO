import { FC } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, UserCircle } from "lucide-react";
import { mobileMenuSlide, overlayFade, menuItemStagger, menuItem } from "@/animations/variants";

interface NavLinkItem {
  name: string;
  href: string;
}

interface NavbarMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCdecoOpen: boolean;
  setIsCdecoOpen: (open: boolean) => void;
  isCdecoActive: boolean;
  pathname: string;
  navLinks: NavLinkItem[];
  cdecoSubmenu: NavLinkItem[];
  currentLang: string;
  handleLanguageChange: (lang: string) => void;
  t: any;
  isAdmin?: boolean;
}

export const NavbarMobileMenu: FC<NavbarMobileMenuProps> = ({
  isOpen,
  setIsOpen,
  isCdecoOpen,
  setIsCdecoOpen,
  isCdecoActive,
  pathname,
  navLinks,
  cdecoSubmenu,
  currentLang,
  handleLanguageChange,
  t,
  isAdmin = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <motion.div
            className="lg:hidden fixed top-0 right-0 h-full w-[280px] bg-background border-l border-border shadow-2xl z-[60]"
            variants={mobileMenuSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-4 border-b border-border">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.nav
                className="flex-1 overflow-y-auto py-4 px-4 space-y-2"
                variants={menuItemStagger}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={menuItem}>
                  <Link
                    to="/"
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      pathname === "/"
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {t("nav.home", "Accueil")}
                  </Link>
                </motion.div>

                <motion.div variants={menuItem}>
                  <button
                    onClick={() => setIsCdecoOpen(!isCdecoOpen)}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-colors ${
                      isCdecoActive
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>CDECO</span>
                    <motion.div animate={{ rotate: isCdecoOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isCdecoOpen && (
                      <motion.div
                        className="ml-4 mt-1 space-y-1 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {cdecoSubmenu.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              className={`block py-2 px-4 rounded-lg text-sm transition-colors ${
                                pathname === item.href
                                  ? "bg-accent/10 text-accent"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              }`}
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.slice(1).map((link) => (
                  <motion.div key={link.href} variants={menuItem}>
                    <Link
                      to={link.href}
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-accent/10 text-accent"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="p-4 border-t border-border space-y-3">
                <div className="flex gap-2">
                  <Button
                    variant={currentLang === "FR" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageChange("fr")}
                    className={`flex-1 ${currentLang === "FR" ? "bg-primary" : ""}`}
                  >
                    Français
                  </Button>
                  <Button
                    variant={currentLang === "EN" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageChange("en")}
                    className={`flex-1 ${currentLang === "EN" ? "bg-primary" : ""}`}
                  >
                    English
                  </Button>
                </div>

                <Link to={isAdmin ? "/admin" : "/espace-membre"} className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <UserCircle className="h-4 w-4" />
                    {t("nav.memberSpace", "Espace Membre")}
                  </Button>
                </Link>

                <Link to="/adhesion" className="block">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                    {t("nav.joinNow", "Adhérer")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavbarMobileMenu;

