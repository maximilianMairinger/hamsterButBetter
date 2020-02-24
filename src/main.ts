import ajax from "./ajax"

export default function() {
  var es = new EventSource('/code-stream');

  es.onmessage = function (event) {
    let data = JSON.parse(event.data)
    console.log(data)
  };
  


  ajax.post("code-init", {}).then((e) => {
    console.log("init", e)
  })

}