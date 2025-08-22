const React = require("react");
const { BarChart3, CreditCard, PieChart, Wallet } = require("lucide-react");

const features = [
  {
    icon: React.createElement(Wallet, { className: "h-6 w-6" }),
    title: "Expense Tracking",
    description:
      "Effortlessly track your daily expenses and income with our intuitive interface.",
  },
  {
    icon: React.createElement(PieChart, { className: "h-6 w-6" }),
    title: "Budget Planning",
    description:
      "Create and manage custom budgets to keep your spending in check.",
  },
  {
    icon: React.createElement(BarChart3, { className: "h-6 w-6" }),
    title: "Financial Reports",
    description:
      "Get detailed insights with beautiful charts and comprehensive reports.",
  },
  {
    icon: React.createElement(CreditCard, { className: "h-6 w-6" }),
    title: "Bill Reminders",
    description:
      "Never miss a payment with automated bill tracking and reminders.",
  },
];

function Features() {
  return React.createElement(
    "section",
    { id: "features", className: "py-24 bg-white" },
    React.createElement(
      "div",
      { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
      React.createElement(
        "div",
        { className: "text-center" },
        React.createElement(
          "h2",
          { className: "text-3xl sm:text-4xl font-bold text-gray-900" },
          "Everything you need to manage your money"
        ),
        React.createElement(
          "p",
          { className: "mt-4 text-lg text-gray-600 max-w-2xl mx-auto" },
          "Powerful features to help you track, budget, and grow your wealth"
        )
      ),

      React.createElement(
        "div",
        {
          className:
            "mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
        },
        features.map(function (feature, index) {
          return React.createElement(
            "div",
            {
              key: index,
              className:
                "relative p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group",
            },
            React.createElement("div", {
              className:
                "absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity",
            }),
            React.createElement(
              "div",
              { className: "relative" },
              React.createElement(
                "div",
                {
                  className:
                    "w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600",
                },
                feature.icon
              ),
              React.createElement(
                "h3",
                { className: "mt-6 text-xl font-semibold text-gray-900" },
                feature.title
              ),
              React.createElement(
                "p",
                { className: "mt-2 text-gray-600" },
                feature.description
              )
            )
          );
        })
      )
    )
  );
}

module.exports = Features;
