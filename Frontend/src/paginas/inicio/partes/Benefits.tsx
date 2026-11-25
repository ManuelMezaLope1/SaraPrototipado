import { BENEFITS } from "../variable/HomeVariable";


export default function Benefits() {
  return (
    <section className="page-container pb-24 xl:px-[236px]">
      <div className="grid border-t border-sara-line pt-9 md:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <div
            key={b.title}
            className={`py-4 md:py-0 ${i > 0 ? 'md:border-l md:border-sara-line md:pl-10' : ''}`}
          >
            <h3 className="font-sans text-[14px] font-semibold">{b.title}</h3>
            <p className="mt-3 text-[13px] text-sara-stone">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
