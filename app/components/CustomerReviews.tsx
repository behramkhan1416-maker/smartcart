export default function CustomerReviews() {
  const reviews = [
    {
      name: "Fast Delivery",
      review: "We ship orders quickly with reliable local courier tracking.",
      rating: "🚚",
    },
    {
      name: "Secure Payment",
      review: "Pay safely with Easypaisa, JazzCash, SadaPay or Cash on Delivery.",
      rating: "🔒",
    },
    {
      name: "Real Support",
      review: "Message us anytime — a real person replies, not a bot.",
      rating: "💬",
    },
  ];

  return (
    <section className="bg-black py-10 text-white sm:py-16 lg:py-20">

      <div className="mx-auto max-w-7xl px-3 sm:px-6">

        {/* Heading */}
        <div className="text-center">

          <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            Why Shop With{" "}
            <span className="text-yellow-400">
              SmartCart
            </span>
          </h2>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            What you can count on when you order.
          </p>

        </div>

        {/* 3 highlights in one row on mobile */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-5 lg:gap-8">

          {reviews.map((review, index) => (

            <div
              key={index}
              className="
                flex min-h-[150px] flex-col
                rounded-xl
                border border-yellow-500/10
                bg-gray-900
                p-2
                text-center
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-yellow-500/30
                hover:shadow-yellow-500/10

                sm:min-h-[230px]
                sm:rounded-2xl
                sm:p-5

                lg:min-h-[260px]
                lg:p-8
              "
            >

              {/* Icon */}
              <p className="text-[14px] text-yellow-400 sm:text-2xl lg:text-3xl">
                {review.rating}
              </p>

              {/* Description */}
              <p className="mt-2 line-clamp-4 text-[9px] leading-3 text-gray-300 sm:mt-4 sm:text-sm sm:leading-6 lg:text-base">
                {review.review}
              </p>

              {/* Label */}
              <h3 className="mt-auto pt-2 text-[9px] font-black text-white sm:pt-4 sm:text-base">
                {review.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}