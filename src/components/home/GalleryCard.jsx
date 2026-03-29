function GalleryCard({ alt, image, title }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 shadow-[0_18px_48px_rgba(91,57,32,0.12)] transition hover:-translate-y-1">
      <img src={image} alt={alt} className="h-72 w-full object-cover" />
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-brand-brown">{title}</h3>
      </div>
    </article>
  );
}

export default GalleryCard;
