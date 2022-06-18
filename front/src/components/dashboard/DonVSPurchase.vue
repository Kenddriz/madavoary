<template>
  <q-card flat bordered class="bg-transparent q-pa-md">
    <apexchart
      type="bar"
      height="275"
      :options="chartOptions"
      :series="series"
    />
  </q-card>

</template>

<script>
  export default {
    name: 'ApexColumnChartsBasic',
    data () {
      return {
        series: [{
          name: 'Nombre don',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Nombre achat',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }],
        chartOptions: {
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1000
          },
          title: {
            text: 'Column Charts Basic',
            align: 'left',
            style: {
              color: '#FFF'
            }
          },
          legend: {
            labels: {
              colors: '#FFF'
            }
          },
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
              style: {
                colors: '#fff'
              }
            }
          },
          yaxis: {
            title: {
              text: '$ (thousands)',
              style: {
                color: '#FFF'
              }
            },
            labels: {
              style: {
                colors: '#fff'
              }
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return '$ ' + val + ' thousands'
              }
            }
          }
        }
      }
    }
  }
</script>
