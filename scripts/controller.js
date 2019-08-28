$(document).ready(function () {

  var broker = $("#brokerAddress").val();
  var payload = $("#payload");
  var topic = $("#topic");
  var topicSubscribe = $("#topicSubscribe");
  var timestamp = new Date($.now());
  var arrSubTopics = [];
  var arrPubTopics = [];
  var  index;
  


  $("#btnConnect").click(function () {
    // basic functionalities
    client = mqtt.connect(broker);

    client.on("connect", function () {
      $("#status").val("Connected");
    });

  });

  $("#btnDisconnect").click(function () {
    client.end();
    $("#status").val("Disconnected");
  });

  $("#btnPublish").click(function () {
    arrPubTopics.push(topic.val());
    client.publish(topic.val(), payload.val());
    $("#publishTopics tbody").append("<tr> <td>" + topic.val() + "</td>" +
      "<td>" + payload.val() + "</td>" +
      "<td>" + timestamp.toUTCString() + "</td>" +
      "</tr>"
    );
    check();


  });

  $("#btnSubscribe").click(function () {
    client.subscribe(topicSubscribe.val());
    arrSubTopics.push(topicSubscribe.val());

    client.on("message", function (topic, payload) {
      console.log([topic, payload].join(": "));
    });

    $("#subscribeTopics tbody").append("<tr> <td>" + topicSubscribe.val() + "</td>" +
      "<td>" + timestamp.toUTCString() + "</td>" +
      "</tr>"
    );

  });

  $("#btnUnSubscribe").click(function () {
    client.unsubscribe(topicSubscribe.val());
    index = arrSubTopics.indexOf(topicSubscribe.val());
    arrSubTopics.splice(index);
    

  })

  var check = function () {
    if (arrSubTopics.includes(topic.val()) && arrPubTopics.includes(topic.val())) {
      $("#brokerTopics").append("<tr> <td>" + topic.val() + "</td>" +
        "<td>" + payload.val() + "</td>" +
        "<td>" + timestamp.toUTCString() + "</td>");

    };
  }

});




































// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
