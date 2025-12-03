'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/Uniview-Logo.png';

// Simplified types
interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories?: Subcategory[];
}

// Constants
const SOLUTIONS_DATA = [
  { id: '1', name: 'Building', slug: 'Building-solutions' },
  { id: '2', name: 'Retail', slug: 'Retail-solutions' },
  { id: '3', name: 'Bank', slug: 'Banking-solutions' },
  { id: '4', name: 'School', slug: 'School-solutions' },
  { id: '5', name: 'Shopping Mall', slug: 'Shopping-mall-solutions' },
  { id: '6', name: 'Hospital', slug: 'Hospital-solutions' },
  { id: '7', name: 'Warehouse and Logistics', slug: 'Warehouse-solutions' },
  { id: '8', name: 'Stadium', slug: 'Stadium-solutions' },
  { id: '9', name: 'Hotel', slug: 'Hotel-solutions' }
];

const NAV_ITEMS = [
  { href: '/', label: 'Home', hasDropdown: false },
  { href: '#', label: 'Products', hasDropdown: true, dropdownType: 'products' },
  { href: '/Solutions', label: 'Solutions', hasDropdown: true, dropdownType: 'solutions' },
  { href: '/Aboutus', label: 'About Us', hasDropdown: false },
  { href: '/Contactus', label: 'Contact Us', hasDropdown: false }
];

// Custom hooks simplified
const useScrollDetection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLocked]);
};

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/navbar');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

const Navbar = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = useCategories();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);
  
  // Refs
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subcategoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Hooks
  const pathname = usePathname();
  const isScrolled = useScrollDetection();
  useBodyScrollLock(isMenuOpen);

  // Utility functions
  const isActive = useCallback((path: string) => {
    return pathname.replace(/\/$/, "").toLowerCase() === path.replace(/\/$/, "").toLowerCase();
  }, [pathname]);

  const isCategoryActive = useCallback((categorySlug: string) => {
    const currentPath = pathname.replace(/\/$/, "").toLowerCase();
    const categoryPath = `/products/${categorySlug}`.toLowerCase();
    return currentPath === categoryPath || currentPath.startsWith(categoryPath + '/');
  }, [pathname]);

  const isSolutionActive = useCallback((solutionSlug: string) => {
    return pathname.replace(/\/$/, "").toLowerCase() === `/solutions/${solutionSlug}`.toLowerCase();
  }, [pathname]);

  // Timeout management
  const clearTimeouts = useCallback(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (subcategoryTimeoutRef.current) clearTimeout(subcategoryTimeoutRef.current);
    dropdownTimeoutRef.current = null;
    subcategoryTimeoutRef.current = null;
  }, []);

  // Menu handlers
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      if (prev) {
        setMobileOpenDropdown(null);
        setMobileOpenCategory(null);
      }
      return !prev;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setMobileOpenDropdown(null);
    setMobileOpenCategory(null);
  }, []);

  const toggleMobileDropdown = useCallback((dropdownType: string) => {
    setMobileOpenDropdown(prev => prev === dropdownType ? null : dropdownType);
    setMobileOpenCategory(null);
  }, []);

  const toggleMobileCategory = useCallback((categoryKey: string) => {
    setMobileOpenCategory(prev => prev === categoryKey ? null : categoryKey);
  }, []);

  // Desktop dropdown handlers
  const handleProductsMouseEnter = useCallback(() => {
    clearTimeouts();
    setOpenCategory('products');
    setOpenSubcategory(null);
  }, [clearTimeouts]);

  const handleProductsMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenCategory(null);
      setOpenSubcategory(null);
    }, 150);
  }, []);

  const handleSolutionsMouseEnter = useCallback(() => {
    clearTimeouts();
    setOpenCategory('solutions');
    setOpenSubcategory(null);
  }, [clearTimeouts]);

  const handleSolutionsMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenCategory(null);
      setOpenSubcategory(null);
    }, 150);
  }, []);

  const handleCategoryMouseEnter = useCallback((categoryId: string) => {
    if (subcategoryTimeoutRef.current) clearTimeout(subcategoryTimeoutRef.current);
    setOpenSubcategory(categoryId);
  }, []);

  const handleCategoryMouseLeave = useCallback(() => {
    subcategoryTimeoutRef.current = setTimeout(() => setOpenSubcategory(null), 150);
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setOpenCategory(null);
    setOpenSubcategory(null);
  }, []);

  // Get category key
  const getCategoryKey = useCallback((category: Category, index: number) => {
    return category.id || category.slug || String(index);
  }, []);

  // Components
  const LogoComponent = useCallback(() => (
    <Link href="/" className="border-0 flex-shrink-0 flex items-center justify-center">
      <div className="relative w-36 h-11">
        <Image
          src={Logo}
          alt="Uniview Logo"
          fill
          className="object-contain"
          priority
          sizes="144px"
        />
      </div>
    </Link>
  ), []);

  const GetInTouchButton = useCallback(({ isMobile = false }: { isMobile?: boolean }) => (
    <Link
      href="/Contactus"
      onClick={isMobile ? closeMenu : undefined}
      className={`
        bg-gradient-to-r from-[#0560f5] to-[#3b82f6] 
        hover:from-[#0449d1] hover:to-[#2563eb] 
        text-white font-semibold rounded-full
        transition-all duration-300 hover:shadow-xl hover:scale-105
        transform active:scale-95 relative overflow-hidden group
        ${isMobile 
          ? 'w-full flex justify-center items-center py-4 px-6 rounded-xl shadow-lg' 
          : 'py-2 px-5 shadow-lg text-sm'
        }
        ${isScrolled && !isMobile ? 'shadow-lg' : 'shadow-md'}
      `}
    >
      <span className="relative z-10 flex items-center">
        Get in Touch
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </Link>
  ), [isScrolled, closeMenu]);

  // Dropdown components - UPDATED PRODUCTS DROPDOWN
  const ProductsDropdown = (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-[90vw] max-w-3xl rounded-2xl shadow-2xl py-3 z-50 border border-gray-200 bg-white"
      onMouseEnter={handleProductsMouseEnter}
      onMouseLeave={handleProductsMouseLeave}
    >
      <div className="px-4 pb-2 mb-1 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">Our Products</h3>
        <p className="text-xs text-gray-600 mt-0.5">All Product Categories</p>
      </div>
      
      <div className="px-3">
        <div className="grid grid-cols-3 gap-1.5">
          {categories.map((category, index) => {
            const catKey = getCategoryKey(category, index);
            return (
              <div key={catKey} className="text-center">
                <Link
                  href={`/products/${category.slug}`}
                  className="block"
                  onClick={closeAllDropdowns}
                  prefetch={false}
                >
                  <div className="bg-white rounded-lg p-1.5 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md h-11 flex items-center justify-center">
                    <div className="w-full">
                      <h4 className="text-[10px] font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {category.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="px-4 pt-2.5 mt-1.5 border-t border-gray-100">
        <Link
          href="/products"
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 py-1.5 px-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200"
          onClick={closeAllDropdowns}
          prefetch={false}
        >
          View All Products
          <svg className="w-3 h-3 ml-1.5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );

  const SolutionsDropdown = (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-[90vw] max-w-3xl rounded-2xl shadow-2xl py-3 z-50 border border-gray-200 bg-white"
      onMouseEnter={handleSolutionsMouseEnter}
      onMouseLeave={handleSolutionsMouseLeave}
    >
      <div className="px-4 pb-2 mb-1 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">Industry Solutions</h3>
        <p className="text-xs text-gray-600 mt-0.5">Tailored solutions for your business needs</p>
      </div>
      
      <div className="px-3">
        <div className="grid grid-cols-3 gap-1.5">
          {SOLUTIONS_DATA.map((solution, index) => (
            <div key={solution.id ?? solution.slug ?? index} className="text-center">
              <Link
                href={`/Solutions/${solution.slug}`}
                className="block"
                onClick={closeAllDropdowns}
                prefetch={false}
              >
                <div className="bg-white rounded-lg p-1.5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 h-11 flex items-center justify-center">
                  <div className="w-full">
                    <h4 className="text-[10px] font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300">
                      {solution.name}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 pt-2.5 mt-1.5 border-t border-gray-100">
        <Link
          href="/Solutions"
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 py-1.5 px-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200"
          onClick={closeAllDropdowns}
          prefetch={false}
        >
          Explore All Solutions
          <svg className="w-3 h-3 ml-1.5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );

  const DesktopNavItem = useCallback(({ item, index }: { item: typeof NAV_ITEMS[0]; index: number }) => (
    <li 
      className="p-2 xl:p-4 relative group"
      onMouseEnter={item.hasDropdown ? (item.dropdownType === 'products' ? handleProductsMouseEnter : handleSolutionsMouseEnter) : undefined}
      onMouseLeave={item.hasDropdown ? (item.dropdownType === 'products' ? handleProductsMouseLeave : handleSolutionsMouseLeave) : undefined}
    >
      <Link
        href={item.href}
        className={`
          relative inline-block overflow-hidden py-1.5 px-2
          transition-all duration-300 flex items-center text-sm
          ${isActive(item.href) 
            ? "text-[#0560f5]" 
            : "hover:text-[#0560f5]"
          }
        `}
        prefetch={false}
      >
        <span className="relative z-10">{item.label}</span>
        {item.hasDropdown && (
          <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span
          className={`
            absolute bottom-0.5 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#0560f5] 
            transition-all duration-300 origin-center
            ${isActive(item.href) ? "w-0" : "w-0 group-hover:w-3/4"}
          `}
        ></span>
      </Link>
      
      {item.hasDropdown && item.dropdownType === 'products' && openCategory === 'products' && ProductsDropdown}
      {item.hasDropdown && item.dropdownType === 'solutions' && openCategory === 'solutions' && SolutionsDropdown}
    </li>
  ), [isActive, openCategory, handleProductsMouseEnter, handleProductsMouseLeave, handleSolutionsMouseEnter, handleSolutionsMouseLeave]);

  const MobileNavItem = useCallback(({ item, index }: { item: typeof NAV_ITEMS[0]; index: number }) => (
    <li className={`transform transition-all duration-500 border-b border-gray-100/30 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        style={{ transitionDelay: `${index * 50}ms` }}>
      {item.hasDropdown ? (
        <button
          onClick={() => toggleMobileDropdown(item.dropdownType!)}
          className={`flex items-center justify-between w-full py-5 px-6 transition-all duration-300 group bg-gradient-to-r hover:from-blue-50/50 hover:to-white ${
            isActive(item.href) 
              ? "text-[#0560f5] bg-blue-50/30" 
              : "hover:text-[#0560f5]"
          }`}
        >
          <div className="flex items-center">
            <span className="font-semibold ml-3 text-gray-800">{item.label}</span>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-500 group-hover:text-[#0560f5] transform transition-all duration-300 ${
              mobileOpenDropdown === item.dropdownType ? 'rotate-180 scale-110' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={closeMenu}
          className={`flex items-center py-5 px-6 transition-all duration-300 group bg-gradient-to-r hover:from-blue-50/50 hover:to-white ${
            isActive(item.href) 
              ? "text-[#0560f5] bg-blue-50/30" 
              : "hover:text-[#0560f5]"
          }`}
          prefetch={false}
        >
          <span className="font-semibold ml-3 text-gray-800">{item.label}</span>
        </Link>
      )}
    </li>
  ), [isMenuOpen, isActive, mobileOpenDropdown, toggleMobileDropdown, closeMenu]);

  const HamburgerButton = useCallback(() => (
    <button
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-label="Open menu navigation"
      className={`
        p-3 rounded-xl transition-all duration-300 focus:outline-none
        transform hover:scale-110 active:scale-95 relative
        ${isMenuOpen 
          ? 'bg-gradient-to-r from-[#0560f5] to-[#3b82f6] text-white shadow-lg' 
          : 'bg-gradient-to-r from-[#0560f5]/10 to-[#3b82f6]/10 hover:from-[#0560f5]/20 hover:to-[#3b82f6]/20 text-[#0560f5] shadow-md'
        }
      `}
    >
      <svg
        width="20"
        height="20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90 scale-110' : ''}`}
      >
        {isMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  ), [isMenuOpen, toggleMenu]);

  return (
    <>
      {/* Desktop Navbar */}
      <header 
        className={`
          text-black backdrop-blur-md transition-all duration-500 ease-in-out
          h-16 hidden xl:flex sticky top-0 z-40 px-8
          ${isScrolled 
            ? 'bg-white/80 shadow-xl border-b border-white/20' 
            : 'bg-white shadow-lg'
          }
        `}
      >
        <div className="flex items-center flex-shrink-0">
          <LogoComponent />
        </div>
        
        <nav className="flex-1 flex justify-center">
          <ul className="flex items-center font-semibold text-sm">
            {NAV_ITEMS.map((item, index) => (
              <DesktopNavItem key={item.href} item={item} index={index} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center flex-shrink-0">
          <GetInTouchButton />
        </div>
      </header>

      {/* Mobile Navbar */}
      <nav 
        className={`
          w-screen xl:hidden px-2 fixed top-0 z-40 h-16 flex items-center
          backdrop-blur-md transition-all duration-500 ease-in-out
          ${isScrolled 
            ? 'bg-white/95 shadow-xl border-b border-white/20' 
            : 'bg-white shadow-lg'
          }
        `}
      >
        <div className="flex justify-between items-center w-full px-3">
          <Link href="/" className="border-0 flex-shrink-0 flex items-center">
            <div className="relative w-40 h-12">
              <Image
                src={Logo}
                alt="Uniview Logo"
                fill
                className="object-contain"
                priority
                sizes="160px"
              />
            </div>
          </Link>
          
          <div className="xl:hidden">
            <HamburgerButton />
          </div>
        </div>
        
        {/* Mobile Menu Content */}
        <div
          className={`${
            isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          } absolute top-16 left-0 right-0 bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-lg shadow-2xl z-50 
          transition-all duration-500 ease-in-out overflow-hidden flex flex-col border-t border-white/20`}
        >
          {!mobileOpenDropdown ? (
            <ul className="divide-y divide-gray-100/30 flex-grow overflow-y-auto max-h-[calc(100vh-200px)]">
              {NAV_ITEMS.map((item, index) => (
                <MobileNavItem key={item.href} item={item} index={index} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col h-full max-h-[70vh]">
              <div className="p-4 border-b border-gray-200 flex items-center bg-blue-50 shrink-0">
                <button
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  onClick={() => setMobileOpenDropdown(null)}
                >
                  <svg
                    className="w-5 h-5 mr-2 transition-transform duration-300 hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Back</span>
                </button>
                <span className="ml-2 font-semibold text-blue-600">
                  {mobileOpenDropdown === 'products' ? 'Products' : 'Solutions'}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto external-scrollbar">
                <div className="p-4">
                  <div className="space-y-2">
                    {mobileOpenDropdown === 'products' && categories.map((category, catIndex) => {
                      const catKey = getCategoryKey(category, catIndex);
                      const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                      const isCategoryOpen = mobileOpenCategory === catKey;
                      const categoryIsActive = isCategoryActive(category.slug);
                      
                      return (
                        <div key={catKey} className="border-b border-gray-100 last:border-b-0">
                          {hasSubcategories ? (
                            <div>
                              <button
                                onClick={() => toggleMobileCategory(catKey)}
                                className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 border ${
                                  categoryIsActive
                                    ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm'
                                    : 'hover:bg-blue-50 text-gray-900 hover:text-blue-600 border-gray-100 hover:border-blue-200'
                                }`}
                              >
                                <div className="font-medium">
                                  {category.name}
                                  {categoryIsActive && (
                                    <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                  )}
                                </div>
                                <svg
                                  className={`w-4 h-4 transition-transform duration-300 ${
                                    isCategoryOpen ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              
                              {isCategoryOpen && (
                                <div className="bg-blue-50/30 border-t border-blue-100/40">
                                  {category.subcategories!.map((subcategory: Subcategory, subIndex) => {
                                    const subKey = subcategory.id || subcategory.slug || `${catIndex}-${subIndex}`;
                                    return (
                                      <Link
                                        key={subKey}
                                        href={`/products/${category.slug}/${subcategory.slug}`}
                                        onClick={closeMenu}
                                        className="flex items-center px-6 py-3.5 transition-all duration-300 hover:bg-white/70 border-b border-gray-100/40 last:border-b-0 relative overflow-hidden"
                                        prefetch={false}
                                      >
                                        <div className="flex items-center gap-3 relative z-10 w-full">
                                          <div className="flex items-center gap-2 flex-1">
                                            <div className={`w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 transform origin-center transition-all duration-300 hover:h-8 hover:shadow-lg`}></div>
                                            <span className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300">
                                              {subcategory.name}
                                            </span>
                                          </div>
                                          
                                          <svg 
                                            className="w-4 h-4 text-gray-400 hover:text-blue-600 transform transition-all duration-300 hover:translate-x-1" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                          </svg>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={`/products/${category.slug}`}
                              onClick={closeMenu}
                              className={`block p-4 rounded-lg transition-all duration-300 border ${
                                categoryIsActive
                                  ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm'
                                  : 'hover:bg-blue-50 text-gray-900 hover:text-blue-600 border-gray-100 hover:border-blue-200'
                              }`}
                              prefetch={false}
                            >
                              <div className="font-medium">
                                {category.name}
                                {categoryIsActive && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                    
                    {mobileOpenDropdown === 'solutions' && SOLUTIONS_DATA.map((solution, solIndex) => {
                      const solutionIsActive = isSolutionActive(solution.slug);
                      
                      return (
                        <div key={solution.id ?? solution.slug ?? solIndex} className="border-b border-gray-100 last:border-b-0">
                          <Link
                            href={`/Solutions/${solution.slug}`}
                            onClick={closeMenu}
                            className={`flex items-center p-4 rounded-lg transition-all duration-300 border ${
                              solutionIsActive
                                ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm'
                                : 'hover:bg-blue-50 text-gray-900 hover:text-blue-600 border-gray-100 hover:border-blue-200'
                            }`}
                            prefetch={false}
                          >
                            <div className="font-medium ml-3">
                              {solution.name}
                              {solutionIsActive && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 border-t border-gray-100 bg-blue-50/30 shrink-0">
                {mobileOpenDropdown === 'products' && (
                  <Link
                    href="/products"
                    onClick={closeMenu}
                    className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    prefetch={false}
                  >
                    View All Products →
                  </Link>
                )}
                {mobileOpenDropdown === 'solutions' && (
                  <Link
                    href="/Solutions"
                    onClick={closeMenu}
                    className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    prefetch={false}
                  >
                    Explore All Solutions →
                  </Link>
                )}
              </div>
            </div>
          )}
          
          <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-blue-50/30 to-white/50">
            <GetInTouchButton isMobile />
          </div>
        </div>
      </nav>

      <div className="h-16 xl:hidden"></div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 xl:hidden"
          onClick={closeMenu}
        />
      )}

      <style jsx global>{`
        .external-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

        .external-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .external-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
          margin: 4px;
        }

        .external-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
          border: 2px solid #f1f1f1;
        }

        .external-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
};

export default Navbar;