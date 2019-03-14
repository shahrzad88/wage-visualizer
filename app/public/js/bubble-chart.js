var abData = [{
  //Calgary
  x: 18, //(K) yearly cost of living
  y: 70, //(K) yearly average wage
  r: 100 //number of jobs available
}, {
  //Edmonton
  x: 17.8,
  y: 60,
  r: 70
}];

var bcData = [{
  //Vancouver
  x: 30,
  y: 75,
  r: 200
}, {
  //Soury
  x: 20,
  y: 72,
  r: 30
}, {
  //Coq
  x: 21,
  y: 73,
  r: 35
}];

var onData = [{
  //Toronto
  x: 37,
  y: 86,
  r: 500
}, {
  //Miss
  x: 23,
  y: 83,
  r: 45
}, {
  //Berrie
  x: 18,
  y: 80,
  r: 10
}];

var qcData = [{
  //Montreal
  x: 18,
  y: 55,
  r: 110
}, {
  //Quebec City
  x: 14,
  y: 55,
  r: 5
}];

var skData = [{
  //SK
  x: 17,
  y: 50,
  r: 10
}];

var nsData = [{
  //Nova Scotia
  x: 16,
  y: 50,
  r: 3
}];

var mbData = [{
  //Manitoba
  x: 14,
  y: 50,
  r: 10
}];

var nlData = [{
  //
  x: 15,
  y: 51,
  r: 10
}, {
  x: 15,
  y: 55,
  r: 3
}];

var peData = [{
  x: 15,
  y: 45,
  r: 10
}, {
  x: 16,
  y: 49,
  r: 3
}, {
  x: 16,
  y: 54,
  r: 5
}];

var nbData = [{
  x: 15,
  y: 49,
  r: 8
}];

var color = {
  ab: '#6500FF', //dark purple '#2E3155'
  bc: '#5CF4FF', //green-blue '#00AEBA'
  on: '#87BFFF', //blue '#4A698C'
  qc: '#38E25D', //green '#0E9330'
  sk: '#FF0000', //red '#8C0000'
  ns: '#FFDC00', //yellow '#A38C00'
  mb: '#F6C4B1', //light pink '#9D7D71'
  nl: '#5B7B7A', //cold green '#3A4F4E'
  pe: '#6D1C27', //dark red '#3C1016'
  nb: '#FF005D' //pink '#A3003C'
};

var borderColor = {
  ab: '#2E3155',
  bc: '#00AEBA',
  on: '#4A698C',
  qc: '#0E9330',
  sk: '#8C0000',
  ns: '#A38C00',
  mb: '#9D7D71',
  nl: '#3A4F4E',
  pe: '#3C1016',
  nb: '#A3003C'
};

window.onload = function() {
  new Chart(document.getElementById("bubbleChart"), {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'AB', // Name the series
          data: abData, // Specify the data values array
          borderColor: borderColor['ab'], // Add custom color border            
          backgroundColor: color['ab'], // Add custom color background (Points and Fill)
        },
        {
          label: 'BC', // Name the series
          data: bcData, // Specify the data values array
          borderColor: borderColor['bc'], // Add custom color border            
          backgroundColor: color['bc'], // Add custom color background (Points and Fill)
        },
        {
          label: 'ON', // Name the series
          data: onData, // Specify the data values array
          borderColor: borderColor['on'], // Add custom color border            
          backgroundColor: color['on'], // Add custom color background (Points and Fill)
        },
        {
          label: 'QC', // Name the series
          data: qcData, // Specify the data values array
          borderColor: borderColor['qc'], // Add custom color border            
          backgroundColor: color['qc'], // Add custom color background (Points and Fill)
        },
        {
          label: 'SK', // Name the series
          data: skData, // Specify the data values array
          borderColor: borderColor['sk'], // Add custom color border            
          backgroundColor: color['sk'], // Add custom color background (Points and Fill)
        },
        {
          label: 'NS', // Name the series
          data: nsData, // Specify the data values array
          borderColor: borderColor['ns'], // Add custom color border            
          backgroundColor: color['ns'], // Add custom color background (Points and Fill)
        },
        {
          label: 'MB', // Name the series
          data: mbData, // Specify the data values array
          borderColor: borderColor['mb'], // Add custom color border            
          backgroundColor: color['mb'], // Add custom color background (Points and Fill)
        },
        {
          label: 'NL', // Name the series
          data: nlData, // Specify the data values array
          borderColor: borderColor['nl'], // Add custom color border            
          backgroundColor: color['nl'], // Add custom color background (Points and Fill)
        },
        {
          label: 'PE', // Name the series
          data: peData, // Specify the data values array
          borderColor: borderColor['pe'], // Add custom color border            
          backgroundColor: color['pe'], // Add custom color background (Points and Fill)
        },
        {
          label: 'NB', // Name the series
          data: nbData, // Specify the data values array
          borderColor: borderColor['nb'], // Add custom color border            
          backgroundColor: color['nb'], // Add custom color background (Points and Fill)
        }
    ]
    },
    options: {
      responsive: false,
      title: {
      display: true,
      text: 'Incom/Cost of Living (Yearly)'
    }}
  });
}
