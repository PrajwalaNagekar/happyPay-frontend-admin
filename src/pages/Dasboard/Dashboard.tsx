const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back to HappyPay.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            1,248
          </h2>
          <p className="mt-2 text-sm text-green-600">
            +12.5% this month
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            ₹2,45,680
          </h2>
          <p className="mt-2 text-sm text-green-600">
            +8.2% this month
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Retailers</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            86
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            4 added this month
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            24
          </h2>
          <p className="mt-2 text-sm text-orange-600">
            Requires attention
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest transactions from your account
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "ABC Store",
              amount: "₹12,500",
              status: "Completed",
            },
            {
              name: "XYZ Retail",
              amount: "₹8,200",
              status: "Completed",
            },
            {
              name: "Happy Mart",
              amount: "₹4,750",
              status: "Pending",
            },
            {
              name: "Fresh Basket",
              amount: "₹15,300",
              status: "Completed",
            },
          ].map((transaction) => (
            <div
              key={transaction.name}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {transaction.name}
                </p>

                <p className="text-sm text-gray-500">
                  Payment transaction
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {transaction.amount}
                </p>

                <p
                  className={`text-sm ${
                    transaction.status === "Completed"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;