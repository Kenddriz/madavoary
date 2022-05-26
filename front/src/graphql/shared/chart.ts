export const defaultChartOptions = {
  chart: {
    toolbar: {
      show: false
    },
  },
  markers: {
    size: 8,
    hover: {
      size: 10
    },
    colors: '#7988a5',
    strokeColors: '#7988a5',
  },
  tooltip: {
    enabled: true,
    enabledOnSeries: undefined,
    shared: true,
    followCursor: false,
    intersect: false,
    inverseOrder: false,
    custom: undefined,
    fillSeriesColor: false,
    theme: 'dark',
    style: {
      fontSize: '15px',
      fontFamily: 'Verdana, sans-serif',
    },
    marker: {
      show: true,
      colors: ['#21BA45']
    }
  },
  grid: { show: false},
  plotOptions: {
    bar: {
      borderRadius: 4,
        horizontal: false,
    }
  },
  xaxis: {
    categories: [],
    labels: {
      formatter: (val: any) => isNaN(val) ? val : val.toFixed(0),
      show: true,
        style: {
        fontSize: '14px',
          colors: '#ffffff',
          fontFamily: 'Verdana, Sans-serif'
      }
    }
  },
  yaxis: [
    {
      labels: {
        formatter: function(val: any) {
          return isNaN(val) ? val : val.toFixed(0);
        },
        align: 'left',
        style: {
          fontSize: '14px',
          colors: '#ffffff',
        }
      }
    }
  ],
  fill: {
    type: 'gradient',
    colors: ['#363660']
  },
  stroke: {
    show: false,
  }
}
export const  donutOptions ={
    labels: [],
    colors: ['#044973', '#363660', '#7988a5', '#044973', '#363660'],
    dataLabels: {
      enabled: true,
    },
  stroke: {
    show: false,
  },
    plotOptions: {
      pie: {
        donut: {
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '15px',
              fontFamily: 'Verdana, sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              offsetY: -10,
              formatter: function (val: string) {
              return val;
            },
          },
          value: {
            show: true,
            fontSize: '16px',
            fontFamily: 'Verdana, sans-serif',
            fontWeight: 400,
            color: '#ffffff',
            offsetY: 16,
            formatter: function (val: any) {
            return val;
          },
        },
        total: {
          show: true,
          showAlways: false,
          label: 'Total',
          fontSize: '15px',
          fontFamily: 'Verdana, sans-serif',
          fontWeight: 100,
          color: '#ffffff',
          formatter: function (w: any) {
          return w.globals.seriesTotals.reduce(
          (a: number, b: number) => {
          return a + b;
        },
        0
        );
      },
    },
  },
  },
  },
  },
  fill: {
    type: 'gradient',
  },
  legend: {
    fontSize: '12px',
    fontFamily: 'Verdana, sans-serif',
    formatter: function (val: string, opts: any) {
      return val + ' - ' + String(opts.w.globals.series[opts.seriesIndex]);
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  }
const years: number[] = [];
const year = new Date().getFullYear();
for(let i = 0; i < 5; i++) years.push(year - i);
export { years }
