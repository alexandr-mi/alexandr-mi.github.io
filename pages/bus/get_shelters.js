const http = require('http');
const fs = require('fs');


let shelters = [];
let i = 1;



function get_shelter_data(i) {
  let options = {
    host: 'ap3.by',
    path: `/wp-admin/admin-ajax.php?action=acs_get_schedule_by_stopid&id=${i}`,
    method: 'GET'
  };


  http.get(options, function(res) {
    let buffers = [];
    console.log( i );

    res
        .on('data', function(chunk) {
          buffers.push(chunk)
        })
        .on('end', function() {
          let shelter_data = JSON.parse(Buffer.concat(buffers).toString());

          if ( shelter_data.stopName !== '' ) {
            shelter_data.routes.sort((a, b) => {
              let intA = parseInt(a.route_name);
              let intB = parseInt(b.route_name);
              return intA > intB ? 1 : -1
            });


            for (let shelter of shelter_data.routes) {

              if ( shelter.route_schedule["1"] ) {
                shelter.route_schedule['Понедельник'] = [...shelter.route_schedule["1"]];
                delete shelter.route_schedule["1"];
              }

              if ( shelter.route_schedule["2"] ) {
                shelter.route_schedule['Вторник'] = [...shelter.route_schedule["2"]];
                delete shelter.route_schedule["2"];
              }

              if ( shelter.route_schedule["3"] ) {
                shelter.route_schedule['Среда'] = [...shelter.route_schedule["3"]];
                delete shelter.route_schedule["3"];
              };

              if ( shelter.route_schedule["4"] ) {
                shelter.route_schedule['Четверг'] = [...shelter.route_schedule["4"]];
                delete shelter.route_schedule["4"];
              }

              if ( shelter.route_schedule["5"] ) {
                shelter.route_schedule['Пятница'] = [...shelter.route_schedule["5"]];
                delete shelter.route_schedule["5"];
              }

              if ( shelter.route_schedule["6"] ) {
                shelter.route_schedule['Суббота'] = [...shelter.route_schedule["6"]];
                delete shelter.route_schedule["6"];
              }

              if ( shelter.route_schedule["7"] ) {
                shelter.route_schedule['Воскресенье'] = [...shelter.route_schedule["7"]];
                delete shelter.route_schedule["7"];
              }

              if ( shelter.route_schedule["8"] ) {
                shelter.route_schedule['Будни'] = [...shelter.route_schedule["8"]];
                delete shelter.route_schedule["8"];
              }

              if ( shelter.route_schedule["9"] ) {
                shelter.route_schedule['Выходные'] = [...shelter.route_schedule["9"]];
                delete shelter.route_schedule["9"];
              }
            }

            shelters.push(shelter_data);
            get_shelter_data(++i);
          } else {
            shelters.sort( (a, b) => {
              let a_stopName = a.stopName;
              let b_stopName = b.stopName;

              return a_stopName.localeCompare(b_stopName);
            });

            fs.writeFileSync("shelters.json", JSON.stringify(shelters));
            return true
          }
        })
        .on('error', function(e) {
          console.log("Got error: " + e.message);
        });
  });
}

get_shelter_data(i);
