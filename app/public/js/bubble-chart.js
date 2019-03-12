window.onload = function() {
  new Chart(document.getElementById("donut"), {
    type: 'doughnut',
    data: {
      labels: ["Green", "Others"],
      datasets: [{
        label: "Expenses (USD)",
        backgroundColor: ["#3e95cd", "#8e5ea2"],
        data: [1478,433]
      }]
    },
    options: {
      responsive: false,
      title: {
      display: true,
      text: 'Expenses for March 2019'
    }}
  });
}
