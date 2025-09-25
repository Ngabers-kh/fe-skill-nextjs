// components/TestimonialSection.tsx
import Image from "next/image";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Whitepate is designed as a collaboration tool for businesses that is a full project management solution.",
    name: "Oberon Shaw, MCH",
    title: "Head of Talent Acquisition, North America",
    image: "/fauzan-picture.jpg",
  },
  {
    id: 2,
    text: "Whitepate is designed as a collaboration tool for businesses that is a full project management solution.",
    name: "Oberon Shaw, MCH",
    title: "Head of Talent Acquisition, North America",
    image: "/fauzan-picture.jpg",
  },
  {
    id: 3,
    text: "Whitepate is designed as a collaboration tool for businesses that is a full project management solution.",
    name: "Oberon Shaw, MCH",
    title: "Head of Talent Acquisition, North America",
    image: "/fauzan-picture.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section
      id="testimoni"
      className="py-45 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-26 text-black/70">
          What Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)] bg-clip-text text-transparent">
            Clients Say
          </span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl bg-white/80 backdrop-blur-md shadow-lg p-8 flex flex-col items-start hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-6xl font-serif text-[rgb(2,44,92)]/30 select-none">
                “
              </div>

              {/* Text */}
              <p className="text-gray-700 text-base mb-8 relative z-10 leading-relaxed">
                {item.text}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className="rounded-full p-[2px] bg-gradient-to-r from-blue-600 to-[rgb(2,44,92)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-white"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[rgb(2,44,92)]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl"></div>
    </section>
  );
}
