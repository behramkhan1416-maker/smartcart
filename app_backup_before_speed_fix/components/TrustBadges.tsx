"use client";

export default function TrustBadges() {
  const badges = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Nationwide delivery across Pakistan.",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "Safe and verified payment process.",
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Carefully selected quality products.",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "We are always here to help.",
    },
  ];

  return (
    <section className="border-y border-yellow-500/15 bg-black py-6 text-white sm:py-10">

      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        <div className="grid grid-cols-4 gap-1.5 sm:gap-5 lg:gap-8">

          {badges.map((badge, index) => (
            <div
              key={index}
              className="
                flex flex-col items-center
                justify-center text-center
                sm:flex-row sm:gap-3
              "
            >

              <div className="text-2xl sm:text-4xl">
                {badge.icon}
              </div>

              <div className="mt-1 sm:mt-0 sm:text-left">

                <h3 className="text-[9px] font-black text-white sm:text-base lg:text-lg">
                  {badge.title}
                </h3>

                <p className="mt-0.5 hidden text-xs text-gray-400 sm:block">
                  {badge.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}