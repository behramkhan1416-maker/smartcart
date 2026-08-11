export default function WhyChooseUs() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick delivery all across Pakistan.",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "Your payments are 100% protected.",
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Only trusted sellers and quality products.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Friendly customer support anytime.",
    },
  ];

  return (
    <section className="bg-gray-950 py-10 text-white sm:py-16 lg:py-20">

      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        {/* Section Heading */}
        <div className="mb-6 text-center sm:mb-10">

          <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            Why Shop With{" "}
            <span className="text-yellow-400">
              SmartCart?
            </span>
          </h2>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            A better and more trusted shopping experience.
          </p>

        </div>

        {/* 4 cards in one line on mobile */}
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-7">

          {features.map((item, index) => (

            <div
              key={index}
              className="
                rounded-lg
                border border-yellow-500/10
                bg-gray-900
                p-2
                text-center
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-yellow-500/30
                hover:shadow-lg
                hover:shadow-yellow-500/10

                sm:rounded-2xl
                sm:p-6

                lg:p-8
              "
            >

              {/* Icon */}
              <div className="mb-2 text-2xl sm:mb-4 sm:text-5xl lg:text-6xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[9px] font-black leading-3 text-white sm:text-xl sm:leading-7 lg:text-2xl">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-1 hidden text-sm leading-6 text-gray-400 sm:block">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}