export default function Newsletter() {
  return (
    <section
      style={{
        backgroundColor: "#000000",
        padding: "50px 20px",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Heading */}
        <div
          style={{
            flex: "1",
            minWidth: "280px",
          }}
        >
          <h2
            style={{
              display: "block",
              color: "#ffffff",
              fontSize: "42px",
              fontWeight: "900",
              margin: "0 0 15px 0",
              visibility: "visible",
              opacity: 1,
            }}
          >
            Stay Updated
          </h2>

          <p
            style={{
              display: "block",
              color: "#d1d5db",
              fontSize: "18px",
              lineHeight: "1.6",
              margin: 0,
              visibility: "visible",
              opacity: 1,
            }}
          >
            Get the latest offers, discounts and new arrivals directly
            in your inbox.
          </p>
        </div>

        {/* Email form */}
        <div
          style={{
            display: "flex",
            flex: "1",
            minWidth: "280px",
            gap: "12px",
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #444444",
              color: "#ffffff",
              backgroundColor: "#111111",
              fontSize: "16px",
            }}
          />

          <button
            type="button"
            style={{
              padding: "16px 28px",
              borderRadius: "12px",
              border: "1px solid #ffffff",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}