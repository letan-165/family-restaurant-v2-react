function InfoText({ children, title }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-brown">{title}</h2>
      <div className="mt-2 space-y-1 text-base text-stone-700">
        {children}
      </div>
    </div>
  );
}

export default InfoText;
