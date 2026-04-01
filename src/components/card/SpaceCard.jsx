function SpaceCard({ alt, image, title }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1">
      <img src={image} alt={alt} className="h-72 w-full object-cover" />
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-brand-brown">{title}</h3>
      </div>
    </article>
  );
}

export default SpaceCard;
