/*jshint esversion: 6 */
/*var oc is global */

function getFiles(path) {
    var instance = document.getElementById("instance").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    oc.setInstance(instance);

    path = path || '/';
    window.parent = path.split('/').splice(0, path.split('/').length - 1).join('/') || '/';

    if (path === '/') {
        window.parent = null;
    }

    oc.login(username, password).then(status => {
        return oc.files.list(path);
    }).then(files => {
        document.getElementById("heading").classList.remove("hidden");
        var container = document.getElementById('files-container');
        container.innerHTML = "";
        window.files = files;
        var dirs = [];
        var nonDirs = [];

        if (files.length === 1) { // Just the folder itslef
            container.innerHTML += "There are no files in this folder.";
        }

        for (var i = 1; i < files.length; i++) {
            if (files[i].isDir()) {
                var file = files[i];
                var toInsert =
                '<div class="w3-panel w3-card blue w3-hover-shadow" onclick="getFileContents(\'' + file.getName() + '\')"><p>' +
                    file.getName() +
                '</p></div>';

                container.innerHTML += toInsert;
            } else {
                nonDirs.push(files[i]);
            }
        }

        for (i = 0; i < nonDirs.length; i++) {
            var dir = nonDirs[i];
            var toInsert2 =
            '<div class="w3-panel w3-card w3-hover-shadow" onclick="getFileContents(\'' + dir.getName() + '\')"><p>' +
                dir.getName() +
            '</p></div>';

            container.innerHTML += toInsert2;
        }

        if (window.parent) {
            document.getElementById("back").style.display = "unset";
        } else {
            document.getElementById("back").style.display = "none";
        }
    }).catch(error => {
        swal("Oops...", error, "error");
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
                    getFiles();
                    swal("File creation success!");
                } else {
                    swal("some error eccored!");
                }
            }).catch(error => {
                swal("Oops...", error, "error");
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
              ['code-block']
            ]
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });
}

function getFileContents(filename) {
    var files = window.files;

    for (var i = 0; i < files.length; i++) {
        if (files[i].getName() === filename && files[i].isDir()) {
            getFiles(files[i].getPath() + files[i].getName());
            return;
        }
    }

    oc.files.getFileContents(filename).then(content => {
        swal({
            title: "File Contents:",
            text: content,
            allowOutsideClick: true
        });
    }).catch(error => {
        swal("Oops...", error, "error");
    });
}

function goParent() {
    getFiles(window.parent);
}
