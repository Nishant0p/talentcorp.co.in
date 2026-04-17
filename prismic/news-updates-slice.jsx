import { PrismicRichText } from '@prismicio/react';

export default function NewsUpdatesSlice({ slice }) {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {slice.items.map((item, index) => {
        const isQuote = item.type === 'quote';

        return (
          <article
            key={item.title || item.date || index}
            className={`group h-[420px] overflow-hidden rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              isQuote ? item.quote_bg_class || 'bg-[#006bb8]' : 'border border-slate-100 bg-white shadow-sm'
            }`}
          >
            {isQuote ? (
              <div className="flex h-full items-center justify-center p-10 text-center text-white">
                <div className="max-w-sm text-2xl font-medium leading-relaxed">
                  <PrismicRichText field={item.quote_text} />
                </div>
              </div>
            ) : (
              <>
                <div className="h-1/2 overflow-hidden">
                  <img
                    src={item.image?.url || ''}
                    alt={item.image?.alt || item.title || 'News image'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex h-1/2 flex-col justify-between p-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
                      {item.category}
                    </span>
                    <h3 className="mt-2 text-xl font-bold leading-tight text-[#006bb8] line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400">{item.date}</p>
                </div>
              </>
            )}
          </article>
        );
      })}
    </section>
  );
}
