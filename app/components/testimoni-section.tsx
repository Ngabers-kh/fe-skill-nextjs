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
    image: "/clients/client1.jpg",
  },
  {
    id: 2,
    text: "Whitepate is designed as a collaboration tool for businesses that is a full project management solution.",
    name: "Oberon Shaw, MCH",
    title: "Head of Talent Acquisition, North America",
    image: "/clients/client2.jpg",
  },
  {
    id: 3,
    text: "Whitepate is designed as a collaboration tool for businesses that is a full project management solution.",
    name: "Oberon Shaw, MCH",
    title: "Head of Talent Acquisition, North America",
    image: "/clients/client3.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="py-30 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-7 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-12 relative inline-block text-black">
          What Our Clients{" "}
          <span className="text-yellow-500 relative">
            Says
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-yellow-200 -z-10"></span>
          </span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`rounded-2xl shadow-xl p-6 flex flex-col justify-between ${
                index === 0 ? "bg-white text-black" : "bg-blue-900 text-white"
              }`}
            >
              {/* Quote icon */}
              <div className="text-5xl mb-4">“</div>

              {/* Text */}
              <p className="text-base mb-6">{item.text}</p>

              {/* Footer */}
              <div className="flex items-center space-x-4 mt-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="text-left">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm opacity-80">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
