// 표 만들기
$(document).ready(function () {
    showReview(); //로딩되자마자 불림
});
// 표 데이터에 데이터 넣기
function showReview() {
    $.ajax({
        type: "GET",
        url: "/TABULATE",
        data: {},
        success: function (response) {
            let db_data = response['all_data']
            for (let i = 0; i < db_data.length; i++) {
                let Time = db_data[i]['Time']
                let verticle = db_data[i]['verticle']
                let horizion = db_data[i]['horizion']
                let theta = db_data[i]['theta']

                let temp_html = `<tr>
                                                <td>${Time}</td>
                                                <td>${verticle}</td>
                                                <td>${horizion}</td>
                                                <td>${theta}</td>
                                            </tr>
                        `
                $('#body').append(temp_html)
            }
        }
    })
}

// 표 열고 닫기 기능
function openclose_table() {
    let status = $('#btn-box').css('display');
    if (status == 'block') {
        $('#btn-box').hide()
        $('#btn-tabulate-box').text('표 열기');

    } else {
        $('#btn-box').show()
        $('#btn-tabulate-box').text('표 닫기');

    }
}

// 그래프그리기
// 그래프->x
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart_x);
function drawChart_x() {
    $.ajax({
        type: "GET",
        url: "/GRAPH_X",
        data: {},
        success: function (response) {
            let db_data = response['all_X']
            let X = [] //안쪽 t, v가 들어갈 배열
            let Z = [] //가장 바깥 배열
            Z.push(['Time', 'Vertical'])
            for (let i = 0; i < 30; i++) {
                let Time = db_data[i]['Time']
                let Vertical = db_data[i]['Vertical']
                X = []
                X.push(Time)
                X.push(Vertical)
                Z.push(X)
            }

            var data = google.visualization.arrayToDataTable(Z);

            var options = {
                title: 'X GRAPH',
                curveType: 'function',
                legend: {position: 'bottom'},
                // 그래프가 있는 곳에서 style로 크기 지정해줘도 됨
                width: 1200,
                height: 500,
                hAxis: {title: 'Time'},
                vAxis: {title: 'X'},
                titleTextStyle: {
                    color: 'black',
                    fontSize: 20,
                    fontName: 'Arial',
                    bold: true,
                    italic: true
                }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart_x'));

            chart.draw(data, options);
        }
    })
}


// 그래프->y
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart_y);
function drawChart_y() {
    $.ajax({
        type: "GET",
        url: "/GRAPH_Y",
        data: {},
        success: function (response) {
            let db_data = response['all_Y']
            let X = [] //안쪽 t, v가 들어갈 배열
            let Z = [] //가장 바깥 배열
            Z.push(['Time', 'Horizontal'])
            for (let i = 0; i < 30; i++) {
                let Time = db_data[i]['Time']
                let Horizontal = db_data[i]['Horizontal']
                X = []
                X.push(Time)
                X.push(Horizontal)
                Z.push(X)
            }

            var data = google.visualization.arrayToDataTable(Z);

            var options = {
                title: 'Y GRAPH',
                curveType: 'function',
                legend: {position: 'bottom'},
                width: 1200,
                height: 500,
                hAxis: {title: 'Time'},
                vAxis: {title: 'Y'},
                titleTextStyle: {
                    color: 'black',
                    fontSize: 20,
                    fontName: 'Arial',
                    bold: true,
                    italic: true
                }

            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart_y'));

            chart.draw(data, options);
        }
    })
}

// 그래프 ->theta
google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart_theta);
function drawChart_theta() {
    $.ajax({
        type: "GET",
        url: "/GRAPH_theta",
        data: {},
        success: function (response) {
            let db_data = response['all_theta']
            let X = [] //안쪽 t, v가 들어갈 배열
            let Z = [] //가장 바깥 배열
            Z.push(['Time', 'Theta'])
            for (let i = 0; i < 30; i++) {
                let Time = db_data[i]['Time']
                let Theta = db_data[i]['Theta']
                X = []
                X.push(Time)
                X.push(Theta)
                Z.push(X)
            }

            var data = google.visualization.arrayToDataTable(Z);

            var options = {
                title: 'Theta GRAPH',
                curveType: 'function',
                legend: {position: 'bottom'},
                width: 1200,
                height: 500,
                hAxis: {title: 'Time'},
                vAxis: {title: 'Theta'},
                titleTextStyle: {
                    color: 'black',
                    fontSize: 20,
                    fontName: 'Arial',
                    bold: true,
                    italic: true
                }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart_theta'));

            chart.draw(data, options);
        }
    })
}

// 그래프 보여주기 동적 구현
// 모든 그래프 보여주기
function openclose() {
    let status = $('#btn-box1').css('display');
    if (status == 'display') {
        $('#btn-box1').show()
        $('#btn-box2').show()
        $('#btn-box3').show()
    } else {
        $('#btn-box1').show()
        $('#btn-box2').show()
        $('#btn-box3').show()
    }
}

// 그래프-x만 보여주기
function openclose_t() {
    let status = $('#btn-box1').css('display');
    if (status == 'display') {
        $('#btn-box1').show()
    } else {
        $('#btn-box1').show()
        $('#btn-box2').hide()
        $('#btn-box3').hide()
    }
}

// 그래프-y만 보여주기
function openclose_s() {
    let status = $('#btn-box2').css('display');
    if (status == 'display') {
        $('#btn-box2').show()
    } else {
        $('#btn-box2').show()
        $('#btn-box1').hide()
        $('#btn-box3').hide()

    }
}

// 그래프-theta만 보여주기
function openclose_a() {
    let status = $('#btn-box3').css('display');
    if (status == 'block') {
        $('#btn-box3').show()
    } else {
        $('#btn-box1').hide()
        $('#btn-box2').hide()
        $('#btn-box3').show()
    }
}