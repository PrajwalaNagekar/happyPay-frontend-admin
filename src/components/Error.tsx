const Error = () => {
  return (
    <div className="hp-canvas flex min-h-[60vh] items-center justify-center px-4">
      <div className="hp-card w-full max-w-md rounded-[22px] px-6 py-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#315bd1]">
          HappyPay
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for is unavailable.
        </p>
      </div>
    </div>
  );
};

export default Error;
