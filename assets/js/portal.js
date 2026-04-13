/* ============================================================
   Owner Portal — Tab switching & Chart.js initialization
   ============================================================ */

(function () {
  'use strict';

  /* --- Tab Switching --- */
  const tabs = document.querySelectorAll('.portal-tab');
  const panels = document.querySelectorAll('.portal-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');

      // Initialize charts for this tab if not already done
      initChartsForTab(target);
    });
  });

  /* --- Chart.js Config --- */
  if (typeof Chart === 'undefined') return;

  Chart.defaults.color = '#7A8FA8';
  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.font.size = 12;

  const chartInstances = {};

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = [32400, 28900, 35600, 38200, 41300, 44100, 39800, 42600, 45200, 43900, 47280, 0];
  const netPayoutData = [25920, 23120, 28480, 30560, 33040, 35280, 31840, 34080, 36160, 35120, 37824, 0];

  const gridColor = 'rgba(255, 255, 255, 0.04)';
  const teal = '#00DDB8';
  const tealAlpha = 'rgba(0, 221, 184, 0.15)';
  const blue = '#2E7BEF';
  const blueAlpha = 'rgba(46, 123, 239, 0.15)';

  function initChartsForTab(tabName) {
    if (tabName === 'overview') {
      initRevenueChart();
      initOccupancyChart();
    } else if (tabName === 'revenue') {
      initRevenueDetailChart();
      initPlatformChart();
    }
  }

  function initRevenueChart() {
    if (chartInstances.revenue) return;
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    chartInstances.revenue = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue',
          data: revenueData,
          backgroundColor: tealAlpha,
          borderColor: teal,
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0D1A2D',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#EEF2FF',
            bodyColor: '#7A8FA8',
            callbacks: {
              label: (ctx) => '$' + ctx.raw.toLocaleString()
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            border: { color: gridColor }
          },
          y: {
            grid: { color: gridColor },
            border: { color: gridColor },
            ticks: {
              callback: (v) => '$' + (v / 1000) + 'k'
            }
          }
        }
      }
    });
  }

  function initOccupancyChart() {
    if (chartInstances.occupancy) return;
    const ctx = document.getElementById('occupancyChart');
    if (!ctx) return;

    chartInstances.occupancy = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Occupied', 'Vacant', 'Maintenance'],
        datasets: [{
          data: [94.2, 3.8, 2],
          backgroundColor: [teal, 'rgba(122, 143, 168, 0.3)', 'rgba(245, 166, 35, 0.4)'],
          borderColor: '#0F1E33',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 }
          },
          tooltip: {
            backgroundColor: '#0D1A2D',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#EEF2FF',
            bodyColor: '#7A8FA8',
            callbacks: {
              label: (ctx) => ctx.label + ': ' + ctx.raw + '%'
            }
          }
        }
      }
    });
  }

  function initRevenueDetailChart() {
    if (chartInstances.revenueDetail) return;
    const ctx = document.getElementById('revenueDetailChart');
    if (!ctx) return;

    chartInstances.revenueDetail = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Gross Revenue',
            data: revenueData,
            backgroundColor: tealAlpha,
            borderColor: teal,
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false
          },
          {
            label: 'Net Payout',
            data: netPayoutData,
            backgroundColor: blueAlpha,
            borderColor: blue,
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10 }
          },
          tooltip: {
            backgroundColor: '#0D1A2D',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#EEF2FF',
            bodyColor: '#7A8FA8',
            callbacks: {
              label: (ctx) => ctx.dataset.label + ': $' + ctx.raw.toLocaleString()
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            border: { color: gridColor }
          },
          y: {
            grid: { color: gridColor },
            border: { color: gridColor },
            ticks: {
              callback: (v) => '$' + (v / 1000) + 'k'
            }
          }
        }
      }
    });
  }

  function initPlatformChart() {
    if (chartInstances.platform) return;
    const ctx = document.getElementById('platformChart');
    if (!ctx) return;

    chartInstances.platform = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Airbnb', 'PadSplit', 'Furnished Finder', 'VRBO', 'Direct', 'Booking.com'],
        datasets: [{
          data: [168420, 98640, 72310, 41280, 24150, 8040],
          backgroundColor: [
            '#FF5A5F',
            '#00DDB8',
            '#2E7BEF',
            '#6C5CE7',
            '#F5A623',
            '#003580'
          ],
          borderColor: '#0F1E33',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 12, usePointStyle: true, pointStyleWidth: 10, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: '#0D1A2D',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#EEF2FF',
            bodyColor: '#7A8FA8',
            callbacks: {
              label: (ctx) => ctx.label + ': $' + ctx.raw.toLocaleString()
            }
          }
        }
      }
    });
  }

  // Init overview charts on load
  initChartsForTab('overview');
})();
