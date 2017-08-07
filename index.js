/*jshint esversion: 6 */

// var oc is global

function getFiles() {
    var instance = document.getElementById("instance").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    oc.setInstance(instance);

    oc.login(username, password).then(status => {
        return oc.files.list('/');
    }).then(files => {
        document.getElementById("heading").classList.remove("hidden");
        for (var i = 1; i < files.length; i++) {
            var file = files[i];
            var container = document.getElementById('files-container');
            var toInsert =
            '<div class="w3-panel w3-card" onclick="getFileContents(\'' + file.getName() + '\')"><p>' +
                file.getName() +
            '</p></div>';

            container.innerHTML += toInsert;
        }
    }).catch(error => {
        alert(error);
    });
}

function newFile() {
    swal({
        title: "",
        text: "<div id=\"editor-container\"></div> <div id=\"filename\"></div>",
        html: true,
        showCancelButton: true,
        confirmButtonText: "Yes, save it!",
        cancelButtonText: "Cancel!",
        showLoaderOnConfirm: true
    },
    function(isConfirm) {
        var filename = document.getElementById("fileInput").value;
        var fileText = quill.getText();

        if (isConfirm) {
            oc.files.putFileContents(filename, fileText).then(status => {
                console.log("Was file put status successful? : " + status);
                if (status === true) {
                    swal("Ajax request finished!");
                } else {
                    swal("some error eccored!");
                }
            }).catch(error => {
                alert(error);
            });
        }
    });

    document.getElementById("filename").innerHTML +=
    "<textarea placeholder=\"Enter a File Name\"" +
    "id=\"fileInput\" rows=\"1\" cols=\"50\">";

    var quill = new Quill('#editor-container', {
        modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
            ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });
}

function getFileContents(filename) {
    oc.files.getFileContents(filename).then(content => {
        swal({
            title: "File Contents:",
            text: content,
            allowOutsideClick: true
        });
    }).catch(error => {
        alert(error);
    });
}
