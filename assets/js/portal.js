(function () {
  'use strict';

  /* Tab switching */
  var tabs = document.querySelectorAll('.portal-tab');
  var panels = document.querySelectorAll('.portal-panel');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.tab;
      tabs.forEach(function(t) { t.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
      initCharts(target);
    });
  });

  /* Charts */
  if (typeof Chart === 'undefined') return;

  Chart.defaults.color = '#4A6180';
  Chart.defaults.font.family = 'Outfit, sans-serif';
  Chart.defaults.font.size = 11;

  var charts = {};
  var gridC = 'rgba(255,255,255,0.04)';
  var teal = '#00D4AA';
  var blue = '#1A6FF5';
  var tealA = 'rgba(0,212,170,0.25)';
  var blueA = 'rgba(26,111,245,0.35)';

  var months = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
  var revData = [31200,34800,42100,45600,38900,41200,39800,43100,44200,42800,46100,47280];
  var netData = [24960,27840,33680,36480,31120,32960,31840,34480,35360,34240,36880,37824];

  var tooltipCfg = {
    backgroundColor: '#0C1625',
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    titleColor: '#F4F7FF',
    bodyColor: '#8FA3BC',
    titleFont: { family: 'Outfit', size: 12 },
    bodyFont: { family: 'Outfit', size: 12 },
    padding: 10,
    cornerRadius: 8,
    displayColors: false
  };

  function initCharts(tab) {
    if (tab === 'overview') { makeRevenue(); makeOccupancy(); }
    if (tab === 'revenue') { makeRevenueDetail(); makePlatform(); }
  }

  function makeRevenue() {
    if (charts.rev) return;
    var ctx = document.getElementById('chartRevenue');
    if (!ctx) return;
    charts.rev = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          data: revData,
          backgroundColor: function(ctx) {
            return ctx.dataIndex === 11 ? teal : blueA;
          },
          borderColor: function(ctx) {
            return ctx.dataIndex === 11 ? teal : 'rgba(26,111,245,0.6)';
          },
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
          tooltip: Object.assign({}, tooltipCfg, {
            callbacks: { label: function(c) { return '$' + c.raw.toLocaleString(); } }
          })
        },
        scales: {
          x: { grid: { color: gridC }, border: { color: gridC }, ticks: { color: '#4A6180', font: { family: 'Outfit', size: 11 } } },
          y: { grid: { color: gridC }, border: { color: gridC }, ticks: { color: '#4A6180', font: { family: 'Outfit', size: 11 }, callback: function(v) { return '$' + (v/1000) + 'k'; } } }
        }
      }
    });
  }

  function makeOccupancy() {
    if (charts.occ) return;
    var ctx = document.getElementById('chartOccupancy');
    if (!ctx) return;
    charts.occ = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Occupied', 'Vacant', 'Maintenance'],
        datasets: [{
          data: [94.2, 3.8, 2],
          backgroundColor: [teal, 'rgba(74,97,128,0.3)', 'rgba(245,158,11,0.35)'],
          borderColor: '#0C1625',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeOutQuart' },
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 14, usePointStyle: true, pointStyleWidth: 8, font: { family: 'Outfit', size: 11 } }
          },
          tooltip: Object.assign({}, tooltipCfg, {
            callbacks: { label: function(c) { return c.label + ': ' + c.raw + '%'; } }
          })
        }
      }
    });
  }

  function makeRevenueDetail() {
    if (charts.revD) return;
    var ctx = document.getElementById('chartRevenueDetail');
    if (!ctx) return;
    charts.revD = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Gross Revenue',
            data: revData,
            backgroundColor: tealA,
            borderColor: teal,
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false
          },
          {
            label: 'Net Payout',
            data: netData,
            backgroundColor: blueA,
            borderColor: 'rgba(26,111,245,0.6)',
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
            labels: { padding: 14, usePointStyle: true, pointStyleWidth: 8, font: { family: 'Outfit', size: 11 } }
          },
          tooltip: Object.assign({}, tooltipCfg, {
            callbacks: { label: function(c) { return c.dataset.label + ': $' + c.raw.toLocaleString(); } }
          })
        },
        scales: {
          x: { grid: { color: gridC }, border: { color: gridC }, ticks: { color: '#4A6180', font: { family: 'Outfit', size: 11 } } },
          y: { grid: { color: gridC }, border: { color: gridC }, ticks: { color: '#4A6180', font: { family: 'Outfit', size: 11 }, callback: function(v) { return '$' + (v/1000) + 'k'; } } }
        }
      }
    });
  }

  function makePlatform() {
    if (charts.plat) return;
    var ctx = document.getElementById('chartPlatform');
    if (!ctx) return;
    charts.plat = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Airbnb','PadSplit','Furnished Finder','VRBO','Direct','Booking.com'],
        datasets: [{
          data: [168420, 98640, 72310, 41280, 24150, 8040],
          backgroundColor: ['#FF5A5F','#00D4AA','#1A6FF5','#6C5CE7','#E8A838','#003580'],
          borderColor: '#0C1625',
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
            labels: { padding: 10, usePointStyle: true, pointStyleWidth: 8, font: { family: 'Outfit', size: 10 } }
          },
          tooltip: Object.assign({}, tooltipCfg, {
            callbacks: { label: function(c) { return c.label + ': $' + c.raw.toLocaleString(); } }
          })
        }
      }
    });
  }

  // Init overview on load
  initCharts('overview');
})();
