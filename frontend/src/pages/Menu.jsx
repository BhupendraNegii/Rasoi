import React, { useState, useContext, useMemo } from 'react'
import { StoreContext } from '../Context/StoreContext'

function Menu() {
  const { food_list, url, addToCart, cardItem } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Card UI to mirror the reference design
  const MenuCard = ({ item }) => (
    <div className="menu-card bg-[#fffaf3] border border-orange-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-3 pt-3">
        <div className="rounded-xl overflow-hidden border border-orange-100">
          <img src={url + "/images/" + item.image} alt={item.name} className="w-full h-40 object-cover" />
        </div>
        <div className="mt-3">
          <h4 className="text-[15px] font-semibold text-[#2c2c2c]">{item.name}</h4>
          <p className="text-[12px] text-[#6b6b6b] mt-1 line-clamp-2">{item.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[#2d5016] font-bold">₹{item.price}</span>
            {!cardItem?.[item._id || item.id] && !cardItem?.[String(item._id || item.id)] ? (
              <button
                onClick={() => addToCart(item._id || item.id)}
                className="text-[12px] bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition"
              >
                Add to Cart
              </button>
            ) : (
              <span className="text-[12px] text-green-700 font-semibold">In Cart ({cardItem[item._id || item.id] || cardItem[String(item._id || item.id)]})</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Filtered lists
  const allFiltered = useMemo(() => {
    return food_list.filter(item => {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [food_list, searchQuery]);

  // Group filtered items by category for sectioned layout
  const groupedByCategory = useMemo(() => {
    const grouped = {};
    allFiltered.forEach(item => {
      const key = item.category || 'Others';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    // Keep a stable alphabetical order of categories
    return Object.keys(grouped)
      .sort((a, b) => a.localeCompare(b))
      .map(key => ({ category: key, items: grouped[key] }));
  }, [allFiltered]);

  // Show-more state per category
  const [showMoreByCategory, setShowMoreByCategory] = useState({});
  const getVisibleCount = (category) => showMoreByCategory[category] ?? 8;
  const onLoadMore = (category, total) => {
    setShowMoreByCategory(prev => {
      const current = prev[category] ?? 8;
      const next = Math.min(current + 8, total);
      return { ...prev, [category]: next };
    });
  };

  return (
    <div className='min-h-screen'>
      {/* Top bar with search */}
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-[#262626]'>Our Delicious Food Menu</h1>
        <input
          type='text'
          placeholder='Search food...'
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          className='w-full max-w-xs px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#2d5016]'
        />
      </div>

      {/* Sectioned layout by category (reference-style) */}
      {groupedByCategory.length ? (
        <div className='space-y-12'>
          {groupedByCategory.map(section => (
            <section key={section.category} className=''>
              <h2 className='text-2xl md:text-[28px] font-extrabold text-orange-700 mb-5'>{section.category}</h2>
              <div className='grid grid-cols-list gap-6'>
                {section.items.slice(0, getVisibleCount(section.category)).map(item => (
                  <MenuCard key={item._id || item.id} item={item} />
                ))}
              </div>
              {section.items.length > getVisibleCount(section.category) && (
                <div className='mt-6 flex justify-center'>
                  <button
                    onClick={() => onLoadMore(section.category, section.items.length)}
                    className='px-5 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition'
                  >
                    Load more
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>
      ) : <p className='text-center text-gray-600 py-12'>No dishes match your search.</p>}
    </div>
  )
}

export default Menu

