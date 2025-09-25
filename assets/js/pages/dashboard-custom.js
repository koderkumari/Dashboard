
document.addEventListener("DOMContentLoaded", function () {
  fetch("./data.json")
    .then(response => response.json())
    .then(data => {
      // Populate Users Table
      const tableBody = document.querySelector("#users-table tbody");
      if (tableBody) {
        data.users.forEach(user => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
          `;
          tableBody.appendChild(row);
        });
      }

      // Sales Chart
      if (document.querySelector("#sales-chart")) {
        const options = {
          chart: {
            type: 'bar',
            height: 300
          },
          series: [{
            name: 'Revenue',
            data: data.sales.map(s => s.revenue)
          }],
          xaxis: {
            categories: data.sales.map(s => s.month)
          }
        };
        const chart = new ApexCharts(document.querySelector("#sales-chart"), options);
        chart.render();
      }
    });
});
